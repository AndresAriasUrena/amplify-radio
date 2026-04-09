import Link from 'next/link';
import React from 'react';

const schedule = [
  // ——————————————————— LUNES ———————————————————
  {
    day: 'LUNES',
    today: false,
    subtitle: 'Horario de hoy',
    blocks: [
      { time: '7 :00 AM – 7 :30 AM', show: 'La Telaraña', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vbgetdgvsyxjhys8' },
      { time: '7 :00 PM – 8 :30 PM', show: 'Aleatorio',     url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vywxlyxrvcmlvls8' },
    ],
  },

  // ——————————————————— MARTES ———————————————————
  {
    day: 'MARTES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '8 :00 AM – 9 :30 AM',  show: 'Ciudad Caníbal',   url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vy2l1zgfklwnhbmliywwtlw' },
      { time: '11 :00 AM – 11 :30 AM', show: 'Empresarial', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vchvsc28tzw1wcmvzyxjpywwxlw' },
      { time: '4 :00 PM – 4 :30 PM',  show: 'Conexión 220',     url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vy29uzxhpb24tmjiwlw' },
      { time: '6 :00 PM – 6 :30 PM',  show: 'Registros',        url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vcmvnaxn0cm9zms8' },
      { time: '8 :00 PM – 8 :30 PM',  show: 'Dadá',             url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vzgfkls8' },
    ],
  },

  // ——————————————————— MIÉRCOLES ———————————————————
  {
    day: 'MIÉRCOLES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '10 :00 AM – 10 :30 AM', show: 'Doble Click',        url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vzg9ibguty2xpy2sv' },
      { time: '3 :00 PM – 3 :30 PM',  show: 'Wax Wednesday vs',     url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vd2f4lw' },
      { time: '7 :00 PM – 8 :30 PM',  show: 'Dance To This Radio', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vzgfuy2utdg8tdghpcy1yywrpby0v' },
    ],
  },

  // ——————————————————— JUEVES ———————————————————
  {
    day: 'JUEVES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '8 :00 AM – 9 :30 AM',  show: 'Ciudad Caníbal',    url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vy2l1zgfklwnhbmliywwtlw' },
      { time: '11 :00 AM – 11 :30 AM', show: 'Empresarial', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vchvsc28tzw1wcmvzyxjpywwxlw' },
      { time: '4 :00 PM – 4 :30 PM',  show: 'Travesía',          url: '#' },
      { time: '7 :00 PM – 8 :30 PM',  show: 'Lit by Lit',        url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vbgl0lwj5lwxpddev' },
      { time: '10 :00 PM – 10 :30 PM',show: 'Flamingo de Noche', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vzmxhbwluz28tzgutbm9jaguxlw' },
    ],
  },

  // ——————————————————— VIERNES ———————————————————
  {
    day: 'VIERNES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '8 :00 AM – 9 :30 AM',  show: 'Ciudad Caníbal', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vy2l1zgfklwnhbmliywwtlw' },
      { time: '5 :00 PM – 5 :30 PM',  show: 'Las 5 en Repeat', url: '#' },
      { time: '9 :00 PM – 10 :30 PM',  show: 'Cross Fade',       url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vy3jvc3mtzmfkzs8' },

    ],
  },

  // ——————————————————— SÁBADO ———————————————————
  {
    day: 'SÁBADO',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '11 :00 AM – 11 :30 AM', show: 'Frecuencia 11:11', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vznjly3vlbmnpys0xmtexlw' },
      { time: '2 :00 PM – 3 :30 PM',   show: 'Verso Per Verso',  url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vdmvyc28tcgvylxzlcnnvlw' },
    ],
  }
];

export default function ScheduleGrid() {
  return (
    <section id="schedule" className="max-w-7xl mx-auto py-4">
      <div className="bg-[#181818] rounded-3xl p-8">
        <h2 className="font-lexend font-semibold text-xl mb-2 uppercase">HORARIO</h2>
        <div className="h-0.5 w-full bg-[#E5754C] my-4" />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          {schedule.map((day) => (
            <div key={day.day} className="group">
              {/* Encabezado del día */}
              <div
                className={`rounded-xl px-3 py-3 mb-2 transition-all duration-300 ${
                  day.today
                    ? 'bg-[#E5754C] text-white'
                    : 'bg-[#2B2B2B] text-[#E3E3E3] group-hover:text-white'
                }`}
              >
                <div className="font-lexend font-semibold text-sm uppercase">
                  {day.day}
                </div>
                <div className="text-sm text-[#B4B4B4] ">
                  {day.subtitle}
                </div>
              </div>

              {/* Bloques del día */}
              <div
                className={`rounded-xl px-3 py-4 min-h-[220px] flex flex-col gap-4 transition-all duration-300 ${
                  day.today
                    ? ''
                    : 'bg-[#2B2B2B] text-[#E3E3E3] group-hover:text-white'
                }`}
              >
                {day.blocks.length ? (
                  day.blocks.map((block, i) => (
                    <Link href={block.url} key={i} className="hover:text-[#E5754C] transition-all duration-300">
                      <div className="font-medium text-[0.70rem] lowercase">
                        {block.time}
                      </div>
                      <div className="text-xs">
                        {block.show}
                      </div>
                    </Link>
                  ))
                ) : (
                  <span className="text-sm text-[#B4B4B4]">— Sin programas —</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
