import React from 'react';

export default function OndeComerPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-20 px-6">
            <div className="max-w-4xl mx-auto">
                
                {/* CABEÇALHO */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Onde Comer
                    </h1>
                    <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
                    <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">
                        Descobre os melhores espaços para petiscar e recarregar energias durante os dias da nossa festa.
                    </p>
                </div>

                {/* MENSAGEM DE "EM DESENVOLVIMENTO" ESTILIZADA */}
                <article className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                    
                    {/* Ícone de Restauração / Comida */}
                    <div className="w-24 h-24 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-8 border border-orange-100 shadow-inner">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                        O menu está no forno...
                    </h2>
                    
                    <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                        A comissão de festas ainda está a preparar a lista oficial de tasquinhas e restaurantes parceiros. Desde o tradicional pão com chouriço no recinto, até àquela francesinha caprichada num dos restaurantes da região, em breve teremos aqui todas as recomendações!
                    </p>

                    {/* Botão de Voltar (Opcional) */}
                    <div className="mt-10">
                        <button className="bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            Voltar ao Início
                        </button>
                    </div>
                </article>

            </div>
        </main>
    );
}