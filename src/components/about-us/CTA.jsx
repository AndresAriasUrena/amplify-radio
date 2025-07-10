import React from 'react';

const CTA = () => {
  return (
    <section className="flex flex-col items-center justify-start bg-[#121212] px-8 py-16 mx-2 rounded-2xl">
      <div className="w-full max-w-7xl mx-auto">
        <img
          src="/assets/about-us/Hero.avif"
          alt="Mano usando laptop"
          className="rounded-xl w-full object-cover h-full"
        />
      </div>
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 justify-between pt-8">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[#C7C7C7] mb-4">
            Nuestra programación<br />
            musical es en <span className="text-[#E5754C]">inglés</span><br />
            y en <span className="text-[#E5754C]">español</span>
          </h2>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-[31rem] mx-auto lg:mx-0">
          <p className="text-sm md:text-base text-[#C7C7C7]/80 mb-6">
            Esta incluye los géneros de rock y pop de los 80s hasta el presente. En los diferentes programas también incluimos géneros alternativos, reggae, ska, punk, dance; además de muchos invitados y exponentes de la música nacional.<br /><br />
            <span className="text-[#C7C7C7]/50">
            En nuestros contenidos, amplificamos voces de personalidades que hablan de temas diversos, de actualidad, relevancia y de interés para nuestro público.
            </span>
          </p>
          <div className="flex gap-4 text-[12px] lg:text-[18px]">
            <button className="bg-[#E5754C] text-[#171717] px-6 py-2 rounded-full font-medium hover:shadow-md hover:shadow-[#E5754C]/50 transition-all duration-300">
              Contáctanos
            </button>
            <button className="border border-[#E5754C] text-[#E5754C] px-6 py-2 rounded-full font-medium hover:shadow-md hover:shadow-[#E5754C]/50 transition-all duration-300">
              Ver horarios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

