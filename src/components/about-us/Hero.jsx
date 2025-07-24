import React from 'react';
import Link from 'next/link';
const Hero = () => {
  return (
    <section className="w-full lg:h-[90vh] flex flex-col gap-8 items-center justify-start px-8 pt-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 justify-between">
        {/* Izquierda: Título */}
        <div className="flex mx-auto lg:mx-0">
          <h1 className="text-5xl text-center lg:text-left md:text-6xl lg:text-7xl font-semibold leading-none text-[#C7C7C7]">
            La voz de<br/>
            una <span className="text-[#E5754C]">generación</span>
          </h1>
        </div>

        {/* Derecha: Texto y botones */}
        <div className="flex flex-col items-center lg:items-end md:mt-0 max-w-[28rem] mx-auto lg:mx-0">
          <p className="text-sm text-center lg:text-left mb-3 text-[#C7C7C7]">
            Más que una emisora, somos una comunidad viva donde convergen la música, el entretenimiento, la cultura y las voces que marcan el ritmo de una generación. En Amplify Radio conectamos historias, emociones y sonidos que inspiran.
          </p>
          <div className="flex gap-4 lg:mr-auto text-[12px] lg:text-[18px]">
            <Link href="/contact" className="bg-[#E5754C] text-[#171717] px-6 py-2 rounded-full font-medium hover:shadow-md hover:shadow-[#E5754C]/50 transition-all duration-300">
              Contáctanos
            </Link>
            <Link href="/podcasts/#schedule" className="border border-[#E5754C] text-[#E5754C] px-6 py-2 rounded-full font-medium hover:shadow-md hover:shadow-[#E5754C]/50 transition-all duration-300">
              Ver horarios
            </Link>
          </div>
        </div>
      </div>
      {/* Imagen inferior */}
      <div className="lg:flex-1 flex w-full max-w-7xl mx-auto h-[200px] lg:h-0">
        <img
          src="/assets/about-us/Hero.avif"
          alt="Mano usando laptop"
          className="rounded-xl w-full h-full object-contain md:object-cover "
        />
      </div>
    </section>
  );
};

export default Hero;

