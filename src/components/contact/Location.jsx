import React from 'react';

const Location = () => {
  return (
    <section className="flex flex-col items-center justify-start bg-[#121212] px-8 py-16 mx-2 rounded-2xl">
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between pt-8">
        <div className="flex-1 flex flex-col">
          <p className="text-3xl font-semibold leading-tight text-[#C7C7C7] mb-4">
            Nuestra dirección:
          </p>
          <p className="text-2xl text-[#7D7D7D]">
            400 metros Oeste Casa Presidencial, Zapote Zapote, San José Province, Costa Rica
          </p>
          <div className="w-full h-0.5 bg-[#232323] my-5" />
        </div>
        <div className="flex h-[400px] rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d981.8906930494556!2d-84.05582750000002!3d9.922738199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e39c30c79471%3A0x5b18b0ac6c05399a!2sWWFV%2B3MV%2C%20V%C3%ADa%20204%2C%20San%20Jos%C3%A9%2C%20Zapote!5e0!3m2!1ses!2scr!4v1710801027252!5m2!1ses!2scr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default Location;

