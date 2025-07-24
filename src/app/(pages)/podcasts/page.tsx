'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PodcastGrid from '@/components/podcasts/PodcastGrid';

function PodcastsContent() {
  useEffect(() => {
    document.title = 'Podcasts | Amplify Radio - Nuestros Podcasts';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Descubre nuestros podcasts en Amplify Radio. Escucha programas de entretenimiento, música y más contenido exclusivo.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Descubre nuestros podcasts en Amplify Radio. Escucha programas de entretenimiento, música y más contenido exclusivo.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="px-4 sm:px-8">
      <div className="max-w-7xl mx-auto relative mt-4">
        <div className="flex">
          <PodcastGrid onOpenFilters={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default function PodcastsPage() {
  return (
    <>
      <div className="min-h-screen font-jost">
        <Navbar />
        <PodcastsContent />
      </div>
      <Footer />
    </>
  );
} 