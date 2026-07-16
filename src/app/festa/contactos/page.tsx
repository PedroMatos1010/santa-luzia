import Link from 'next/link';

export default async function ContactosPage() {
    // 1. LÓGICA PARA IR BUSCAR O E-MAIL AO DRUPAL
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'http://festa-santa-luzia-api.ddev.site';
    let emailDinamico = "geral@santaluzia.pt"; // Email de fallback caso a API falhe

    try {
        // ATENÇÃO: Substitui 'site_settings' pelo nome exato do teu tipo de conteúdo/endpoint onde guardas o e-mail
        const res = await fetch(`${baseUrl}/jsonapi/node/site_settings`, {
            cache: 'no-store'
        });

        if (res.ok) {
            const json = await res.json();
            // Ajusta "field_email" para o nome exato do campo que criaste no Drupal
            if (json.data && json.data.length > 0 && json.data[0].attributes.field_email) {
                emailDinamico = json.data[0].attributes.field_email;
            }
        }
    } catch (error) {
        console.error("Erro ao carregar o e-mail:", error);
    }

    return (
        <main className="bg-gray-50 min-h-screen py-20 px-6">
            <div className="max-w-5xl mx-auto">
                
                {/* CABEÇALHO */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Contactos
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">
                        Tens alguma dúvida, sugestão ou queres apoiar a nossa festa? Entra em contacto com a comissão através dos canais abaixo.
                    </p>
                </div>

                {/* GRELHA DE CONTACTOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* CARTÃO WHATSAPP (Mensagem Direta) */}
                    <a 
                        href="https://wa.me/351964196875" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h2>
                            <p className="text-gray-600 mb-2">Fala diretamente com a comissão de festas.</p>
                            <span className="text-green-600 font-bold">+351 964 196 875</span>
                        </div>
                    </a>

                    {/* CARTÃO CANAL WHATSAPP */}
                    <a 
                        href="https://whatsapp.com/channel/0029Vb80OI5EgGfG7XtQFF2i" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Canal de Avisos</h2>
                            <p className="text-gray-600 mb-2">Junta-te ao nosso canal para não perderes nenhuma novidade.</p>
                            <span className="text-teal-600 font-bold">Aderir ao Canal &rarr;</span>
                        </div>
                    </a>

                    {/* CARTÃO E-MAIL (Dinâmico do Drupal) */}
                    <a 
                        href={`mailto:${emailDinamico}`}
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">E-mail</h2>
                            <p className="text-gray-600 mb-2">Para assuntos formais, patrocínios ou parcerias.</p>
                            <span className="text-blue-600 font-bold">{emailDinamico}</span>
                        </div>
                    </a>

                    {/* CARTÃO LOCALIZAÇÃO */}
                    <a 
                        href="https://www.google.com/maps/@41.3812459,-8.3390862,106m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
                    >
                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Localização</h2>
                            <p className="text-gray-600 mb-2">Capela de Santa Luzia, Moreira de Cónegos</p>
                            <span className="text-red-600 font-bold">Ver no Mapa &rarr;</span>
                        </div>
                    </a>

                </div>

                {/* REDES SOCIAIS */}
                <div className="mt-12 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Segue-nos nas Redes Sociais</h3>
                    <div className="flex justify-center gap-6">
                        {/* Facebook */}
                        <a href="https://www.facebook.com/people/Comissão-de-Festa-Santa-Luzia-2026/61561751128130/" className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/st_luzia_2026_oficial/" className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.469 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </main>
    );
}