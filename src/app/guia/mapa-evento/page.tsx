import React from 'react';

export default function MapaEventoPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-20 px-6">
            <div className="max-w-4xl mx-auto">
                
                {/* CABEÇALHO */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Mapa do Evento
                    </h1>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
                    <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">
                        Orienta-te no recinto da festa e descobre rapidamente onde estão os palcos, as tasquinhas e os pontos de interesse de Moreira de Cónegos.
                    </p>
                </div>

                {/* MENSAGEM DE "EM DESENVOLVIMENTO" ESTILIZADA */}
                <article className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                    
                    {/* Ícone de Mapa/Localização */}
                    <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-8 border border-indigo-100 shadow-inner">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                        A mapear o recinto...
                    </h2>
                    
                    <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                        A comissão ainda está a definir a localização exata de cada estrutura no recinto da Festa de Santa Luzia. Em breve, disponibilizaremos aqui a planta interativa completa para que saibas sempre onde ir durante as festividades!
                    </p>

                </article>

            </div>
        </main>
    );
}