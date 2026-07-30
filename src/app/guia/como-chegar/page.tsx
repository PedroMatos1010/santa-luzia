"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapaEstatico = dynamic(() => import('./MapaMoreiraViagem'), { 
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-gray-50 animate-pulse flex items-center justify-center">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">A carregar mapa...</span>
        </div>
    )
});

// Mantemos o grupo 'rotasSul'
const TODOS_FILTROS_CARRO = [
    'parques',
    'rotaGuimaraes', 'rotaVizela', 'rotasSul'
];

const subMenuCarro = [
    { id: 'parques', label: 'Parques de Estacionamento', tipo: 'parque' },
    { id: 'rotaGuimaraes', label: 'Rota de Guimarães', tipo: 'rota' },
    { id: 'rotaVizela', label: 'Rota de Vizela', tipo: 'rota' },
    { id: 'rotasSul', label: 'Rotas Lordelo e Vila do Campo', tipo: 'rota' }, // Nome limpo e direto
];

export default function ComoChegarPage() {
    const [categoria, setCategoria] = useState('carro'); 
    const [filtrosAtivos, setFiltrosAtivos] = useState<string[]>(TODOS_FILTROS_CARRO);

    const opcoes = [
        { id: 'comboio', nome: 'Comboio', icon: '🚂' },
        { id: 'carro', nome: 'Carro', icon: '🚗' },
        { id: 'autocarro', nome: 'Autocarro', icon: '🚌' }
    ];

    const handleToggleFiltro = (id: string) => {
        setFiltrosAtivos(prev => 
            prev.includes(id) 
                ? prev.filter(f => f !== id) 
                : [...prev, id]
        );
    };

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">Como Chegar</h1>
                    <p className="text-lg text-gray-600">Filtra as opções de transporte e descobre a melhor rota para a festa.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-gray-100">
                    
                    {/* MENU LATERAL */}
                    <div className="w-full md:w-72 flex flex-col gap-3 shrink-0 h-[450px] md:h-[550px] overflow-y-auto pr-2 custom-scrollbar">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2 mt-2">
                            Filtros de Transporte
                        </h3>
                        
                        {opcoes.map((opcao) => (
                            <div key={opcao.id} className="flex flex-col gap-2">
                                <button
                                    onClick={() => setCategoria(opcao.id)}
                                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all text-left ${
                                        categoria === opcao.id 
                                        ? 'bg-gray-900 text-white shadow-md scale-[1.02]' 
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    <span className="text-2xl">{opcao.icon}</span>
                                    <span className="text-base">{opcao.nome}</span>
                                </button>

                                {/* SUB-MENU EXPANSÍVEL */}
                                {categoria === 'carro' && opcao.id === 'carro' && (
                                    <div className="ml-4 pl-4 border-l-2 border-gray-100 flex flex-col gap-2 my-2 py-1">
                                        {subMenuCarro.map((subItem) => {
                                            const isActive = filtrosAtivos.includes(subItem.id);
                                            return (
                                                <button
                                                    key={subItem.id}
                                                    onClick={() => handleToggleFiltro(subItem.id)}
                                                    className={`text-sm text-left px-3 py-2 rounded-xl font-semibold transition-colors flex items-center justify-between ${
                                                        isActive 
                                                        ? 'bg-amber-100 text-amber-900' 
                                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <span className="truncate" title={subItem.label}>{subItem.label}</span>
                                                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ml-2 ${
                                                        isActive ? 'border-amber-500 bg-amber-500' : 'border-gray-300'
                                                    }`}>
                                                        {isActive && (
                                                            <svg className="w-full h-full text-white p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ÁREA DO MAPA */}
                    <div className="flex-1 w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 relative z-0">
                        <MapaEstatico categoriaAtiva={categoria} filtrosAtivos={filtrosAtivos} />
                    </div>

                </div>
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 20px; }
            `}</style>
        </main>
    );
}