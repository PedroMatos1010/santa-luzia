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
      <div className="w-full h-[100px] flex items-center justify-center">
         <span className="text-gray-400 font-bold animate-pulse">A calcular tempo restante...</span>
      </div>
    );
  }

  // A função clamp: min(tamanho min), ideal(vw), max(tamanho max)
  // Aplicamos a mesma lógica de escala a todos para manter a harmonia visual
  const fluidText = "text-[clamp(1rem,4vw,3.75rem)]"; 

  return (
    <div className="w-full flex items-center justify-center px-2 py-4 overflow-hidden">
      {terminou ? (
        <h2 className="text-3xl font-black text-pink-600 text-center uppercase animate-pulse">
          A tradição está de volta!
        </h2>
      ) : (
        /* O "flex-nowrap" é a chave: força o browser a manter tudo na mesma linha e a encolher */
        <div className="flex flex-nowrap items-baseline justify-center gap-1 sm:gap-4">
          
          <span className={`${fluidText} font-black text-pink-600 shrink-0`}>
            Faltam:
          </span>
          
          <div className="flex items-baseline gap-1 sm:gap-4 shrink">
            
            <div className="flex flex-col items-center shrink">
              <span className={`${fluidText} font-black text-pink-600`}>{tempo.dias}</span>
              <span className="text-[8px] sm:text-xs font-bold text-gray-500 uppercase">Dias</span>
            </div>
            
            <span className={`${fluidText} font-black text-gray-300 pb-1`}>:</span>
            
            <div className="flex flex-col items-center shrink">
              <span className={`${fluidText} font-black text-pink-600`}>{tempo.horas.toString().padStart(2, '0')}</span>
              <span className="text-[8px] sm:text-xs font-bold text-gray-500 uppercase">Horas</span>
            </div>
            
            <span className={`${fluidText} font-black text-gray-300 pb-1`}>:</span>
            
            <div className="flex flex-col items-center shrink">
              <span className={`${fluidText} font-black text-pink-600`}>{tempo.minutos.toString().padStart(2, '0')}</span>
              <span className="text-[8px] sm:text-xs font-bold text-gray-500 uppercase">Min</span>
            </div>
            
            <span className={`${fluidText} font-black text-gray-300 pb-1`}>:</span>
            
            <div className="flex flex-col items-center shrink">
              <span className={`${fluidText} font-black text-pink-600`}>{tempo.segundos.toString().padStart(2, '0')}</span>
              <span className="text-[8px] sm:text-xs font-bold text-gray-500 uppercase">Seg</span>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}