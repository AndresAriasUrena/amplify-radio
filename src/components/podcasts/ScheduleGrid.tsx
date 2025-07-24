import React from 'react';

const schedule = [
  {
    day: 'LUNES',
    today: false,
    subtitle: 'Horario de hoy',
    blocks: [
      { time: '7AM - 8AM', show: 'La Telaraña' },
      { time: '11 AM - 12 MD', show: 'Pulso Empresarial' },
      { time: '1 PM - 3 PM', show: 'Ciudad Caníbal' },
      { time: '7 PM - 8:30 PM', show: 'Aleatorio' },
    ],
  },
  {
    day: 'MARTES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '8 AM - 8:30 AM', show: 'Alta Frecuencia' },
      { time: '11 AM - 12 MD', show: 'Pulso Empresarial' },
      { time: '6 PM - 7 PM', show: 'Registros' },
      { time: '8 PM - 9 PM', show: 'dAdÁ' },
    ],
  },
  {
    day: 'MIÉRCOLES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '7:30 AM - 8:30 AM', show: 'Que Intensas' },
      { time: '10 AM - 10:30 AM', show: 'Doble Click' },
      { time: '11 AM - 12 MD', show: 'Pulso Empresarial' },
      { time: '3 PM - 4 PM', show: 'Wax Wednesdays' },
      { time: '7 PM - 9 PM', show: 'Dance to This Radio' },
    ],
  },
  {
    day: 'JUEVES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '11 AM - 12 MD', show: 'Pulso Empresarial' },
      { time: '1 PM - 3 PM', show: 'Cuidad Caníbal' },
      { time: '7 PM - 9 PM', show: 'Lit By Lit' },
      { time: '10 PM - 11 PM', show: 'Flamingo de Noche' },
    ],
  },
  {
    day: 'VIERNES',
    today: false,
    subtitle: 'Horario de esta semana',
    blocks: [
      { time: '11 AM - 12 MD', show: 'Pulso Empresarial' },
      { time: '9 PM - 11 PM', show: 'Crossfade' },
    ],
  },
];

export default function ScheduleGrid() {
  return (
    <section id="schedule" className="max-w-7xl mx-auto py-4">
      <div className="bg-[#181818] rounded-3xl p-8">
        <h2 className="font-lexend font-semibold text-xl mb-2 uppercase">HORARIO</h2>
        <div className="h-0.5 w-full bg-[#E5754C] my-4" />
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {schedule.map((day, idx) => (
            <div className="group" key={day.day}>
              <div
                className={`rounded-xl px-3 py-3 mb-4 group-hover:bg-[#E5754C] group-hover:text-white transition-all duration-300 ${day.today ? 'bg-[#E5754C] text-white' : 'bg-[#2B2B2B] text-[#E3E3E3]'}`}
              >
                <div className="font-lexend font-semibold text-md uppercase group-hover:text-white transition-all duration-300">{day.day}</div>
                <div className={`text-sm text-[#B4B4B4] group-hover:text-white transition-all duration-300`}>{day.subtitle}</div>
              </div>
              <div
                className={`rounded-xl px-3 py-4 min-h-[220px] flex flex-col gap-4 group-hover:bg-[#E5754C] group-hover:text-white transition-all duration-300 ${day.today ? 'bg-[#E5754C] text-white' : 'bg-[#2B2B2B] text-[#E3E3E3]'}`}
              >
                {day.blocks.map((block, i) => (
                  <div key={i}>
                    <div className="font-lexend font-semibold text-xs uppercase">
                      {block.time}
                    </div>
                    <div className={`text-sm md:text-base text-[#B4B4B4] group-hover:text-white transition-all duration-300`}>{block.show}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 