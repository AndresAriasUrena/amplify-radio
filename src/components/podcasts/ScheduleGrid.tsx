import React from 'react';

const schedule = [
  // ——————————————————— LUNES ———————————————————
  {
    day: 'LUNES',
    today: false,
    subtitle: 'Horario de hoy',
    blocks: [
      { time: '7 :00 AM – 7 :30 AM', show: 'La Telaraña', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vbgetdgvsyxjhbmev' },
      { time: '7 :00 PM – 8 :00 PM', show: 'Aleatorio',     url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vywxlyxrvcmlvlw' },
    ],
  },

  // ——————————————————— MARTES ———————————————————
  {
    day: 'MARTES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '8 :00 AM – 9 :00 AM',  show: 'Ciudad Caníbal',   url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vy2l1zgfklwnhbmliywwv' },
      { time: '11 :00 AM – 11 :30 AM', show: 'Pulso Empresarial', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vchlsc28tzw1wcmvzyxjpywwv' },
      { time: '4 :00 PM – 4 :30 PM',  show: 'Conexión 220',     url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vy29uzxhpb24tmjiwlw' },
      { time: '6 :00 PM – 6 :30 PM',  show: 'Registros',        url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vcmvnaxn0cm9zlw' },
      { time: '8 :00 PM – 8 :30 PM',  show: 'Dada',             url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vzgfkys8' },
    ],
  },

  // ——————————————————— MIÉRCOLES ———————————————————
  {
    day: 'MIÉRCOLES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '9 :30 AM – 10 :00 AM', show: 'Doble Click',        url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vzg9ibguty2xpy2sv' },
      { time: '3 :00 PM – 3 :30 PM',  show: 'Wax Wednesdays',     url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vd2f4lw' },
      { time: '7 :00 PM – 8 :00 PM',  show: 'Dance To This Radio', url: '/podcasts/rgfuy2ugdg8gdghpcybsywrpbw' },
    ],
  },

  // ——————————————————— JUEVES ———————————————————
  {
    day: 'JUEVES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '8 :00 AM – 9 :00 AM',  show: 'Ciudad Caníbal',    url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vy2l1zgfklwnhbmliywwv' },
      { time: '11 :00 AM – 11 :30 AM', show: 'Pulso Empresarial', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vchlsc28tzw1wcmvzyxjpywwv' },
      { time: '7 :00 PM – 8 :00 PM',  show: 'Lit By Lit',        url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vbgl0lwj5lwxpdc8' },
      { time: '10 :00 PM – 10 :30 PM',show: 'Flamingo de Noche', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vzgxhbwluz28tzgutbm9jaguv' },
    ],
  },

  // ——————————————————— VIERNES ———————————————————
  {
    day: 'VIERNES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '8 :00 AM – 9 :00 AM',  show: 'Ciudad Caníbal', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vy2l1zgfklwnhbmliywwv' },
      { time: '5 :00 PM – 5 :3O PM',  show: "Let's en Repeat", url: '/podcasts/bgv0c2vulgvulgvwzwf0' },
      { time: '9 :00 PM – 10 :00 PM', show: 'Cross Fade',      url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vy3jvc3mtzgfkzs8' },
    ],
  },

  // ——————————————————— SÁBADO ———————————————————
  {
    day: 'SÁBADO',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '11 :00 AM – 11 :30 AM', show: 'Frecuencia 11:11', url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vznjly3vlbmnpys0xmtexlw' },
      { time: '2 :00 PM – 3 :00 PM',   show: 'Verso Per Verso',  url: '/podcasts/ahr0chm6ly9mzwvkcy5jyxb0axzhdguuzm0vdmvyc28tcgvylxzlcnnvlw' },
    ],
  },

  // ——————————————————— DOMINGO ———————————————————
  {
    day: 'DOMINGO',
    today: false,
    subtitle: 'Sin programación en la imagen',
    blocks: [],
  },
];

export default function ScheduleGrid() {
  return (
    <section id="schedule" className="max-w-7xl mx-auto py-4">
      <div className="bg-[#181818] rounded-3xl p-8">
        <h2 className="font-lexend font-semibold text-xl mb-2 uppercase">HORARIO</h2>
        <div className="h-0.5 w-full bg-[#E5754C] my-4" />

        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {schedule.map((day) => (
            <div key={day.day} className="group">
              {/* Encabezado del día */}
              <div
                className={`rounded-xl px-3 py-3 mb-4 transition-all duration-300 ${
                  day.today
                    ? 'bg-[#E5754C] text-white'
                    : 'bg-[#2B2B2B] text-[#E3E3E3] group-hover:bg-[#E5754C] group-hover:text-white'
                }`}
              >
                <div className="font-lexend font-semibold text-md uppercase">
                  {day.day}
                </div>
                <div className="text-sm text-[#B4B4B4] group-hover:text-white">
                  {day.subtitle}
                </div>
              </div>

              {/* Bloques del día */}
              <div
                className={`rounded-xl px-3 py-4 min-h-[220px] flex flex-col gap-4 transition-all duration-300 ${
                  day.today
                    ? 'bg-[#E5754C] text-white'
                    : 'bg-[#2B2B2B] text-[#E3E3E3] group-hover:bg-[#E5754C] group-hover:text-white'
                }`}
              >
                {day.blocks.length ? (
                  day.blocks.map((block, i) => (
                    <div key={i}>
                      <div className="font-lexend font-semibold text-xs uppercase">
                        {block.time}
                      </div>
                      <a
                        href={block.url}
                        className="text-sm md:text-base underline group-hover:text-white transition-all duration-300"
                      >
                        {block.show}
                      </a>
                    </div>
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
