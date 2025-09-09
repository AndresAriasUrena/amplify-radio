import { NextRequest, NextResponse } from 'next/server';
import { RSS_CONFIG } from '@/lib/rssConfig';

async function fetchWithProxy(url: string, proxyIndex: number = 0): Promise<string> {
  if (proxyIndex >= RSS_CONFIG.PROXY_SERVICES.length) {
    throw new Error('Todos los servicios proxy fallaron');
  }

  const proxyUrl = RSS_CONFIG.PROXY_SERVICES[proxyIndex] + encodeURIComponent(url);
  const proxyStartTime = Date.now();
  console.log(`🔍 Intentando proxy ${proxyIndex + 1}: ${RSS_CONFIG.PROXY_SERVICES[proxyIndex]}`);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), RSS_CONFIG.REQUEST_TIMEOUT);
    
    console.log(`📡 Haciendo petición a: ${proxyUrl}`);
    const requestStartTime = Date.now();
    
    const response = await fetch(proxyUrl, {
      signal: controller.signal,
      headers: RSS_CONFIG.REQUEST_HEADERS
    });
    
    clearTimeout(timeoutId);
    const requestDuration = Date.now() - requestStartTime;
    
    console.log(`📊 Status: ${response.status} ${response.statusText} (${requestDuration}ms)`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Obtener el contenido como texto primero
    const responseText = await response.text();
    const proxyTotalTime = Date.now() - proxyStartTime;
    
    // Verificar si es XML directo o JSON
    if (responseText.trim().startsWith('<?xml') || responseText.trim().startsWith('<rss')) {
      console.log(`✅ Proxy ${proxyIndex + 1} exitoso - XML directo (${proxyTotalTime}ms total)`);
      return responseText;
    } else {
      // Intentar parsear como JSON
      try {
        const data = JSON.parse(responseText);
        console.log(`✅ Proxy ${proxyIndex + 1} exitoso - JSON (${proxyTotalTime}ms total)`);
        return data.contents || data;
      } catch (jsonError) {
        console.log(`⚠️ No es JSON válido, devolviendo como texto (${proxyTotalTime}ms total)`);
        return responseText;
      }
    }
  } catch (error) {
    const proxyFailTime = Date.now() - proxyStartTime;
    console.warn(`❌ Proxy ${proxyIndex + 1} falló para ${url} (${proxyFailTime}ms):`, error);
    // Intentar con el siguiente proxy
    return fetchWithProxy(url, proxyIndex + 1);
  }
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  console.log(`🚀 GET /api/rss - URL: ${url}`);
  
  if (!url) {
    console.log(`❌ Error: URL parameter is required`);
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    console.log(`🔄 Iniciando fetch para: ${url}`);
    const fetchStartTime = Date.now();
    
    const rssContent = await fetchWithProxy(url);
    
    const fetchEndTime = Date.now();
    const fetchDuration = fetchEndTime - fetchStartTime;
    
    if (!rssContent) {
      throw new Error('No se pudo obtener contenido del RSS feed');
    }
    
    const totalDuration = Date.now() - startTime;
    console.log(`✅ RSS content obtenido exitosamente - Fetch: ${fetchDuration}ms, Total: ${totalDuration}ms`);
    
    return NextResponse.json({ 
      content: rssContent,
      _debug: {
        fetchTime: fetchDuration,
        totalTime: totalDuration,
        url: url
      }
    });
  } catch (error) {
    const errorTime = Date.now() - startTime;
    console.error(`❌ Error fetching RSS (${errorTime}ms):`, error);
    return NextResponse.json(
      { error: `Failed to fetch RSS feed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
} 