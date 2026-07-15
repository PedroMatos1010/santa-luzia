"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Tipagem base
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

export default function ProgramaFotos({ evento, incluidos }: { evento: Evento[], incluidos: any[] }) {
  const [pesquisa, setPesquisa] = useState('');

  // 1. DESCOBRIR O PRÓXIMO EVENTO
  const hoje = new Date();
  const proximoEvento = evento.find(ev => {
      if (!ev.attributes.field_data) return false;
      return new Date(ev.attributes.field_data) >= hoje;
  });

  // 2. FILTRAR A LISTA PELA PESQUISA
  const eventosFiltrados = evento.filter(ev => 
    ev.attributes.title?.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // ============================================================================
  // FUNÇÃO AUXILIAR: DESENHAR O CARTÃO (Agora é um <Link> clicável!)
  // ============================================================================
  const renderCartao = (item: Evento, isDestaque = false) => {
    const dataBruta = item.attributes.field_data;
    let dataX = "Data a definir";
    let horaY = "--:--";

    if (dataBruta) {
        const dataObj = new Date(dataBruta);
        dataX = dataObj.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
        horaY = dataObj.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
    }

    let urlImagem = null;
    const imagemId = item.relationships?.field_imagem?.data?.id;
    if (imagemId && incluidos) {
        const ficheiro = incluidos.find((inc) => inc.id === imagemId);
        const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
        if (ficheiro?.attributes?.uri?.url) {
            urlImagem = `${baseUrl}${ficheiro.attributes.uri.url}`;
        }
    }

    return (
      <Link 
        href={`/programa/${item.id}`} // O link que leva para a página de detalhes!
        key={item.id} 
        className={`group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-8 w-full cursor-pointer ${isDestaque ? 'border-yellow-400' : 'border-pink-500'}`}
      >
        <div className="p-8 flex flex-col justify-center flex-1 relative z-20">
          <div className="flex items-center gap-3 mb-3">
              <span className={`${isDestaque ? 'text-yellow-400' : 'text-pink-500'} font-black tracking-widest text-sm uppercase drop-shadow-sm`}>
                  {dataX}
              </span>
              {isDestaque && (
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                      A Seguir
                  </span>
              )}
          </div>
          
          <h3 className="text-3xl font-extrabold text-gray-900 mb-6 group-hover:text-pink-600 transition-colors">
    {item.attributes.title}
</h3>
          
          <div className="flex flex-wrap gap-4 mt-auto">
            <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-gray-200">
              <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {item.attributes.field_local || "Local a definir"}
            </span>
            <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-gray-200">
              <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {horaY}
            </span>
          </div>
        </div>
        
        <div className="relative w-full md:w-5/12 h-64 md:h-auto bg-gray-800 flex-shrink-0 overflow-hidden">
          {urlImagem ? (
              <Image src={urlImagem} alt={item.attributes.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100" />
          ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs font-bold uppercase tracking-widest">SEM FOTO</div>
          )}
          <div className="hidden md:block absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
        </div>
      </Link>
    );
  };

  let mesAtual = "";

  return (
    <main className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">Programa</h1>
          
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Pesquisar evento..."
              className="w-full bg-gray-900 text-white rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-pink-500 transition shadow-md placeholder-gray-400 font-medium"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <svg className="w-5 h-5 absolute right-5 top-3.5 text-pink-500 font-bold" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {pesquisa === '' && proximoEvento && (
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    Próximo Evento
                </h2>
                {renderCartao(proximoEvento, true)}
            </div>
        )}

        <div className="flex flex-col gap-8">
          {eventosFiltrados.length === 0 ? (
             <div className="text-gray-500 text-center py-10 font-bold">Nenhum evento encontrado para esta pesquisa.</div>
          ) : (
            eventosFiltrados.map((item) => {
              
              let mostrarCabecalhoMes = false;
              let nomeDoMes = "";

              if (item.attributes.field_data) {
                  const dataObj = new Date(item.attributes.field_data);
                  const mesExtenso = dataObj.toLocaleDateString('pt-PT', { month: 'long'});
                  nomeDoMes = mesExtenso.charAt(0).toUpperCase() + mesExtenso.slice(1);

                  if (nomeDoMes !== mesAtual) {
                      mostrarCabecalhoMes = true;
                      mesAtual = nomeDoMes;
                  }
              }

              return (
                <div key={item.id} className="flex flex-col">
                  {mostrarCabecalhoMes && (
                      <div className="mt-8 mb-6 first:mt-0">
                          <h2 className="text-3xl text-gray-900 font-extrabold border-b-4 border-pink-500 pb-2 inline-block">
                              {nomeDoMes}
                          </h2>
                      </div>
                  )}
                  
                  {renderCartao(item)}
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}