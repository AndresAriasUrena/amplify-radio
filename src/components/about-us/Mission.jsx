import React from 'react';
import Link from 'next/link';
const Mission = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-[#121212] rounded-2xl mx-2 mt-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
        {/* Columna izquierda: texto */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="px-6 py-1 border border-[#E5754C] rounded-full text-[#E5754C] text-sm font-medium mb-4">MISIÓN</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C7C7C7] leading-tight mb-4 lg:mb-6">
            Somos <br className="hidden sm:block" />
            comunidad, música,<br className="hidden sm:block" />
            entretenimiento y cultura
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#C7C7C7]/70 mb-6 lg:mb-8 max-w-xl">
            Queremos amplificar todo lo que le interesa a una generación. <br className="hidden sm:block" />
            Creemos que la música tiene el poder de transformar, de unir, y de conectar a las personas, y por eso es uno de los pilares más importantes de la emisora.
          </p>
          <Link href="/podcasts/#schedule" className="bg-[#E5754C] text-[#171717] px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-medium text-sm sm:text-base hover:shadow-md hover:shadow-[#E5754C]/50 transition-all duration-300">
            Ver horarios
          </Link>
        </div>
        {/* Columna derecha: imagen */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img
            src="/assets/about-us/Mission.avif"
            alt="Banda tocando en vivo"
            className="rounded-xl w-full h-[280px] sm:h-[340px] lg:h-[440px] object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Mission; 