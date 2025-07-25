'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { PodcastShow } from '@/types/podcast';
import RSSService from '@/lib/rssService';
import { IoReload } from 'react-icons/io5';
import PodcastCard from '@/components/UI/PodcastCard';

export default function PodcastsGridHome() {
  const [podcasts, setPodcasts] = useState<PodcastShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPodcasts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const shows = await RSSService.getAllPodcasts();
      setPodcasts(shows);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar podcasts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  const handleRetry = () => {
    setError(null);
    fetchPodcasts();
  };

  if (error) {
    return (
      <section className="w-full max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-lexend font-semibold text-xl">ÚLTIMOS PODCASTS</h2>
        </div>
        <div className="h-0.5 w-full bg-[#E5754C] mb-6" />
        <div className="text-center py-8">
          <p className="text-[#C7C7C7] mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="text-[#E5754C] border-[1.4px] border-[#E5754C] px-4 py-2 rounded-full hover:shadow-[#E5754C] hover:shadow-sm transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <IoReload className="w-4 h-4" />
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  const recentPodcasts = podcasts
    .sort((a, b) => {
      const dateA = new Date(a.lastBuildDate || '');
      const dateB = new Date(b.lastBuildDate || '');
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);

  return (
    <section className="w-full max-w-7xl mx-auto px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-lexend font-semibold text-xl">ÚLTIMOS PODCASTS</h2>
        <Link href="/podcasts" className="text-[#9A9898] hover:text-[#E5754C] text-sm flex items-center gap-1">
          Ver todos <span aria-hidden>→</span>
        </Link>
      </div>
      <div className="h-0.5 w-full bg-[#E5754C] mb-6" />
      
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-[#232323] aspect-[16/11] rounded-2xl mb-4"></div>
              <div className="h-4 bg-[#232323] rounded mb-2"></div>
              <div className="h-4 bg-[#232323] rounded w-2/3"></div>
            </div>
          ))}
        </div>
      )}

      {!loading && recentPodcasts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recentPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      )}

      {!loading && recentPodcasts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#C7C7C7] text-lg">
            No se encontraron podcasts
          </p>
        </div>
      )}
    </section>
  );
} 