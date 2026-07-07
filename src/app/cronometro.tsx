"use client";

import { useEffect, useState } from 'react';

export default function Cronometro() {
  const [isClient, setIsClient] = useState(false);
  const [terminou, setTerminou] = useState(false);
  const [tempo, setTempo] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    setIsClient(true);
    const alvo = new Date("2026-12-11T00:00:00").getTime();

    const atualizar = () => {
      const agora = Date.now();
      const diff = alvo - agora;

      if (diff <= 0) {
        setTerminou(true);
      } else {
        setTempo({
          dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
          horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((diff / 1000 / 60) % 60),
          segundos: Math.floor((diff / 1000) % 60),
        });
      }
    };

    atualizar(); 
    const timer = setInterval(atualizar, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return (
      // Fundo e margens removidos
      <div className="w-full h-[100px] flex items-center justify-center">
         <span className="text-gray-400 font-bold animate-pulse">A calcular tempo restante...</span>
      </div>
    );
  }

  return (
    // Fundo, linhas tracejadas e sombras removidos. Tudo limpo!
    <div className="w-full h-auto flex items-center justify-center">
      {terminou ? (
        <h2 className="text-3xl md:text-4xl font-black text-pink-600 text-center uppercase tracking-wider animate-pulse">
          A tradição está de volta!
        </h2>
      ) : (
        <div className="flex items-center gap-4 md:gap-8">
          <span className="text-3xl md:text-6xl font-black text-pink-600 pb-6">Faltam:</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-6xl font-black text-pink-600">{tempo.dias}</span>
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Dias</span>
          </div>
          <span className="text-3xl md:text-6xl font-black text-gray-300 pb-6">:</span>
          
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-6xl font-black text-pink-600">
              {tempo.horas.toString().padStart(2, '0')}
            </span>
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Horas</span>
          </div>
          
          <span className="text-3xl md:text-6xl font-black text-gray-300 pb-6">:</span>
          
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-6xl font-black text-pink-600">
              {tempo.minutos.toString().padStart(2, '0')}
            </span>
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Min</span>
          </div>
          
          <span className="text-3xl md:text-6xl font-black text-gray-300 pb-6 hidden sm:block">:</span>
          
          <div className="hidden sm:flex flex-col items-center">
            <span className="text-3xl md:text-6xl font-black text-pink-600">
              {tempo.segundos.toString().padStart(2, '0')}
            </span>
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Seg</span>
          </div>

        </div>
      )}
    </div>
  );
}