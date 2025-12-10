import { RSSFeedData, PodcastShow, PodcastEpisode, Author } from '@/types/podcast';
import { RSS_CONFIG, retryOperation } from './rssConfig';
import * as xml2js from 'xml2js';

const PODCAST_RSS_FEEDS = [
  // ACTUALES
  { url: 'https://feeds.captivate.fm/la-telaraa/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/doble-click/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/pulso-empresarial/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/ciudad-canibal/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/aleatorio/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/registros1/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/dada/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/wax/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/lit-by-lit/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/flamingo-de-noche/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/cross-fade/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/conexion-220/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/frecuencia-1111/', status: 'actual' as const },
  { url: 'https://feeds.captivate.fm/verso-per-verso/', status: 'actual' as const },
  
  // HISTORIALES
  { url: 'https://feeds.captivate.fm/que-intensas/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/alta-frecuencia/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/movete-en-el-mundo/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/canalizando-amor/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/el-gallinero/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/emprendedores-de-vida/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/galeria-nocturna/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/los-incorregibles/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/pelos-en-la-ropa/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/pon-tu-mente-al-sol/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/que-buen-lugar/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/divina-suerte/', status: 'historial' as const },
  { url: 'https://feeds.captivate.fm/caravana-radio/', status: 'historial' as const },
];

// Mapeo de URLs RSS a imágenes locales (ordenado por prioridad de carga)
const PODCAST_LOCAL_IMAGES: { [rssUrl: string]: string } = {
  // PRIORIDAD 1 - Podcasts más populares (cargan primero)
  'https://feeds.captivate.fm/la-telarana/': '/assets/podcast/la-telaraña.avif',
  'https://feeds.captivate.fm/doble-click/': '/assets/podcast/doble-click.avif',
  'https://feeds.captivate.fm/ciudad-canibal/': '/assets/podcast/ciudad-canibal.avif',
  
  // PRIORIDAD 2 - Podcasts actuales populares
  'https://feeds.captivate.fm/pulso-empresarial/': '/assets/podcast/pulso-empresarial.avif',
  'https://feeds.captivate.fm/aleatorio/': '/assets/podcast/aleatorio.avif',
  'https://feeds.captivate.fm/registros/': '/assets/podcast/registros.avif',
  
  // PRIORIDAD 3 - Resto de actuales
  'https://feeds.captivate.fm/dada/': '/assets/podcast/dada.avif',
  'https://feeds.captivate.fm/wax/': '/assets/podcast/wax.avif',
  'https://feeds.captivate.fm/lit-by-lit/': '/assets/podcast/lit-by-bit.avif',
  'https://feeds.captivate.fm/flamingo-de-noche/': '/assets/podcast/flamingo.avif',
  'https://feeds.captivate.fm/cross-fade/': '/assets/podcast/crossfade.avif',
  'https://feeds.captivate.fm/conexion-220/': '/assets/podcast/conexion220.avif',
  'https://feeds.captivate.fm/verso-per-verso/': '/assets/podcast/versoperverso.avif',
  // 'https://feeds.captivate.fm/frecuencia-1111/': '/assets/podcast/frecuencia1111.avif', // Missing file - will use fallback
  
  // HISTORIALES - Menor prioridad
  'https://feeds.captivate.fm/que-intensas/': '/assets/podcast/que-intensas.avif',
  'https://feeds.captivate.fm/alta-frecuencia/': '/assets/podcast/alta-frecuencia.avif',
  'https://feeds.captivate.fm/movete-en-el-mundo/': '/assets/podcast/movete-en-el-mundo.avif',
  'https://feeds.captivate.fm/canalizando-amor/': '/assets/podcast/canalizando.avif',
  'https://feeds.captivate.fm/el-gallinero/': '/assets/podcast/el-gallinero.avif',
  'https://feeds.captivate.fm/emprendedores-de-vida/': '/assets/podcast/emprendedores.avif',
  'https://feeds.captivate.fm/galeria-nocturna/': '/assets/podcast/galeria-nocturna.avif',
  'https://feeds.captivate.fm/pelos-en-la-ropa/': '/assets/podcast/pelos-en-la-ropa.avif',
  'https://feeds.captivate.fm/pon-tu-mente-al-sol/': '/assets/podcast/mente-al-sol.avif',
  'https://feeds.captivate.fm/que-buen-lugar/': '/assets/podcast/buen-lugar.avif',
  'https://feeds.captivate.fm/caravana-radio/': '/assets/podcast/caravana-radio.avif',
  // 'https://feeds.captivate.fm/los-incorregibles/': '/assets/podcast/incorregibles.avif', // Missing file - will use fallback
  // 'https://feeds.captivate.fm/divina-suerte/': '/assets/podcast/divina-suerte.avif', // Missing file - will use fallback
};

const PODCAST_AUTHORS: { [podcastUrl: string]: Author[] } = {
  // ACTUALES CON AUTORES CONOCIDOS
  'https://feeds.captivate.fm/la-telarana/': [
    {
      name: 'Emma Tristán',
      description: 'Emma Tristán es geóloga y consultora ambiental y de salud ocupacional, con más de 20 años de experiencia internacional. Cuenta con un Doctorado en Geología Ambiental otorgado por Imperial College, Reino Unido. Se ha especializado en temas relacionados con el financiamiento climático, los riesgos y oportunidades ambientales y sociales para el sector financiero y el liderazgo en seguridad. Además, ha producido los cortometrajes La niña fantasma (2020) y Formas de pescar (2022) y ha publicado artículos de opinión en medios como el Periódico La Nación, la Republica y Página Abierta. Es directora general de Futuris Consulting, una firma consultora con oficinas en Costa Rica.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/la_telarana_2022/',
      status: 'actual',
      podcastName: 'La Telaraña',
      podcastId: ''
    },
    {
      name: 'Jurgen Ureña',
      description: 'Jurgen Ureña es cineasta y profesor universitario. Cuenta con una Maestría en Documental de la Universidad Autónoma de Barcelona. Sus películas han participado en los festivales de cine de Cannes, Trieste, Los Ángeles, La Habana, Clermont Ferrand y Cartagena. Durante más de 20 años ha sido forista en diversos espacios dedicados a la proyección cinematográfica y ha participado como conferencista en eventos internacionales como la I Bienal de la Américas (Denver, 2010), el Encuentro de Críticos e Investigadores de PhotoEspaña (Montevideo, 2010), la Cinemateca de Bolivia (La Paz, 2012) y la Fundación Lebensohn (Buenos Aires, 2014), entre otros espacios.',
      imageUrl: '/assets/autores/JurgenUrena.jpeg',
      instagramUrl: 'https://www.instagram.com/la_telarana_2022/',
      status: 'actual',
      podcastName: 'La Telaraña',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/doble-click/': [
    {
      name: 'Jose Porras',
      description: 'José Porras es un comunicador innato y apasionado por las ventas que ha dejado su marca en la publicidad, música, ventas y tecnología. Graduado en publicidad, comenzó en la agencia de publicidad Eureka y de ahí pasó a trabajar con la disquera BMG, donde llegó a ser Gerente de Mercadeo para Centroamérica y luego pasó a formar parte del equipo de Sony Music. Después de su etapa en las disquera se vincular a Microsoft y como Gerente de Canales OEM, fortaleció la presencia de Windows en el mercado. Posteriormente, como asesor independiente, se destacó en tecnología y fundó con éxito la empresa Alquileres Mobiled. Ha liderado campañas para multinacionales y actualmente asesora empresas, fusionando su experiencia para enfrentar los desafíos actuales del mercado con adaptabilidad y éxito. Su trayectoria es un testimonio de perseverancia y habilidad en el mundo del marketing, la tecnología y las ventas.',
      imageUrl: '/assets/autores/JOSEPORRAS.jpeg',
      instagramUrl: 'https://www.instagram.com/dobleclickcr/',
      status: 'actual',
      podcastName: 'Doble Click',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/pulso-empresarial/': [
    {
      name: 'Nilsen Buján',
      description: 'Hijo de Milton y Carmen, menor de 4 hermanos, deportista no élite, amante de lo no tradicional, de lo disruptivo en positivo, creyente en Dios, apasionado por escuchar a todos los que quieran aportar en la vida. Con experiencia en comunicación en medios internacionales y nacionales. Con una visión de orden, crecimiento y desarrollo personal y profesional. No soy un todólogo pero sí un ideólogo y aprendiz de lo positivo.',
      imageUrl: '/assets/autores/NilsenBujan.jpeg',
      instagramUrl: 'https://instagram.com/pulsoempresarialnb/',
      status: 'actual',
      podcastName: 'Pulso Empresarial',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/ciudad-canibal/': [
    {
      name: 'Fernando Chironi',
      description: 'Me crié en Pavas. De tantas idas y vueltas siento que soy un resultado experimental de lo que me ha pasado, no le tengo miedo a estar equivocado, a pensar distinto, ni a cambiar mis posiciones. Lo que se dice en nuestros espacios es una más de las interpretaciones de lo qué pasa, no hay solamente una verdad, el relato debe ser plural e inclusivo; escúchanos los lunes y jueves de 1 a 3 pm en Ciudad Caníbal.',
      imageUrl: '/assets/autores/FernandoChironi.jpeg',
      instagramUrl: 'https://www.instagram.com/ciudadcanibal/',
      status: 'actual',
      podcastName: 'Ciudad Caníbal',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/aleatorio/': [
    {
      name: 'Mauricio Artavia',
      description: 'Aleatorio es un programa de radio conducido por Mauricio Artavia que se transmite los lunes a las 7 pm por Amplify Radio 95.5 FM. El show explora la historia profunda de la música y sus artistas, enfocándose en canciones menos conocidas y bandas apreciadas por la crítica pero ignoradas por las radios comerciales. Con especiales dedicados a diversos géneros y artistas, desde íconos hasta grupos poco conocidos, Aleatorio busca ampliar el espectro cultural musical de sus oyentes, creando un "mundo paralelo al de los singles" que va más allá de los éxitos comerciales para descubrir gemas musicales ocultas.',
      imageUrl: '/assets/autores/MauricioArtavia.jpeg',
      instagramUrl: 'https://www.instagram.com/aleatorio.fm/',
      status: 'actual',
      podcastName: 'Aleatorio',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/registros/': [
    {
      name: 'Alonso Aguilar',
      description: 'Alonso Aguilar es un escritor, periodista cultural y productor audiovisual freelance. En su trayectoria profesional ha colaborado en medios como Mubi Notebook, Cinema Tropical, Bandcamp, photogénie y Hyperallergic. Desde 2016 hace el intento de ver al menos una película al día. Su afición por la historia va desde su programa Registros en Amplify Radio, pasando por su labor como crítico de cine, y permea hasta su gusto por los juegos de mesa estratégicos.',
      imageUrl: '/assets/autores/AlonsoAguilar.jpeg',
      instagramUrl: 'https://instagram.com/registrosradio/',
      status: 'actual',
      podcastName: 'Registros',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/dada/': [
    {
      name: 'Stella Peralta',
      description: 'Stella es cantante, locutora y publicista con amplia experiencia en la industria musical, habiendo trabajado en Sony Music, como representante de bandas y vocalista de Le*Pop. Formada en canto clásico y popular, actualmente es host del programa "Ola Futura" en Radio 2 y presta su voz para comerciales. Emprendedora desde siempre, cofundó Trash (productos reciclados) y ahora desarrolla "Avellanas Pastelería" con su hermana chef. Amante del post punk, new wave y rock, disfruta la cocina vegana, el cine, los libros, la naturaleza y ayuda a animales callejeros, continuando el legado que le enseñó su hija Macris.',
      imageUrl: '/assets/autores/StellaPeralta.jpeg',
      instagramUrl: 'https://www.instagram.com/dada_en_la_radio/?hl=es',
      status: 'actual',
      podcastName: 'Dadá',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/wax/': [
    {
      name: 'Jose María Alfaro',
      description: 'Músico multiinstrumentalista y DJ especializado en vinyl, participando en bandas locales como Los Cuchillos, Los Reverbs y Los Tapes. Como DJ se presenta en espacios como Dancefloor Inferno, Señora Cumbia y Onda Tropical, además de conducir "Wax Wednesdays" los miércoles a las 3pm por Amplify Radio 95.5fm. Gestor y director de Amon Solar y El Sótano, actualmente produce y dirige la serie "Transmisiones Culturales de Amon Solar", que documenta la diversidad de la escena musical costarricense. Coleccionista apasionado de discos de vinyl y amante de la música sin distinción de géneros.',
      imageUrl: '/assets/autores/JoseMariaAlfaro.jpeg',
      instagramUrl: 'https://www.instagram.com/wax_wednesdays/',
      status: 'actual',
      podcastName: 'Wax',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/lit-by-lit/': [
    {
      name: 'Lithus Arrieta Pérez',
      description: 'Melómano por naturaleza, agnóstico del género, gestor cultural y músico empírico desde niño. Lithus es uno de los productores de Amplify Radio y Director de la Agencia de Comunicación LIT INC. Todos los jueves a las 7:00pm comparte un espacio de dos horas en la frecuencia 95.5FM, que bajo el nombre de Lit by Lit, nos trae lo más fresco y novedoso de la escena musical de Costa Rica y Latinoamérica.',
      imageUrl: '/assets/autores/LithusArrietaPerez.jpeg',
      instagramUrl: '',
      status: 'actual',
      podcastName: 'Lit by Lit',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/flamingo-de-noche/': [
    {
      name: 'Mauricio Dapena',
      description: 'Mauricio Dapena sacó licenciaturas en diseño publicitario y producción audiovisual en Costa Rica y un máster en dirección de cine en España. Siempre ha tenido una pasión por la comunicación creativa y esto lo ha llevado a incursionar como actor en diferentes proyectos, como productor/presentador en el show radial "El Mañanero" de la Meva Radio en Barcelona, además ha conducido y producido los talkshows "Untitled" para Canal 9 Costa Rica en 2011 y "Flamingo de Noche" que se crea en 2021 para abordar temas relevantes de la comunidad LGTBIQ+. Este último proyecto se convierte en un espacio multiplataforma con una primera temporada de 6 capítulos disponible en Youtube, una red noticiosa en Instagram y el programa de radio semanal con el mismo nombre en Amplify Radio.',
      imageUrl: '/assets/autores/MauricioDapena.jpeg',
      instagramUrl: 'https://www.instagram.com/flamingodenoche/',
      status: 'actual',
      podcastName: 'Flamingo de Noche',
      podcastId: ''
    },
    {
      name: 'Catalina Restrepo Mejía',
      description: 'Colombiana-tica, publicista, escritora. Amante de los gatos, del vino y de Madonna. Cocreadora de Flamingo de Noche, un espacio para la comunidad LGTBIQ+.',
      imageUrl: '/assets/autores/CatalinaRestrepoMejia.jpeg',
      instagramUrl: 'https://instagram.com/catakats/',
      status: 'actual',
      podcastName: 'Flamingo de Noche',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/cross-fade/': [
    {
      name: 'Cross Fade',
      description: '',
      imageUrl: '/assets/autores/CrossFade.jpeg',
      instagramUrl: 'https://www.instagram.com/crossfadecr/',
      status: 'actual',
      podcastName: 'Cross Fade',
      podcastId: ''
    },
  ],
  
  // NUEVOS PODCASTS ACTUALES - SIN AUTORES AÚN
  'https://feeds.captivate.fm/conexion-220/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'actual',
      podcastName: 'Conexion 220',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/frecuencia-1111/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'actual',
      podcastName: 'Frecuencia 11:11',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/verso-per-verso/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'actual',
      podcastName: 'Verso por Verso',
      podcastId: ''
    },
  ],
  
  // HISTORIALES CON AUTORES CONOCIDOS
  'https://feeds.captivate.fm/que-intensas/': [
    {
      name: 'Ximena Esquivel',
      description: 'Diseñadora de joyas y emprendedora. Su marca de joyería, Ximena Esquivel Joyería, diseña joyería en plata con piedras semi preciosas y lleva más de 10 años en el mercado. Comercializa su joyería en redes sociales, tiendas de diseño nacional, aeropuertos, tiendas de souvenir y hoteles. Es graduada del EMBA de INCAE.',
      imageUrl: '/assets/autores/XimenaEsquivel.jpeg',
      instagramUrl: 'https://www.instagram.com/queintensaspodcast/?hl=es-la',
      status: 'historial',
      podcastName: 'Qué Intensas',
      podcastId: ''
    },
    {
      name: 'Marianne Hütt',
      description: 'Neurocientífica y oncóloga de formación, emprendedora y expositora en temas de ciencia, tecnología y empoderamiento femenino con énfasis los campos STEM. Fundo el Laboratorio de Transformación, es la Directora de la vertical de Salud Digital de una empresa de tecnología y es graduada del EMBA de INCAE.',
      imageUrl: '/assets/autores/MarianneHutt.jpeg',
      instagramUrl: 'https://www.instagram.com/queintensaspodcast/?hl=es-la',
      status: 'historial',
      podcastName: 'Qué Intensas',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/alta-frecuencia/': [
    {
      name: 'Gabriela Muñoz Carrillo',
      description: 'Soy periodista desde hace 16 años, inicialmente en prensa escrita y televisión, cubriendo desde terremotos y la elección del Papa Francisco hasta el primer caso de AH1N1. Después de años de jornadas extenuantes, me dediqué a relaciones públicas y asesoría de prensa durante casi 8 años. La maternidad de mi hija Sofía transformó completamente mi perspectiva de vida, llevándome a valorar el bienestar y la paz. Ahora en "Alta Frecuencia", mi primera experiencia radial, combino mi pasión por comunicar con una vida más equilibrada, practicando mindfulness, disfrutando la cocina, los documentales y buscando un ejercicio que me motive antes de los 40.',
      imageUrl: '/assets/autores/GabrielaMunozCarrillo.jpeg',
      instagramUrl: 'https://www.instagram.com/gabymunca/',
      status: 'historial',
      podcastName: 'Alta Frecuencia',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/movete-en-el-mundo/': [
    {
      name: 'Cristina Castro',
      description: 'Cristina María, publicista y comunicadora costarricense nacida en 1982, creó "Movete en el mundo" para compartir su pasión por los viajes. A pesar de su miedo a volar, ha recorrido múltiples destinos y se especializa en organizar itinerarios detallados. Como profesora universitaria y profesional de medios, combina su experiencia comunicativa con su amor por descubrir culturas y gastronomías del mundo, inspirando a otros a vivir experiencias de viaje memorables.',
      imageUrl: '/assets/autores/CristinaCastro.jpeg',
      instagramUrl: 'https://www.instagram.com/moveteenelmundo/',
      status: 'historial',
      podcastName: 'Movete en el Mundo',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/emprendedores-de-vida/': [
    {
      name: 'Carla Castro',
      description: 'Mentora de emprendimiento y liderazgo femenino, comunicadora y productora de Emprendedores de Vida. Apasionada de la resiliencia puesta en práctica, porque la adversidad es capaz de sacar nuestra mejor versión. Me mueve contar estas historias como herramienta para inspirar. Mujer en constante construcción y madre de tres hijas.',
      imageUrl: '/assets/autores/CarlaCastro.jpeg',
      instagramUrl: 'https://instagram.com/emprendedoresdvida/?hl=es',
      status: 'historial',
      podcastName: 'Emprendedores de Vida',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/divina-suerte/': [
    {
      name: 'Sr.Loki',
      description: 'Tatuador, artista, locutor y productor de contenido. Con más de 10 años de experiencia en el mundo del tatuaje y la cultura pop.',
      imageUrl: '/assets/autores/SrLoki.jpeg',
      instagramUrl: 'https://www.instagram.com/sr.loki_studio/?hl=es',
      status: 'historial',
      podcastName: 'Divina Suerte',
      podcastId: ''
    },
  ],
  
  // NUEVOS PODCASTS HISTORIALES - SIN AUTORES AÚN
  'https://feeds.captivate.fm/canalizando-amor/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'historial',
      podcastName: '',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/el-gallinero/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'historial',
      podcastName: '',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/galeria-nocturna/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'historial',
      podcastName: '',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/los-incorregibles/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'historial',
      podcastName: '',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/pelos-en-la-ropa/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'historial',
      podcastName: '',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/pon-tu-mente-al-sol/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'historial',
      podcastName: '',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/que-buen-lugar/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'historial',
      podcastName: '',
      podcastId: ''
    },
  ],
  'https://feeds.captivate.fm/caravana-radio/': [
    {
      name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      imageUrl: '/assets/autores/EmmaTristan.jpeg',
      instagramUrl: 'https://www.instagram.com/',
      status: 'historial',
      podcastName: '',
      podcastId: ''
    },
  ],
};

class RSSService {
  private static instance: RSSService;
  private cache: Map<string, { data: RSSFeedData; timestamp: number }> = new Map();
  private podcastCache: Map<string, { show: PodcastShow; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = RSS_CONFIG.CACHE_DURATION;

  static getInstance(): RSSService {
    if (!RSSService.instance) {
      RSSService.instance = new RSSService();
    }
    return RSSService.instance;
  }

  private async parseRSSXML(xmlString: string): Promise<RSSFeedData> {
    return new Promise((resolve, reject) => {
      const parser = new xml2js.Parser({
        explicitArray: false,
        ignoreAttrs: false,
        mergeAttrs: true
      });

      parser.parseString(xmlString, (err, result) => {
        if (err) {
          reject(new Error(`Error parsing XML: ${err.message}`));
          return;
        }

        try {
          const rss = result.rss;
          if (!rss || !rss.channel) {
            reject(new Error('Feed RSS inválido: no se encontró el canal'));
            return;
          }

          const channel = rss.channel;
          const title = channel.title || '';
          const description = channel.description || '';
          const link = channel.link || '';
          const language = channel.language || undefined;
          const author = channel.author || channel['itunes:author'] || undefined;
          const category = channel.category || (channel['itunes:category'] && channel['itunes:category'].text) || undefined;
          const lastBuildDate = channel.lastBuildDate || undefined;

          let image = '';
          if (channel['itunes:image'] && channel['itunes:image'].href) {
            image = channel['itunes:image'].href;
          } else if (channel.image && channel.image.url) {
            image = channel.image.url;
          }

          const items = Array.isArray(channel.item) ? channel.item : [channel.item].filter(Boolean);
          const episodes = items.map((item: any) => {
            const episodeTitle = item.title || '';
            const episodeDescription = item.description || '';
            const pubDate = item.pubDate || '';
            const guid = item.guid || '';
            
            let audioUrl = '';
            if (item.enclosure && item.enclosure.url) {
              audioUrl = item.enclosure.url;
            } else if (item['media:content'] && item['media:content'].url) {
              audioUrl = item['media:content'].url;
            }

            let duration = '';
            if (item['itunes:duration']) {
              const durationText = item['itunes:duration'];
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

          resolve({
            title,
            description,
            image,
            link,
            language,
            author,
            category,
            lastBuildDate,
            episodes
          });
                 } catch (error) {
           reject(new Error(`Error processing RSS data: ${(error as Error).message}`));
         }
      });
    });
  }

  private async fetchRSSFeed(url: string): Promise<RSSFeedData> {
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    return retryOperation(async () => {
      const apiUrl = `/api/rss?url=${encodeURIComponent(url)}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), RSS_CONFIG.REQUEST_TIMEOUT);
      
      const response = await fetch(apiUrl, { 
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const rssData = await this.parseRSSXML(data.content);
      this.cache.set(url, { data: rssData, timestamp: Date.now() });
      return rssData;
    });
  }

  async getAllPodcasts(): Promise<PodcastShow[]> {
    const shows: PodcastShow[] = [];
    
    // Separar podcasts actuales e historiales para carga progresiva
    const actualFeeds = PODCAST_RSS_FEEDS.filter(feed => feed.status === 'actual');
    const historialFeeds = PODCAST_RSS_FEEDS.filter(feed => feed.status === 'historial');
    
    // Cargar podcasts actuales primero con procesamiento en lotes
    const actualShows = await this.processFeedsInBatches(actualFeeds);
    shows.push(...actualShows);
    
    // Cargar podcasts historiales en segundo plano
    const historialShows = await this.processFeedsInBatches(historialFeeds);
    shows.push(...historialShows);
    
    // Si no se pudo obtener ningún podcast, lanzar un error
    if (shows.length === 0) {
      throw new Error('No se pudo cargar ningún podcast. Verifica tu conexión a internet.');
    }
    
    return shows;
  }

  async getAllPodcastsProgressive(onPartialUpdate?: (shows: PodcastShow[], isComplete: boolean) => void): Promise<PodcastShow[]> {
    const allShows: PodcastShow[] = [];
    
    // Separar podcasts actuales e historiales
    const actualFeeds = PODCAST_RSS_FEEDS.filter(feed => feed.status === 'actual');
    const historialFeeds = PODCAST_RSS_FEEDS.filter(feed => feed.status === 'historial');
    
    try {
      // Cargar podcasts actuales primero con actualizations por lote
      await this.processFeedsInBatches(actualFeeds, (batchShows, totalSoFar) => {
        allShows.length = 0; // Limpiar array
        allShows.push(...totalSoFar);
        
        // Notificar cada vez que se completa un lote de podcasts actuales
        if (onPartialUpdate) {
          onPartialUpdate([...allShows], false);
        }
      });
      
      // Marcar que los actuales terminaron, ahora empezar historiales
      const actualComplete = allShows.length;
      
      // Cargar podcasts historiales en segundo plano con actualizations por lote
      await this.processFeedsInBatches(historialFeeds, (batchShows, totalSoFar) => {
        // Mantener los actuales y añadir los nuevos historiales
        allShows.length = actualComplete;
        allShows.push(...totalSoFar);
        
        // Notificar actualización con historiales
        if (onPartialUpdate) {
          onPartialUpdate([...allShows], false);
        }
      });
      
      // Notificar actualización final
      if (onPartialUpdate) {
        onPartialUpdate([...allShows], true);
      }
      
    } catch (error) {
      console.error('Error en carga progresiva:', error);
      if (allShows.length === 0) {
        throw new Error('No se pudo cargar ningún podcast. Verifica tu conexión a internet.');
      }
    }
    
    return allShows;
  }

  private async processFeedsInBatches(
    feeds: { url: string; status: 'actual' | 'historial' }[],
    onBatchComplete?: (batchShows: PodcastShow[], totalSoFar: PodcastShow[]) => void
  ): Promise<PodcastShow[]> {
    const BATCH_SIZE = 1; // Procesar 1 feed a la vez para máxima velocidad
    const shows: PodcastShow[] = [];
    
    // Ordenar feeds por prioridad basada en el orden del mapeo de imágenes locales
    const orderedImageUrls = Object.keys(PODCAST_LOCAL_IMAGES);
    const sortedFeeds = feeds
      .filter(feed => PODCAST_LOCAL_IMAGES[feed.url]) // Solo feeds con imagen local
      .sort((a, b) => {
        const indexA = orderedImageUrls.indexOf(a.url);
        const indexB = orderedImageUrls.indexOf(b.url);
        return indexA - indexB;
      });
    
    // Dividir en lotes
    for (let i = 0; i < sortedFeeds.length; i += BATCH_SIZE) {
      const batch = sortedFeeds.slice(i, i + BATCH_SIZE);
      
      // Procesar lote actual en paralelo
      const batchPromises = batch.map(async (rssUrl) => {
        try {
          // Solo procesar podcasts que tengan imagen local
          if (!PODCAST_LOCAL_IMAGES[rssUrl.url]) {
            return null; // Ocultar podcasts sin imagen local
          }

          const feedData = await this.fetchRSSFeed(rssUrl.url);
          const show: PodcastShow = {
            id: this.generateIdFromUrl(rssUrl.url),
            title: feedData.title,
            description: feedData.description,
            imageUrl: PODCAST_LOCAL_IMAGES[rssUrl.url],
            link: feedData.link,
            rssUrl: rssUrl.url,
            language: feedData.language,
            author: feedData.author,
            category: feedData.category,
            lastBuildDate: feedData.lastBuildDate,
            authors: PODCAST_AUTHORS[rssUrl.url] || [],
            status: rssUrl.status
          };
          return show;
        } catch (error) {
          console.error(`Error al procesar podcast ${rssUrl.url}:`, error);
          
          // Solo crear fallback si tiene imagen local
          if (!PODCAST_LOCAL_IMAGES[rssUrl.url]) {
            return null; // Ocultar podcasts sin imagen local
          }

          const fallbackShow: PodcastShow = {
            id: this.generateIdFromUrl(rssUrl.url),
            title: PODCAST_AUTHORS[rssUrl.url]?.[0]?.podcastName || 'Podcast',
            description: 'Información temporalmente no disponible',
            imageUrl: PODCAST_LOCAL_IMAGES[rssUrl.url],
            link: rssUrl.url,
            rssUrl: rssUrl.url,
            language: 'es',
            author: undefined,
            category: undefined,
            lastBuildDate: undefined,
            authors: PODCAST_AUTHORS[rssUrl.url] || [],
            status: rssUrl.status
          };
          
          return fallbackShow;
        }
      });
      
      // Esperar a que termine el lote actual
      const batchResults = await Promise.allSettled(batchPromises);
      const batchShows: PodcastShow[] = [];
      
      batchResults.forEach(result => {
        if (result.status === 'fulfilled' && result.value !== null) {
          batchShows.push(result.value);
          shows.push(result.value);
        }
      });
      
      // Notificar que el lote se completó
      if (onBatchComplete && batchShows.length > 0) {
        onBatchComplete(batchShows, [...shows]);
      }
      
      // Sin pausa entre requests individuales para máxima velocidad
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
      // Retornar array vacío en lugar de lanzar error
      return [];
    }
  }

  // Función para carga progresiva de episodios (lote por lote)
  async getPodcastEpisodesProgressive(
    rssUrl: string, 
    onEpisodesUpdate?: (episodes: PodcastEpisode[], isComplete: boolean) => void
  ): Promise<PodcastEpisode[]> {
    try {
      const feedData = await this.fetchRSSFeed(rssUrl);
      const showId = this.generateIdFromUrl(rssUrl);
      const allEpisodes = feedData.episodes.map(episode => ({
        id: episode.guid || this.generateIdFromTitle(episode.title),
        title: episode.title,
        description: episode.description,
        audioUrl: episode.audioUrl,
        duration: episode.duration,
        pubDate: episode.pubDate,
        guid: episode.guid,
        showId
      }));

      // Cargar episodios en lotes para mostrar progresivamente
      const BATCH_SIZE = 5;
      const loadedEpisodes: PodcastEpisode[] = [];

      for (let i = 0; i < allEpisodes.length; i += BATCH_SIZE) {
        const batch = allEpisodes.slice(i, i + BATCH_SIZE);
        loadedEpisodes.push(...batch);
        
        // Notificar progreso
        if (onEpisodesUpdate) {
          const isComplete = i + BATCH_SIZE >= allEpisodes.length;
          onEpisodesUpdate([...loadedEpisodes], isComplete);
        }

        // Delay pequeño para permitir renderizado
        if (i + BATCH_SIZE < allEpisodes.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      return allEpisodes;
    } catch (error) {
      console.error(`Error al obtener episodios para ${rssUrl}:`, error);
      return [];
    }
  }

  async getPodcastById(id: string): Promise<PodcastShow | null> {
    // Verificar cache de podcasts específicos primero
    const cachedPodcast = this.podcastCache.get(id);
    if (cachedPodcast && Date.now() - cachedPodcast.timestamp < this.CACHE_DURATION) {
      return cachedPodcast.show;
    }

    // Encontrar la URL del RSS basada en el ID sin cargar todos los podcasts
    const targetFeed = PODCAST_RSS_FEEDS.find(feed => 
      this.generateIdFromUrl(feed.url) === id
    );
    
    if (!targetFeed) {
      return null;
    }

    // Si tenemos datos locales, crear un show básico inmediatamente
    if (PODCAST_LOCAL_IMAGES[targetFeed.url] && PODCAST_AUTHORS[targetFeed.url]) {
      const basicShow: PodcastShow = {
        id: this.generateIdFromUrl(targetFeed.url),
        title: PODCAST_AUTHORS[targetFeed.url]?.[0]?.podcastName || 'Podcast',
        description: 'Cargando descripción...',
        imageUrl: PODCAST_LOCAL_IMAGES[targetFeed.url],
        link: targetFeed.url,
        rssUrl: targetFeed.url,
        language: 'es',
        author: undefined,
        category: undefined,
        lastBuildDate: undefined,
        authors: PODCAST_AUTHORS[targetFeed.url] || [],
        status: targetFeed.status
      };
      
      // Cachear y retornar inmediatamente
      this.podcastCache.set(id, { show: basicShow, timestamp: Date.now() });
      
      // Cargar datos completos en segundo plano
      this.fetchRSSFeed(targetFeed.url).then(feedData => {
        const completeShow: PodcastShow = {
          ...basicShow,
          title: feedData.title,
          description: feedData.description,
          author: feedData.author,
          category: feedData.category,
          lastBuildDate: feedData.lastBuildDate
        };
        this.podcastCache.set(id, { show: completeShow, timestamp: Date.now() });
      }).catch(error => {
        console.warn(`Error al cargar datos completos para ${id}:`, error);
      });
      
      return basicShow;
    }

    try {
      // Cargar solo este podcast específico
      const feedData = await this.fetchRSSFeed(targetFeed.url);
      const show: PodcastShow = {
        id: this.generateIdFromUrl(targetFeed.url),
        title: feedData.title,
        description: feedData.description,
        imageUrl: PODCAST_LOCAL_IMAGES[targetFeed.url] || feedData.image,
        link: feedData.link,
        rssUrl: targetFeed.url,
        language: feedData.language,
        author: feedData.author,
        category: feedData.category,
        lastBuildDate: feedData.lastBuildDate,
        authors: PODCAST_AUTHORS[targetFeed.url] || [],
        status: targetFeed.status
      };
      
      // Cachear el resultado completo
      this.podcastCache.set(id, { show, timestamp: Date.now() });
      return show;
    } catch (error) {
      console.error(`Error al cargar podcast ${id}:`, error);
      
      // Crear fallback con la información local disponible
      if (PODCAST_LOCAL_IMAGES[targetFeed.url]) {
        const fallbackShow: PodcastShow = {
          id: this.generateIdFromUrl(targetFeed.url),
          title: PODCAST_AUTHORS[targetFeed.url]?.[0]?.podcastName || 'Podcast',
          description: 'Información temporalmente no disponible',
          imageUrl: PODCAST_LOCAL_IMAGES[targetFeed.url],
          link: targetFeed.url,
          rssUrl: targetFeed.url,
          language: 'es',
          author: undefined,
          category: undefined,
          lastBuildDate: undefined,
          authors: PODCAST_AUTHORS[targetFeed.url] || [],
          status: targetFeed.status
        };
        return fallbackShow;
      }
      
      return null;
    }
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
    if (!PODCAST_RSS_FEEDS.some(feed => feed.url === rssUrl)) {
      PODCAST_RSS_FEEDS.push({ url: rssUrl, status: 'actual' });
    }
  }

  static getRSSFeeds(): string[] {
    return [...PODCAST_RSS_FEEDS.map(feed => feed.url)];
  }

  static addPodcastAuthors(rssUrl: string, authors: Author[]): void {
    const id = RSSService.getInstance().generateIdFromUrl(rssUrl);
    PODCAST_AUTHORS[rssUrl] = authors;
  }

  static getPodcastAuthors(rssUrl: string): Author[] {
    // Usar la URL directamente en lugar del ID
    return PODCAST_AUTHORS[rssUrl] || [];
  }

  static updateAuthorConfig(podcastId: string, authors: Author[]): void {
    // Buscar la URL correspondiente al ID
    const rssUrl = PODCAST_RSS_FEEDS.find(feed => RSSService.getInstance().generateIdFromUrl(feed.url) === podcastId);
    if (rssUrl) {
      PODCAST_AUTHORS[rssUrl.url] = authors;
    } else {
      console.error(`No se encontró URL para el ID ${podcastId}`);
    }
  }

  static getAllAuthorConfigs(): { [podcastId: string]: Author[] } {
    return { ...PODCAST_AUTHORS };
  }

  static generateIdFromUrl(url: string): string {
    return btoa(url).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  static getCurrentAuthors(): Author[] {
    const currentAuthors: Author[] = [];
    
    // Filtrar solo los podcasts actuales
    const actualPodcastFeeds = PODCAST_RSS_FEEDS
      .filter(feed => feed.status === 'actual');
    
    // Obtener autores de esos podcasts
    actualPodcastFeeds.forEach(feed => {
      const authors = PODCAST_AUTHORS[feed.url] || [];
      const podcastId = RSSService.generateIdFromUrl(feed.url);
      
      authors.forEach(author => {
        if (author.status === 'actual') {
          currentAuthors.push({
            ...author,
            podcastId: podcastId // Usar el ID generado dinámicamente
          });
        }
      });
    });
    
    return currentAuthors;
  }
}

export { RSSService };
export default RSSService.getInstance(); 