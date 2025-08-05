import { NextRequest, NextResponse } from 'next/server';
import { RSS_CONFIG } from '@/lib/rssConfig';

async function fetchWithProxy(url: string, proxyIndex: number = 0): Promise<string> {
  if (proxyIndex >= RSS_CONFIG.PROXY_SERVICES.length) {
    throw new Error('Todos los servicios proxy fallaron');
  }

  const proxyUrl = RSS_CONFIG.PROXY_SERVICES[proxyIndex] + encodeURIComponent(url);
  console.log(`🔍 Intentando proxy ${proxyIndex + 1}: ${RSS_CONFIG.PROXY_SERVICES[proxyIndex]}`);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), RSS_CONFIG.REQUEST_TIMEOUT);
    
    console.log(`📡 Haciendo petición a: ${proxyUrl}`);
    
    const response = await fetch(proxyUrl, {
      signal: controller.signal,
      headers: RSS_CONFIG.REQUEST_HEADERS
    });
    
    clearTimeout(timeoutId);
    
    console.log(`📊 Status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Obtener el contenido como texto primero
    const responseText = await response.text();
    
    // Verificar si es XML directo o JSON
    if (responseText.trim().startsWith('<?xml') || responseText.trim().startsWith('<rss')) {
      console.log(`✅ Proxy ${proxyIndex + 1} exitoso - XML directo`);
      return responseText;
    } else {
      // Intentar parsear como JSON
      try {
        const data = JSON.parse(responseText);
        console.log(`✅ Proxy ${proxyIndex + 1} exitoso - JSON`);
        return data.contents || data;
      } catch (jsonError) {
        console.log(`⚠️ No es JSON válido, devolviendo como texto`);
        return responseText;
      }
    }
  } catch (error) {
    console.warn(`❌ Proxy ${proxyIndex + 1} falló para ${url}:`, error);
    // Intentar con el siguiente proxy
    return fetchWithProxy(url, proxyIndex + 1);
  }
}

export async function GET(request: NextRequest) {
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
    const rssContent = await fetchWithProxy(url);
    
    if (!rssContent) {
      throw new Error('No se pudo obtener contenido del RSS feed');
    }
    
    console.log(`✅ RSS content obtenido exitosamente`);
    return NextResponse.json({ content: rssContent });
  } catch (error) {
    console.error('❌ Error fetching RSS:', error);
    return NextResponse.json(
      { error: `Failed to fetch RSS feed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
} 