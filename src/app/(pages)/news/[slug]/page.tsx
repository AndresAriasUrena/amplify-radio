import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterSidebar from '@/components/news/FilterSidebar';
import RelatedNewsGrid from '@/components/news/RelatedNewsGrid';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

const NewsSectionsSidebar = dynamic(() => import('@/components/news/NewsSectionsSidebar'), { ssr: false });

interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    author: number;
    _embedded?: {
        author?: Array<{ name: string }>;
        'wp:featuredmedia'?: Array<{ source_url: string }>;
        'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
    };
}

async function getPostBySlug(slug: string): Promise<WPPost | null> {
    const res = await fetch(`https://amplify.aurigital.com/wp-json/wp/v2/posts?slug=${slug}&_embed`, { next: { revalidate: 60 } });
    const data = await res.json();
    return data[0] || null;
}

async function getRelatedPosts(categoryId: number, excludeId: number): Promise<WPPost[]> {
    const res = await fetch(`https://amplify.aurigital.com/wp-json/wp/v2/posts?categories=${categoryId}&exclude=${excludeId}&per_page=3&orderby=date&order=desc&_embed`, { next: { revalidate: 60 } });
    return await res.json();
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);
    if (!post) return notFound();


    const mainCategory = post._embedded?.['wp:term']?.[0]?.[0];
    const categoryId = mainCategory?.id;

    let relatedPosts: WPPost[] = [];
    if (categoryId) {
        relatedPosts = await getRelatedPosts(categoryId, post.id);
    }

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-news.jpg';
    const author = post._embedded?.author?.[0]?.name || 'Autor desconocido';

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <>
            <div className="min-h-screen font-jost">
                <Navbar />
                <div className="px-4 sm:px-8">
                    <div className="max-w-7xl mx-auto relative mt-4">
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16">
                            <aside className="order-1 lg:order-2 w-full lg:w-72 flex flex-col gap-8">
                                <div className="hidden lg:block">
                                    <FilterSidebar />
                                </div>
                            </aside>
                            <div className="flex-1 order-2 lg:order-1 items-center justify-center text-center">
                                {mainCategory && (
                                    <span className="inline-block mb-4 px-4 py-2 rounded-full bg-[#232323] text-white/60 text-xs font-normal">
                                        {mainCategory.name}
                                    </span>
                                )}
                                <h1 className="font-lexend text-3xl font-semibold text-[#C7C7C7] mb-2">
                                    {post.title.rendered.replace(/<[^>]+>/g, '')}
                                </h1>
                                <div className="mb-6 text-[#FFFFFF]/60 text-sm">
                                    {author} <span className="text-[#757575]">- {formatDate(post.date)}</span>
                                </div>
                                <div className="mb-8">
                                    <img
                                        src={featuredImage}
                                        alt={post.title.rendered.replace(/<[^>]+>/g, '')}
                                        className="w-full max-h-[400px] object-cover rounded-2xl mx-auto"
                                    />
                                </div>
                                 <div className="flex flex-row gap-8">
                                    <div className="hidden lg:block text-left w-full">
                                        <NewsSectionsSidebar html={post.content.rendered} />
                                    </div>
                                    <article
                                        className="prose prose-invert text-[#C7C7C7] prose-h2:text-[#E5754C] prose-a:text-[#E5754C] prose-strong:text-white text-left mx-auto"
                                        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                                    />
                                </div>
                                {relatedPosts.length > 0 && <RelatedNewsGrid posts={relatedPosts} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
} 