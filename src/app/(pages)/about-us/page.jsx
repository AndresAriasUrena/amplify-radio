'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/about-us/Hero';
import Footer from '@/components/Footer';

const Mission = dynamic(() => import('@/components/about-us/Mission'), { ssr: false });
const Variedad = dynamic(() => import('@/components/about-us/Variedad'), { ssr: false });
const CTA = dynamic(() => import('@/components/about-us/CTA'), { ssr: false });

export default function AboutUs() {
  useEffect(() => {
    document.title = 'Sobre Nosotros | Amplify Radio - Conoce Nuestra Historia';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = 'Conoce la historia de Amplify Radio, tu estación de radio online. Descubre nuestra misión, valores y el equipo que hace posible la mejor música y noticias las 24 horas.';
    
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const keywords = 'amplify radio historia, sobre nosotros, equipo radio, misión radio online, valores amplify radio';
    
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen font-jost">
        <Navbar />
        <Hero />
        <Mission />
        <Variedad />
        <CTA />
      </div>
      <Footer />
    </>
  );
}
