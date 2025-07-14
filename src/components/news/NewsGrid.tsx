// src/components/news/NewsGrid.tsx
'use client';

import { useState, useEffect, useContext } from 'react';
import NewsCard from '../UI/NewsCard';
import { IoFilter, IoClose, IoReload } from 'react-icons/io5';
import { SearchContext } from '@/lib/SearchContext';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterData {
  categories: string[];
}

interface NewsGridProps {
  filters: FilterData | null;
  onOpenFilters: () => void;
}

export default function NewsGrid({ filters, onOpenFilters }: NewsGridProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [totalPosts, setTotalPosts] = useState(0);
  const [categoriesMap, setCategoriesMap] = useState<{[slug: string]: number}>({});
  const { searchTerm } = useContext(SearchContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const POSTS_PER_PAGE = 9;
  const INITIAL_LOAD = 9;

  useEffect(() => {
    const fetchCategoriesMap = async () => {
      try {
        const response = await fetch('https://amplify.aurigital.com/wp-json/wp/v2/categories?per_page=100');
        const categories = await response.json();
        
        const map: {[slug: string]: number} = {};
        categories.forEach((cat: any) => {
          map[cat.slug] = cat.id;
        });
        
        setCategoriesMap(map);
      } catch (error) {
        console.error('Error loading categories map:', error);
      }
    };

    fetchCategoriesMap();
  }, []);

  const fetchPosts = async (pageNum: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const perPage = pageNum === 1 ? INITIAL_LOAD : POSTS_PER_PAGE;

      let apiUrl = `https://amplify.aurigital.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${pageNum}`;

      if (sortBy === 'date') {
        apiUrl += '&orderby=date&order=desc';
      } else if (sortBy === 'title-asc') {
        apiUrl += '&orderby=title&order=asc';
      } else if (sortBy === 'title-desc') {
        apiUrl += '&orderby=title&order=desc';
      }

      if (filters?.categories && filters.categories.length > 0) {
        const categoryIds = filters.categories
          .map(slug => categoriesMap[slug])
          .filter(id => id !== undefined)
          .join(',');
        
        if (categoryIds) {
          apiUrl += `&categories=${categoryIds}`;
        }
      }

      if (searchTerm) {
        apiUrl += `&search=${encodeURIComponent(searchTerm)}`;
      }

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
      const totalItems = parseInt(response.headers.get('X-WP-Total') || '0');

      if (append) {
        setPosts(prev => [...prev, ...data]);
      } else {
        setPosts(data);
      }

      setTotalPosts(totalItems);
      setHasMore(pageNum < totalPages);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar noticias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(categoriesMap).length > 0 || !filters?.categories?.length) {
      fetchPosts(1, false);
    }
  }, [sortBy, filters, searchTerm, categoriesMap]);

  const handleRetry = () => {
    setError(null);
    fetchPosts(page, false);
  };

  if (error) {
    return (
      <div className="flex-1 ">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-[#E5754C] mb-2">
              Error al cargar noticias
            </h3>
            <p className="text-[#C7C7C7] mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="text-[#E5754C] border-[1.4px] border-[#E5754C] px-4 py-2 rounded-full hover:shadow-[#E5754C] hover:shadow-sm transition-all duration-300"
              >
              <IoReload className="w-4 h-4" />
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-lexend font-semibold text-xl">ÚLTIMAS NOTICIAS</h2>
            <button
              onClick={onOpenFilters}
              className="lg:hidden flex items-center gap-2 bg-[#E5754C] text-[#0a0a0a] px-3 py-2 rounded-lg hover:bg-[#C7C7C7] transition-colors"
            >
              <IoFilter className="w-4 h-4" />
              <span className="text-sm font-semibold">Filtros</span>
            </button>
          </div>
          <div className="h-0.5 w-full bg-[#E5754C] my-4" />
          
          <p className="text-[#C7C7C7]/50 mt-1">
            {posts.length} de {totalPosts} noticias encontradas
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>
      </div>

      {loading && posts.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-[#232323] aspect-[16/11] rounded-2xl mb-4"></div>
              <div className="h-4 bg-[#232323] rounded mb-2"></div>
              <div className="h-4 bg-[#232323] rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {posts.map((post) => (
                  <NewsCard key={post.id} post={post} />
                ))}
              </div>

              {hasMore && !loading && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => {
                      const nextPage = page + 1;
                      setPage(nextPage);
                      fetchPosts(nextPage, true);
                    }}
                    className="text-[#E5754C] border-[1.4px] border-[#E5754C] px-4 py-2 rounded-full hover:shadow-[#E5754C] hover:shadow-sm transition-all duration-300"
                  >
                    Cargar más noticias
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#C7C7C7] text-lg">
                No se encontraron noticias con los filtros seleccionados
              </p>
            </div>
          )}
        </>
      )}

      {loading && posts.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#E5754C] border-t-transparent"></div>
        </div>
      )}
    </div>
  );
}