import { RSSFeedData, PodcastShow, PodcastEpisode } from '@/types/podcast';

const PODCAST_RSS_FEEDS = [
  'https://feeds.captivate.fm/divina-suerte-/',
];

class RSSService {
  private static instance: RSSService;
  private cache: Map<string, { data: RSSFeedData; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000;

  static getInstance(): RSSService {
    if (!RSSService.instance) {
      RSSService.instance = new RSSService();
    }
    return RSSService.instance;
  }

  private parseRSSXML(xmlString: string): RSSFeedData {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    const channel = xmlDoc.querySelector('channel');
    if (!channel) {
      throw new Error('Feed RSS inválido: no se encontró el canal');
    }

    const title = channel.querySelector('title')?.textContent?.trim() || '';
    const description = channel.querySelector('description')?.textContent?.trim() || '';
    const link = channel.querySelector('link')?.textContent?.trim() || '';
    const language = channel.querySelector('language')?.textContent?.trim() || undefined;
    const authorValue = channel.querySelector('author')?.textContent?.trim() || 
                   channel.querySelector('itunes\\:author, *[itunes\\:author]')?.textContent?.trim() ||
                   channel.querySelector('[*|author]')?.textContent?.trim();
    const author = authorValue || undefined;
    const categoryValue = channel.querySelector('category')?.textContent?.trim() ||
                     channel.querySelector('itunes\\:category, *[itunes\\:category]')?.getAttribute('text') ||
                     channel.querySelector('[*|category]')?.getAttribute('text');
    const category = categoryValue || undefined;
    const lastBuildDate = channel.querySelector('lastBuildDate')?.textContent?.trim() || undefined;

    let image = '';
    
    const itunesImage = channel.querySelector('itunes\\:image, *[itunes\\:image], [*|image]');
    if (itunesImage) {
      image = itunesImage.getAttribute('href') || itunesImage.getAttribute('url') || '';
    }
    
    if (!image) {
      const imageElement = channel.querySelector('image');
      if (imageElement) {
        const urlElement = imageElement.querySelector('url');
        if (urlElement) {
          image = urlElement.textContent?.trim() || '';
        }
      }
    }

    const items = Array.from(channel.querySelectorAll('item'));
    const episodes = items.map(item => {
      const episodeTitle = item.querySelector('title')?.textContent?.trim() || '';
      const episodeDescription = item.querySelector('description')?.textContent?.trim() || '';
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
      const guid = item.querySelector('guid')?.textContent?.trim() || '';
      
      const enclosure = item.querySelector('enclosure');
      let audioUrl = '';
      
      if (enclosure) {
        audioUrl = enclosure.getAttribute('url') || '';
        const type = enclosure.getAttribute('type') || '';
        if (!type.includes('audio') && !audioUrl.match(/\.(mp3|m4a|aac|ogg|wav)$/i)) {
          console.warn('Enclosure no parece ser audio:', audioUrl);
        }
      }
      
      if (!audioUrl) {
        const mediaContent = item.querySelector('media\\:content, *[media\\:content]');
        if (mediaContent && mediaContent.getAttribute('type')?.includes('audio')) {
          audioUrl = mediaContent.getAttribute('url') || '';
        }
      }
      
      let duration = '';
      const itunesDuration = item.querySelector('itunes\\:duration, *[itunes\\:duration], [*|duration]');
      if (itunesDuration) {
        const durationText = itunesDuration.textContent?.trim() || '';
        if (durationText && !durationText.includes(':')) {
          const totalSeconds = parseInt(durationText);
          if (!isNaN(totalSeconds)) {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            if (hours > 0) {
              duration = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
              duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
          } else {
            duration = durationText;
          }
        } else {
          duration = durationText || '00:00';
        }
      }

      return {
        title: episodeTitle,
        description: episodeDescription,
        audioUrl,
        duration: duration || '00:00',
        pubDate,
        guid
      };
    });

    return {
      title,
      description,
      image,
      link,
      language,
      author,
      category,
      lastBuildDate,
      episodes
    };
  }

  private async fetchRSSFeed(url: string): Promise<RSSFeedData> {
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const rssData = this.parseRSSXML(data.contents);
      
      this.cache.set(url, { data: rssData, timestamp: Date.now() });
      
      return rssData;
    } catch (error) {
      console.error(`Error al obtener RSS feed ${url}:`, error);
      throw error;
    }
  }

  async getAllPodcasts(): Promise<PodcastShow[]> {
    const shows: PodcastShow[] = [];
    
    for (const rssUrl of PODCAST_RSS_FEEDS) {
      try {
        const feedData = await this.fetchRSSFeed(rssUrl);
        
        const show: PodcastShow = {
          id: this.generateIdFromUrl(rssUrl),
          title: feedData.title,
          description: feedData.description,
          imageUrl: feedData.image,
          link: feedData.link,
          rssUrl,
          language: feedData.language,
          author: feedData.author,
          category: feedData.category,
          lastBuildDate: feedData.lastBuildDate
        };
        
        shows.push(show);
      } catch (error) {
        console.error(`Error al procesar podcast ${rssUrl}:`, error);
      }
    }
    
    return shows;
  }

  async getPodcastEpisodes(rssUrl: string): Promise<PodcastEpisode[]> {
    try {
      const feedData = await this.fetchRSSFeed(rssUrl);
      const showId = this.generateIdFromUrl(rssUrl);
      
      return feedData.episodes.map(episode => ({
        id: episode.guid || this.generateIdFromTitle(episode.title),
        title: episode.title,
        description: episode.description,
        audioUrl: episode.audioUrl,
        duration: episode.duration,
        pubDate: episode.pubDate,
        guid: episode.guid,
        showId
      }));
    } catch (error) {
      console.error(`Error al obtener episodios para ${rssUrl}:`, error);
      throw error;
    }
  }

  async getPodcastById(id: string): Promise<PodcastShow | null> {
    const shows = await this.getAllPodcasts();
    return shows.find(show => show.id === id) || null;
  }

  private generateIdFromUrl(url: string): string {
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  private generateIdFromTitle(title: string): string {
    return title.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  static cleanHtml(htmlString: string): string {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.textContent || div.innerText || '';
  }

  static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  }

  static addPodcastRSS(rssUrl: string) {
    if (!PODCAST_RSS_FEEDS.includes(rssUrl)) {
      PODCAST_RSS_FEEDS.push(rssUrl);
    }
  }

  static getRSSFeeds(): string[] {
    return [...PODCAST_RSS_FEEDS];
  }
}

export default RSSService.getInstance(); 