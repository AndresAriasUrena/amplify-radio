import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' o 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'mail_sent') {
        setMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.');
        setMessageType('success');
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
      } else {
        setMessage(data.message || 'Error al enviar el mensaje. Inténtalo de nuevo.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error de conexión. Inténtalo de nuevo.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start justify-between">
        {/* Columna izquierda: Información */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="text-5xl sm:text-7xl font-semibold text-[#C7C7C7] leading-none mb-2">
            Ponte<br />en contacto<br />con <span className="text-[#E5754C]">nosotros</span>
          </h2>
          <div className="w-2/3 h-0.5 bg-[#232323] my-4" />
          <p className="text-[#C7C7C7]/80 text-lg mb-6 max-w-lg">
            Puede comunicarse con nosotros por los diferentes medios disponibles. También puedes llenar el formulario y pronto un asesor se comunicará con tu petición.
          </p>
          <div className="flex flex-col gap-4 w-full items-center lg:items-start">
            <div className="text-center lg:text-left">
              <p className="font-semibold text-[#C7C7C7] mb-1">Correo electrónico</p>
              <p className="text-[#C7C7C7]/60 text-sm">Puedes escribirnos al correo especializado:<br />
                <a href="mailto:ventas@grupocolumbia.co.cr" className="text-[#C7C7C7]/80 hover:underline">
                  ventas@grupocolumbia.co.cr
                </a>
              </p>
            </div>
            <div className="text-center lg:text-left">
              <p className="font-semibold text-[#C7C7C7] mb-1">Centro de llamadas</p>
              <p className="text-[#C7C7C7]/60 text-sm">Comunícate en el horario de<br />
                <a href="tel:+50622240707" className="text-[#C7C7C7]/80 hover:underline">
                  (506+) 2224 - 0707
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Columna derecha: Formulario */}
        <div className="w-full lg:w-1/2 bg-[#181818] rounded-xl p-6 sm:p-8 flex flex-col gap-2 shadow-md">
          {message && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              messageType === 'success' 
                ? 'bg-green-600/20 text-green-400 border border-green-600/30' 
                : 'bg-red-600/20 text-red-400 border border-red-600/30'
            }`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#C7C7C7] text-sm font-medium block mb-2">
                Nombre *
              </label>
              <input 
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej. John Doe" 
                required
                className="w-full bg-[#232323] text-[#C7C7C7] placeholder-[#888] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E5754C]" 
              />
            </div>

            <div>
              <label className="text-[#C7C7C7] text-sm font-medium block mb-2">
                Correo electrónico *
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej. john.doe@example.com" 
                required
                className="w-full bg-[#232323] text-[#C7C7C7] placeholder-[#888] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E5754C]" 
              />
            </div>

            <div>
              <label className="text-[#C7C7C7] text-sm font-medium block mb-2">
                Teléfono
              </label>
              <input 
                type="tel" 
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej. 5555-5555" 
                className="w-full bg-[#232323] text-[#C7C7C7] placeholder-[#888] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E5754C]" 
              />
            </div>

            <div>
              <label className="text-[#C7C7C7] text-sm font-medium block mb-2">
                Mensaje *
              </label>
              <textarea 
                rows={4} 
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu mensaje aquí..." 
                required
                className="w-full bg-[#232323] text-[#C7C7C7] placeholder-[#888] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E5754C] resize-none" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-2.5 rounded-md font-medium text-base transition-all duration-300 ${
                isLoading 
                  ? 'bg-[#E5754C]/50 text-[#171717]/50 cursor-not-allowed' 
                  : 'bg-[#E5754C] text-[#171717] hover:shadow-md hover:shadow-[#E5754C]/50'
              }`}
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 