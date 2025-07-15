'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/home/Hero';
import Footer from '@/components/Footer';

export default function AboutUs() {

  return (
    <>
      <div className="min-h-screen font-jost">
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </>
  );
}
