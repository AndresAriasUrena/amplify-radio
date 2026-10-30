import "./globals.css";
import { SearchProvider } from "@/lib/SearchContext";
import { PlayerProvider } from "@/lib/PlayerContext";
import RadioPlayer from "@/components/RadioPlayer";
import SplashPage from "@/components/SplashPage";
import { generatePageMetadata, generateOrganizationSchema, SEO_CONFIG } from "@/lib/seo";
import Script from 'next/script';

export const metadata = generatePageMetadata({
  title: 'Amplify Radio - Tu Estación Online de Música y Noticias',
  description: 'Amplify Radio - Una plataforma de música, cultura y entretenimiento que conecta sonidos, artistas y nuevas tendencias con una mirada alternativa y contemporánea.',
  keywords: 'amplify radio, radio online, radio en vivo, noticias, música, streaming, entretenimiento',
  path: ''
});

metadata.icons = {
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
  ],
  apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
};
metadata.manifest = '/site.webmanifest';

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang={SEO_CONFIG.language}>
      <head>
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KQVY1DF7RP"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KQVY1DF7RP');
          `}
        </Script>
        
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
