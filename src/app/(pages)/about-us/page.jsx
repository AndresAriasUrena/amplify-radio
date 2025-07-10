'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/about-us/Hero';
import Footer from '@/components/Footer';

const Mission = dynamic(() => import('@/components/about-us/Mission'), { ssr: false });
const Variedad = dynamic(() => import('@/components/about-us/Variedad'), { ssr: false });
const CTA = dynamic(() => import('@/components/about-us/CTA'), { ssr: false });
export default function AboutUs() {

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
