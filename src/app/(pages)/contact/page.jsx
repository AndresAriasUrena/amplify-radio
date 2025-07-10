'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/contact/ContactForm';

const Location = dynamic(() => import('@/components/contact/Location'), { ssr: false });
export default function Contact() {

  return (
    <>
      <div className="min-h-screen font-jost">
        <Navbar />
        <ContactForm />
        <Location />
      </div>
      <Footer />
    </>
  );
}
