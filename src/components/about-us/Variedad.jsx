import React from 'react';
import Link from 'next/link';
const Variedad = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
        {/* Columna izquierda: imagen */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            src="/assets/about-us/Mission.avif"
            alt="Banda tocando en vivo"
            className="rounded-xl w-full h-[280px] sm:h-[340px] lg:h-[440px] object-cover shadow-lg"
          />
        </div>
        {/* Columna derecha: texto */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C7C7C7] leading-tight mb-4 lg:mb-6">
        Más que una simple<br className="hidden sm:block" />
            radio, somos <span className="text-[#E5754C]">variedad</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#C7C7C7]/70 mb-6 lg:mb-8 max-w-xl">
            Podrás encontrar diferentes podcasts, de contenidos variados, frescos y diferentes, que abarcan los más amplios intereses. Amplify Radio es un espacio vivo y cambiante. Somos una comunidad creciente con intereses y realidades compartidas.
          </p>
          <Link href="/podcasts" className="bg-[#E5754C] text-[#171717] px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-medium text-sm sm:text-base hover:shadow-md hover:shadow-[#E5754C]/50 transition-all duration-300">
            Ver podcasts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Variedad; 