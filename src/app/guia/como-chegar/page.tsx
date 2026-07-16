"use client"; 

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapaEstatico = dynamic(() => import('./MapaMoreiraViagem'), { 
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 animate-pulse text-gray-400">
            <svg className="w-10 h-10 mb-2 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span className="font-bold text-sm tracking-widest uppercase">A carregar mapa...</span>
        </div>
    )
});

export default function ComoChegarPage() {
    // ESTADO: Guarda qual é o meio de transporte selecionado ('todos', 'comboio', 'carro', 'autocarro')
    const [categoria, setCategoria] = useState('todos');

    // Função auxiliar para marcar/desmarcar
    const aoClicar = (tipo: string) => {
        if (categoria === tipo) {
            setCategoria('todos'); // Se já estava selecionado, desmarca e mostra tudo
        } else {
            setCategoria(tipo); // Seleciona o novo
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                
                <div className="mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Como Chegar
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl">
                        Selecione um dos meios de transporte abaixo para filtrar as localizações no mapa interativo.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    
                    <div className="lg:w-1/3 flex flex-col gap-6">
                        
                        {/* Cartão de Comboio (Agora funciona como Botão!) */}
                        <div 
                            onClick={() => aoClicar('comboio')}
                            className={`cursor-pointer bg-white p-6 rounded-2xl shadow-sm transition-all duration-300 transform hover:-translate-y-1 ${categoria === 'comboio' ? 'border-2 border-pink-500 ring-4 ring-pink-100' : 'border border-gray-200 hover:shadow-md'}`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 rounded-xl transition-colors ${categoria === 'comboio' ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8zm2-6h12a2 2 0 012 2v4H4V6a2 2 0 012-2z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v.01M16 14v.01"></path></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Comboio</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm">A paragem mais próxima é o apeadeiro local. Se vieres da linha de Guimarães, podes sair diretamente aqui.</p>
                        </div>

                        {/* Cartão de Carro */}
                        <div 
                            onClick={() => aoClicar('carro')}
                            className={`cursor-pointer bg-white p-6 rounded-2xl shadow-sm transition-all duration-300 transform hover:-translate-y-1 ${categoria === 'carro' ? 'border-2 border-pink-500 ring-4 ring-pink-100' : 'border border-gray-200 hover:shadow-md'}`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 rounded-xl transition-colors ${categoria === 'carro' ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8a2 2 0 012 2v6m-8-2h.01M12 17h.01M16 17h.01M4 17a2 2 0 01-2-2V9a2 2 0 012-2h1.272a2 2 0 011.897 1.368l1.325 3.974A2 2 0 008.391 14h7.218a2 2 0 001.897-1.368l1.325-3.974A2 2 0 0120.728 7H22v8a2 2 0 01-2 2h-1m-15 0h2a2 2 0 002-2v-1h-6v1a2 2 0 002 2z"></path></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Carro</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm">Existem várias zonas de estacionamento marcadas no mapa. Recomendamos chegar cedo nos dias principais.</p>
                        </div>

                        {/* Cartão de Autocarro */}
                        <div 
                            onClick={() => aoClicar('autocarro')}
                            className={`cursor-pointer bg-white p-6 rounded-2xl shadow-sm transition-all duration-300 transform hover:-translate-y-1 ${categoria === 'autocarro' ? 'border-2 border-pink-500 ring-4 ring-pink-100' : 'border border-gray-200 hover:shadow-md'}`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 rounded-xl transition-colors ${categoria === 'autocarro' ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Autocarro</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm">As linhas de transporte público têm paragens centrais na vila. Verifica os horários durante o fim de semana.</p>
                        </div>

                    </div>

                    <div className="lg:w-2/3">
                        <div className="w-full h-[600px] rounded-3xl border-4 border-white shadow-xl relative overflow-hidden z-0 bg-gray-100">
                            {/* ENVIAMOS O ESTADO PARA O MAPA AQUI! */}
                            <MapaEstatico categoriaAtiva={categoria} />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}