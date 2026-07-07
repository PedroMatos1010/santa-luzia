"use client"; // Obrigatório para podermos usar cliques e estados!

import Image from 'next/image';
import { useState } from 'react';

export default function CartazInterativo({ urlCompleto }: { urlCompleto: string | null }) {
    // Controla se a imagem gigante está aberta ou fechada
    const [aberto, setAberto] = useState(false);

    if (!urlCompleto) {
        return (
            <div className="w-full max-w-md mx-auto aspect-[3/4] bg-gray-800 flex items-center justify-center rounded-xl">
                <span className="text-sm text-gray-500 font-bold">Sem Imagem Disponível</span>
            </div>
        );
    }

    return (
        <>
            {/* 1. A IMAGEM NORMAL NA PÁGINA */}
            <div 
                className="w-full max-w-md mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-2xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                onClick={() => setAberto(true)}
                title="Clique para ampliar"
            >
                <Image
                    src={urlCompleto}
                    alt="Cartaz Oficial da Festa"
                    width={800}
                    height={1200}
                    className="w-full h-auto block"
                />
            </div>

            {/* 2. O EFEITO DE TELA CHEIA (LIGHTBOX) */}
            {aberto && (
                <div 
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
                    onClick={() => setAberto(false)} // Fecha ao clicar fora
                >
                    <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
                        <Image
                            src={urlCompleto}
                            alt="Cartaz Ampliado"
                            fill
                            className="object-contain"
                        />
                    </div>
                    
                    {/* Botão de Fechar (X) */}
                    <button 
                        className="absolute top-6 right-8 text-white text-5xl font-bold hover:text-gray-400 transition"
                        onClick={() => setAberto(false)}
                    >
                        &times;
                    </button>
                </div>
            )}
        </>
    );
}