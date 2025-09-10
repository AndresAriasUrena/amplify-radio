import WordPressService from '@/lib/wordpressService';
import { SEO_CONFIG } from '@/lib/seo';

export default async function sitemap() {
  const baseUrl = SEO_CONFIG.siteUrl;
  
  // Timeout para prevenir builds largos
  const SITEMAP_TIMEOUT = 30000; // 30 segundos
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  let allPosts = [];
  
  // Función para hacer fetch con timeout
  const fetchWithTimeout = async (fetchFunction, timeout) => {
    return Promise.race([
      fetchFunction(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), timeout)
      )
    ]);
  };
  
  try {
    console.log('Fetching posts for sitemap...');
    
    // Limitar a solo los primeros 50 posts más recientes para acelerar el build
    const firstBatch = await fetchWithTimeout(
      () => WordPressService.getPosts({ 
        page: 1, 
        perPage: 50, // Reducido de 100 a 50
        orderBy: 'date',
        order: 'desc'
      }),
      SITEMAP_TIMEOUT
    );
    
    allPosts = [...firstBatch.posts];
    console.log(`Fetched ${allPosts.length} posts for sitemap`);
    
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    console.log('Continuing with static pages only...');
    // Continuar con páginas estáticas si WordPress falla
  }

  const newsPages = allPosts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...newsPages];
} 