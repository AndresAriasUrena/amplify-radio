import { RSSFeedData, PodcastShow, PodcastEpisode, Author } from '@/types/podcast';

const PODCAST_RSS_FEEDS = [
  'https://feeds.captivate.fm/divina-suerte-/',
];
const PODCAST_AUTHORS: { [podcastId: string]: Author[] } = {
  'ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vzgl2aw5hlxn1zxj0zs0v': [
    {
      name: 'Sr.Loki',
      description: 'Tatuador, artista, locutor y productor de contenido. Con más de 10 años de experiencia en el mundo del tatuaje y la cultura pop.',
      imageUrl: '/assets/autores/SrLoki.jpeg',
      instagramUrl: 'https://www.instagram.com/sr.loki_studio/?hl=es'
    },
  ],/*
  'Doble click': [
    {
      name: 'Jose Porras',
      description: 'José Porras es un comunicador innato y apasionado por las ventas que ha dejado su marca en la publicidad, música, ventas y tecnología. Graduado en publicidad, comenzó en la agencia de publicidad Eureka y de ahí pasó a trabajar con la disquera BMG, donde llegó a ser Gerente de Mercadeo para Centroamérica y luego pasó a formar parte del equipo de Sony Music. Después de su etapa en las disquera se vincular a Microsoft y como Gerente de Canales OEM, fortaleció la presencia de Windows en el mercado. Posteriormente, como asesor independiente, se destacó en tecnología y fundó con éxito la empresa Alquileres Mobiled. Ha liderado campañas para multinacionales y actualmente asesora empresas, fusionando su experiencia para enfrentar los desafíos actuales del mercado con adaptabilidad y éxito. Su trayectoria es un testimonio de perseverancia y habilidad en el mundo del marketing, la tecnología y las ventas.',
      imageUrl: '/assets/autores/JOSEPORRAS.jpeg',
      instagramUrl: 'https://www.instagram.com/dobleclickcr/'
    },
  ],
  'Cross Fade': [
    {
      name: 'Cross Fade',
      description: '',
      imageUrl: '/assets/autores/CrossFade.jpeg',
      instagramUrl: 'https://www.instagram.com/crossfadecr/'
    },
  ],
  'Movete en el mundo': [
    {
      name: 'Cristina Castro',
      description: 'Cristina María, publicista y comunicadora costarricense nacida en 1982, creó "Movete en el mundo" para compartir su pasión por los viajes. A pesar de su miedo a volar, ha recorrido múltiples destinos y se especializa en organizar itinerarios detallados. Como profesora universitaria y profesional de medios, combina su experiencia comunicativa con su amor por descubrir culturas y gastronomías del mundo, inspirando a otros a vivir experiencias de viaje memorables.',
      imageUrl: '/assets/autores/CristinaCastro.jpeg',
      instagramUrl: 'https://www.instagram.com/moveteenelmundo/'
    },
  ],
  'Dadá': [
    {
      name: 'Stella Peralta',
      description: 'Stella es cantante, locutora y publicista con amplia experiencia en la industria musical, habiendo trabajado en Sony Music, como representante de bandas y vocalista de Le*Pop. Formada en canto clásico y popular, actualmente es host del programa "Ola Futura" en Radio 2 y presta su voz para comerciales. Emprendedora desde siempre, cofundó Trash (productos reciclados) y ahora desarrolla "Avellanas Pastelería" con su hermana chef. Amante del post punk, new wave y rock, disfruta la cocina vegana, el cine, los libros, la naturaleza y ayuda a animales callejeros, continuando el legado que le enseñó su hija Macris.',
      imageUrl: '/assets/autores/StellaPeralta.jpeg',
      instagramUrl: 'https://www.instagram.com/dada_en_la_radio/?hl=es'
    },
  ],
  'Aleatorio': [
    {
      name: 'Mauricio Artavia',
      description: 'Aleatorio es un programa de radio conducido por Mauricio Artavia que se transmite los lunes a las 7 pm por Amplify Radio 95.5 FM. El show explora la historia profunda de la música y sus artistas, enfocándose en canciones menos conocidas y bandas apreciadas por la crítica pero ignoradas por las radios comerciales. Con especiales dedicados a diversos géneros y artistas, desde íconos hasta grupos poco conocidos, Aleatorio busca ampliar el espectro cultural musical de sus oyentes, creando un "mundo paralelo al de los singles" que va más allá de los éxitos comerciales para descubrir gemas musicales ocultas.',
      imageUrl: '/assets/autores/MauricioArtavia.jpeg',
      instagramUrl: 'https://www.instagram.com/aleatorio.fm/'
    },
  ],
  'Lit by Lit': [
    {
      name: 'Lithus Arrieta Pérez',
      description: 'Melómano por naturaleza, agnóstico del género, gestor cultural y músico empírico desde niño. Lithus es uno de los productores de Amplify Radio y Director de la Agencia de Comunicación LIT INC. Todos los jueves a las 7:00pm comparte un espacio de dos horas en la frecuencia 95.5FM, que bajo el nombre de Lit by Lit, nos trae lo más fresco y novedoso de la escena musical de Costa Rica y Latinoamérica.',
      imageUrl: '/assets/autores/LithusArrietaPerez.jpeg',
      instagramUrl: ''
    },
  ],
  'Flamingo de noche': [
    {
      name: 'Mauricio Dapena',
      description: 'Mauricio Dapena sacó licenciaturas en diseño publicitario y producción audiovisual en Costa Rica y un máster en dirección de cine en España. Siempre ha tenido una pasión por la comunicación creativa y esto lo ha llevado a incursionar como actor en diferentes proyectos, como productor/presentador en el show radial “El Mañanero” de la Meva Radio en Barcelona, además ha conducido y producido los talkshows “Untitled” para Canal 9 Costa Rica en 2011 y “Flamingo de Noche” que se crea en 2021 para abordar temas relevantes de la comunidad LGTBIQ+. Este último proyecto se convierte en un espacio multiplataforma con una primera temporada de 6 capítulos disponible en Youtube, una red noticiosa en Instagram y el programa de radio semanal con el mismo nombre en Amplify Radio.',
      imageUrl: '/assets/autores/MauricioDapena.jpeg',
      instagramUrl: 'https://www.instagram.com/flamingodenoche/'
    },
    {
      name: 'Catalina Restrepo Mejía',
      description: 'Colombiana-tica, publicista, escritora. Amante de los gatos, del vino y de Madonna. Cocreadora de Flamingo de Noche, un espacio para la comunidad LGTBIQ+.',
      imageUrl: '/assets/autores/CatalinaRestrepoMejia.jpeg',
      instagramUrl: 'https://instagram.com/catakats/'
    },
  ],
  'Dance to this Radio': [
    {
      name: 'Pablo Acuña',
      description: 'Soy Pablo Acuña, fundador del medio web especializado en música: Dance To The Radio, que mutó a un programa radial en Amplify Radio, 95.5 fm. Soy un entusiasta de la música que siempre ha buscado maneras eficientes y divertidas de compartir esa pasión. Perfeccionista y curioso por excelencia en todo lo que hace. Con una pésima toma de decisiones que compensa con todo el amor que le da a su perro.',
      imageUrl: '/assets/autores/PabloAcuna.jpeg',
      instagramUrl: 'https://www.instagram.com/dancettradio/'
    },
  ],
  'Alta Frecuencia': [
    {
      name: 'Gabriela Muñoz Carrillo',
      description: 'Soy periodista desde hace 16 años, inicialmente en prensa escrita y televisión, cubriendo desde terremotos y la elección del Papa Francisco hasta el primer caso de AH1N1. Después de años de jornadas extenuantes, me dediqué a relaciones públicas y asesoría de prensa durante casi 8 años. La maternidad de mi hija Sofía transformó completamente mi perspectiva de vida, llevándome a valorar el bienestar y la paz. Ahora en "Alta Frecuencia", mi primera experiencia radial, combino mi pasión por comunicar con una vida más equilibrada, practicando mindfulness, disfrutando la cocina, los documentales y buscando un ejercicio que me motive antes de los 40.',
      imageUrl: '/assets/autores/GabrielaMunozCarrillo.jpeg',
      instagramUrl: 'https://www.instagram.com/gabymunca/'
    },
  ],
  'Ciudad Canibal': [
    {
      name: 'Fernando Chironi',
      description: 'Me crié en Pavas. De tantas idas y vueltas siento que soy un resultado experimental de lo que me ha pasado, no le tengo miedo a estar equivocado, a pensar distinto, ni a cambiar mis posiciones. Lo que se dice en nuestros espacios es una más de las interpretaciones de lo qué pasa, no hay solamente una verdad, el relato debe ser plural e inclusivo; escúchanos los lunes y jueves de 1 a 3 pm en Ciudad Caníbal.',
      imageUrl: '/assets/autores/FernandoChironi.jpeg',
      instagramUrl: 'https://www.instagram.com/ciudadcanibal/'
    },
  ],
  'La Telaraña': [
    {
      name: 'Emma Tristán',
      description: 'Emma Tristán es geóloga y consultora ambiental y de salud ocupacional, con más de 20 años de experiencia internacional. Cuenta con un Doctorado en Geología Ambiental otorgado por Imperial College, Reino Unido. Se ha especializado en temas relacionados con el financiamiento climático, los riesgos y oportunidades ambientales y sociales para el sector financiero y el liderazgo en seguridad. Además, ha producido los cortometrajes La niña fantasma (2020) y Formas de pescar (2022) y ha publicado artículos de opinión en medios como el Periódico La Nación, la Republica y Página Abierta. Es directora general de Futuris Consulting, una firma consultora con oficinas en Costa Rica.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/la_telarana_2022/'
    },
    {
      name: 'Jurgen Ureña',
      description: 'Jurgen Ureña es cineasta y profesor universitario. Cuenta con una Maestría en Documental de la Universidad Autónoma de Barcelona. Sus películas han participado en los festivales de cine de Cannes, Trieste, Los Ángeles, La Habana, Clermont Ferrand y Cartagena. Durante más de 20 años ha sido forista en diversos espacios dedicados a la proyección cinematográfica y ha participado como conferencista en eventos internacionales como la I Bienal de la Américas (Denver, 2010), el Encuentro de Críticos e Investigadores de PhotoEspaña (Montevideo, 2010), la Cinemateca de Bolivia (La Paz, 2012) y la Fundación Lebensohn (Buenos Aires, 2014), entre otros espacios.',
      imageUrl: '/assets/autores/JurgenUrena.jpeg',
      instagramUrl: 'https://www.instagram.com/la_telarana_2022/'
    },
  ],
  'QUE INTENSAS': [
    {
      name: 'Ximena Esquivel',
      description: 'Diseñadora de joyas y emprendedora. Su marca de joyería, Ximena Esquivel Joyería, diseña joyería en plata con piedras semi preciosas y lleva más de 10 años en el mercado. Comercializa su joyería en redes sociales, tiendas de diseño nacional, aeropuertos, tiendas de souvenir y hoteles. Es graduada del EMBA de INCAE.',
      imageUrl: '/assets/autores/XimenaEsquivel.jpeg',
      instagramUrl: 'https://www.instagram.com/queintensaspodcast/?hl=es-la'
    },
    {
      name: 'Marianne Hütt',
      description: 'Neurocientífica y oncóloga de formación, emprendedora y expositora en temas de ciencia, tecnología y empoderamiento femenino con énfasis los campos STEM. Fundo el Laboratorio de Transformación, es la Directora de la vertical de Salud Digital de una empresa de tecnología y es graduada del EMBA de INCAE.',
      imageUrl: '/assets/autores/MarianneHutt.jpeg',
      instagramUrl: 'https://www.instagram.com/queintensaspodcast/?hl=es-la'
    },
  ],
  'WAX wednesdays': [
    {
      name: 'Jose María Alfaro',
      description: 'Músico multiinstrumentalista y DJ especializado en vinyl, participando en bandas locales como Los Cuchillos, Los Reverbs y Los Tapes. Como DJ se presenta en espacios como Dancefloor Inferno, Señora Cumbia y Onda Tropical, además de conducir "Wax Wednesdays" los miércoles a las 3pm por Amplify Radio 95.5fm. Gestor y director de Amon Solar y El Sótano, actualmente produce y dirige la serie "Transmisiones Culturales de Amon Solar", que documenta la diversidad de la escena musical costarricense. Coleccionista apasionado de discos de vinyl y amante de la música sin distinción de géneros.',
      imageUrl: '/assets/autores/JoseMariaAlfaro.jpeg',
      instagramUrl: 'https://www.instagram.com/wax_wednesdays/'
    },
  ],
  'Pulso Empresarial': [
    {
      name: 'Nilsen Buján',
      description: 'Hijo de Milton y Carmen, menor de 4 hermanos, deportista no élite, amante de lo no tradicional, de lo disruptivo en positivo, creyente en Dios, apasionado por escuchar a todos los que quieran aportar en la vida. Con experiencia en comunicación en medios internacionales y nacionales. Con una visión de orden, crecimiento y desarrollo personal y profesional. No soy un todólogo pero sí un ideólogo y aprendiz de lo positivo.',
      imageUrl: '/assets/autores/NilsenBujan.jpeg',
      instagramUrl: 'https://instagram.com/pulsoempresarialnb/'
    },
  ],
  'Registros': [
    {
      name: 'Alonso Aguilar',
      description: 'Alonso Aguilar es un escritor, periodista cultural y productor audiovisual freelance. En su trayectoria profesional ha colaborado en medios como Mubi Notebook, Cinema Tropical, Bandcamp, photogénie y Hyperallergic. Desde 2016 hace el intento de ver al menos una película al día. Su afición por la historia va desde su programa Registros en Amplify Radio, pasando por su labor como crítico de cine, y permea hasta su gusto por los juegos de mesa estratégicos.',
      imageUrl: '/assets/autores/AlonsoAguilar.jpeg',
      instagramUrl: 'https://instagram.com/registrosradio/'
    },
  ],
  'EMPRENDEDORES DE VIDA': [
    {
      name: 'Carla Castro',
      description: 'Mentora de emprendimiento y liderazgo femenino, comunicadora y productora de Emprendedores de Vida. Apasionada de la resiliencia puesta en práctica, porque la adversidad es capaz de sacar nuestra mejor versión. Me mueve contar estas historias como herramienta para inspirar. Mujer en constante construcción y madre de tres hijas.',
      imageUrl: '/assets/autores/CarlaCastro.jpeg',
      instagramUrl: 'https://instagram.com/emprendedoresdvida/?hl=es'
    },
  ],*/
};

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
          lastBuildDate: feedData.lastBuildDate,
          authors: PODCAST_AUTHORS[this.generateIdFromUrl(rssUrl)] || []
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

  static addPodcastAuthors(rssUrl: string, authors: Author[]): void {
    const id = RSSService.getInstance().generateIdFromUrl(rssUrl);
    PODCAST_AUTHORS[id] = authors;
  }

  static getPodcastAuthors(rssUrl: string): Author[] {
    const id = RSSService.getInstance().generateIdFromUrl(rssUrl);
    return PODCAST_AUTHORS[id] || [];
  }

  static updateAuthorConfig(podcastId: string, authors: Author[]): void {
    PODCAST_AUTHORS[podcastId] = authors;
  }

  static getAllAuthorConfigs(): { [podcastId: string]: Author[] } {
    return { ...PODCAST_AUTHORS };
  }

  static generateIdFromUrl(url: string): string {
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }
}

export default RSSService.getInstance(); 