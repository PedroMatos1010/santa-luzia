"use client";

import { useState } from 'react';
import Image from 'next/image';

// Tipagem atualizada para aceitar o array de incluidos e a relação
type Evento = {
  id: string;
  attributes: {
      title: string;
      field_data?: string;
      field_local?: string;
  };
  relationships?: {
      field_imagem?: {
          data?: {
              id: string;
          } | null;
      };
  };
};

export default function ProgramaCliente({ evento, incluidos }: { evento: Evento[], incluidos: any[] }) {
  const [pesquisa, setPesquisa] = useState('');

  if (!evento || evento.length === 0) {
      return <div className="text-white text-center py-20">Nenhum evento encontrado.</div>;
  }

  const eventosFiltrados = evento.filter(ev => 
    ev.attributes.title?.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <main className="bg-gray-950 min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <h1 className="text-6xl font-extrabold text-white tracking-tight">Programa</h1>
          <input
            type="text"
            placeholder="Pesquisar evento..."
            className="w-full md:w-80 px-6 py-3 bg-gray-900 border border-gray-700 text-white rounded-full focus:ring-2 focus:ring-pink-500 outline-none transition"
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        {/* LISTA */}
        <div className="flex flex-col gap-6">
          {eventosFiltrados.map((item) => {
            
            // --- 1. A LÓGICA DA DATA ---
            const dataBruta = item.attributes.field_data;
            let dataX = "Data a definir";
            let horaY = "Hora a definir";

            if (dataBruta) {
                const dataObj = new Date(dataBruta);
                dataX = dataObj.toLocaleDateString('pt-PT');
                horaY = dataObj.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
            }

            // --- 2. A LÓGICA DA IMAGEM ---
            let urlImagem = null;
            
            // Qual é o ID (Foreign Key) da foto deste evento?
            const imagemId = item.relationships?.field_imagem?.data?.id;
            
            if (imagemId && incluidos) {
                // Procurar no array de ficheiros enviados pelo servidor
                const ficheiro = incluidos.find((inc) => inc.id === imagemId);
                
                // BASE URL DE SEGURANÇA (Igual ao que fizemos no Banner.tsx)
                // Nota: O Next.js exige o 'NEXT_PUBLIC_' para variáveis que correm no cliente (neste caso, "use client")
                const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'http://festa-santa-luzia-api.ddev.site';

                // Se encontrámos, montamos o URL absoluto
                if (ficheiro?.attributes?.uri?.url) {
                    urlImagem = `${baseUrl}${ficheiro.attributes.uri.url}`;
                }
            }
            return (
              <div key={item.id} className="group bg-gray-900 hover:bg-gray-800 border-l-4 border-pink-500 p-8 rounded-r-2xl shadow-xl transition-all duration-300 flex justify-between items-center">
                <div>
                  <span className="text-pink-400 font-bold tracking-widest text-sm uppercase">
                      {dataX}
                  </span>
                  
                  <h3 className="text-3xl font-bold text-white mt-1 group-hover:text-pink-400 transition">
                      {item.attributes.title}
                  </h3>
                  
                  <div className="flex gap-4 mt-3 text-gray-400">
                    <span className="bg-gray-800 px-3 py-1 rounded text-sm">{item.attributes.field_local || "Local a definir"}</span>
                    <span className="bg-gray-800 px-3 py-1 rounded text-sm">{horaY}</span>
                  </div>
                </div>
                
                {/* --- A RENDERIZAÇÃO DA IMAGEM --- */}
                {/* A div já tem as propriedades "relative", "w-64", "h-40" por isso o Next.js não deve dar erro! */}
                <div className="relative overflow-hidden w-64 h-40 bg-gray-800 flex items-center justify-center text-gray-600 font-bold border border-gray-700">
                  {urlImagem ? (
                      <Image 
                          src={urlImagem}
                          alt={item.attributes.title}
                          fill
                          className="object-cover"
                      />
                  ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs font-bold">
                          SEM FOTO
                      </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}