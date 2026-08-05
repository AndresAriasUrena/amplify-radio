import "./globals.css";
import { SearchProvider } from "@/lib/SearchContext";
import { PlayerProvider } from "@/lib/PlayerContext";
import RadioPlayer from "@/components/RadioPlayer";
import SplashPage from "@/components/SplashPage";
import { generatePageMetadata, generateOrganizationSchema, SEO_CONFIG } from "@/lib/seo";
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata = generatePageMetadata({
  title: 'Amplify Radio - Tu Estación Online de Música y Noticias',
  description: 'Amplify Radio - Tu estación de radio online con las últimas noticias, música y entretenimiento. Escucha radio en vivo las 24 horas y mantente informado.',
  keywords: 'amplify radio, radio online, radio en vivo, noticias, música, streaming, entretenimiento',
  path: ''
});

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang={SEO_CONFIG.language}>
      <head>
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png" />
        
        <meta name="theme-color" content={SEO_CONFIG.themeColor} />
        <meta name="msapplication-TileColor" content={SEO_CONFIG.backgroundColor} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        
        <link rel="preconnect" href="https://amplify.aurigital.com" />
        <link rel="dns-prefetch" href="https://amplify.aurigital.com" />
        
      </head>
      <body>
        <GoogleTagManager gtmId="GTM-NRX3G2M3" /> 
        <SearchProvider>
          <PlayerProvider>
            <SplashPage />
            {children}
            <RadioPlayer />
          </PlayerProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
