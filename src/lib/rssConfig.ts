// Configuración para el RSS Service
export const RSS_CONFIG = {
  // Timeout para peticiones (en milisegundos)
  REQUEST_TIMEOUT: 15000,
  
  // Duración del cache (en milisegundos) - 30 minutos
  CACHE_DURATION: 30 * 60 * 1000,
  
  // Número máximo de reintentos por feed
  MAX_RETRIES: 3,
  
  // Delay entre reintentos (en milisegundos)
  RETRY_DELAY: 1000,
  
  // Servicios proxy disponibles (en orden de preferencia)
  PROXY_SERVICES: [
    'https://api.allorigins.win/get?url=',
    'https://cors-anywhere.herokuapp.com/',
    'https://thingproxy.freeboard.io/fetch/',
    'https://api.codetabs.com/v1/proxy?quest='
  ],
  
  // Headers para las peticiones
  REQUEST_HEADERS: {
    'User-Agent': 'Mozilla/5.0 (compatible; RSS-Reader/1.0)',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
  }
};

// Función para delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Función para reintentar una operación
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = RSS_CONFIG.MAX_RETRIES,
  delayMs: number = RSS_CONFIG.RETRY_DELAY
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      console.warn(`Intento ${attempt} falló:`, error);
      
      if (attempt < maxRetries) {
        await delay(delayMs * attempt); // Backoff exponencial
      }
    }
  }
  
  throw lastError!;
} 