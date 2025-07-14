import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full text-[#9A9A9A]">
            <div className="container mx-auto max-w-7xl pb-6 pt-6 px-4 lg:pb-16 lg:pt-16">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start mb-12">
                    <div className="mb-8 md:mb-0 max-w-xs mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">
                        <img src="/assets/LogoAmplify.svg" alt="Amplify" className="w-64 mb-3" />
                        <p className="text-lg leading-tight">
                            La evolución de la radio en Costa Rica. Música, cultura y comunidad que te inspiran.
                        </p>
                    </div>

                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 text-center lg:text-left mx-auto lg:mx-0">
                        <div>
                            <p className="text-lg mb-2 flex items-center justify-center lg:justify-start text-[#D7D7D7] font-semibold">
                                INFORMACIÓN
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/sobre-nosotros" className="hover:text-[#E5754C] transition-colors">Sobre Nosotros</Link></li>
                                <li><Link href="/podcasts" className="hover:text-[#E5754C] transition-colors">Podcasts</Link></li>
                                <li><Link href="/horario" className="hover:text-[#E5754C] transition-colors">Horario</Link></li>
                                <li><Link href="/amplifiers" className="hover:text-[#E5754C] transition-colors">Amplifiers</Link></li>
                                <li><Link href="/en-vivo" className="hover:text-[#E5754C] transition-colors">En Vivo</Link></li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-lg mb-2 flex items-center justify-center lg:justify-start text-[#D7D7D7] font-semibold">
                                NOTICIAS
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/actualidad" className="hover:text-[#E5754C] transition-colors">Actualidad</Link></li>
                                <li><Link href="/tendencia" className="hover:text-[#E5754C] transition-colors">Tendencia</Link></li>
                                <li><Link href="/entretenimiento" className="hover:text-[#E5754C] transition-colors">Entretenimiento</Link></li>
                                <li><Link href="/dada-te-cuenta" className="hover:text-[#E5754C] transition-colors">Dadá te cuenta</Link></li>
                                <li><Link href="/columna" className="hover:text-[#E5754C] transition-colors">Columna</Link></li>
                                <li><Link href="/lit-by-lit" className="hover:text-[#E5754C] transition-colors">Lit by lit</Link></li>
                                <li><Link href="/negocios" className="hover:text-[#E5754C] transition-colors">Negocios</Link></li>
                                <li><Link href="/sin-categoria" className="hover:text-[#E5754C] transition-colors">Sin categoría</Link></li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-lg mb-2 flex items-center justify-center lg:justify-start text-[#D7D7D7] font-semibold">
                                REDES SOCIALES
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5754C] transition-colors">Instagram</a></li>
                                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5754C] transition-colors">Facebook</a></li>
                                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E5754C] transition-colors">Twitter (X)</a></li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-lg mb-2 flex items-center justify-center lg:justify-start text-[#D7D7D7] font-semibold">
                                CONTACTO
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className='flex flex-col'>Teléfono: <a href="tel:+50622240707" className="hover:text-[#E5754C] transition-colors text-[#D7D7D7]/40">+506 2224 - 0707</a></li>
                                <li className='flex flex-col'>Correo: <a href="mailto:ventas@grupocolumbia.co.cr" className="hover:text-[#E5754C] transition-colors text-[#D7D7D7]/40">ventas@grupocolumbia.co.cr</a></li>
                                <li className='flex flex-col'>Pauta con nosotros: <Link href="/contact" className="hover:text-[#E5754C] transition-colors text-[#D7D7D7]/40">Formulario</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full bg-[#E5754C] py-4">
                <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-black mb-4 md:mb-0">© 2025 Amplify Radio. Todos los derechos reservados.</p>
                    <div className="flex gap-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-80 transition-opacity">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-80 transition-opacity">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-80 transition-opacity">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
