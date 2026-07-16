"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Header({ logo }: { logo: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    if (openDropdown === menu) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(menu);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="p-4 md:p-6 max-w-6xl mx-auto flex justify-between items-center gap-4">
        {logo}

        {/* Botão Hambúrguer (Apenas Mobile) */}
        <button 
          className="md:hidden p-2 text-gray-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menu Desktop e Mobile */}
        <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent border-b md:border-none border-gray-200 shadow-lg md:shadow-none p-6 md:p-0 gap-4 md:items-center z-50`}>
          
          {/* 1. Botão Programa */}
          <div>
            <Link href="/programa" className="bg-white/60 hover:bg-pink-50 hover:text-pink-600 text-gray-900 md:backdrop-blur-md md:border md:border-gray-200/60 md:shadow-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 block">
              Programa
            </Link>
          </div>

          {/* 2. Botão Festa */}
          <div className="relative group">
            <button 
              onClick={() => toggleDropdown('festa')}
              className="w-full text-left bg-white/60 hover:bg-pink-50 hover:text-pink-600 text-gray-900 md:backdrop-blur-md md:border md:border-gray-200/60 md:shadow-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex justify-between items-center"
            >
              Festa
              <span className="md:hidden ml-2">{openDropdown === 'festa' ? '▲' : '▼'}</span>
            </button>
            <div className={`${openDropdown === 'festa' ? 'block' : 'hidden'} md:group-hover:block relative md:absolute top-full left-0 pt-2 w-full md:w-48 z-50`}>
              <div className="bg-gray-50 md:bg-white/90 md:backdrop-blur-md rounded-lg shadow-inner md:shadow-xl overflow-hidden flex flex-col md:border border-gray-100 mt-2 md:mt-0 pl-4 md:pl-0">
                <Link href="/festa/historia" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-100 transition">A História</Link>
                <Link href="/festa/comissao" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-100 transition">Comissão de 2026</Link>
                <Link href="/festa/devocao" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-100 transition">Devoção a Santa Luzia</Link>
                <Link href="/festa/galeria" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-100 transition">Galeria</Link>
                <Link href="/festa/contactos" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold transition">Contactos</Link>
              </div>
            </div>
          </div>

          {/* 3. Botão Guia do Visitante */}
          <div className="relative group">
            <button 
              onClick={() => toggleDropdown('guia')}
              className="w-full text-left bg-white/60 hover:bg-pink-50 hover:text-pink-600 text-gray-900 md:backdrop-blur-md md:border md:border-gray-200/60 md:shadow-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex justify-between items-center"
            >
              Guia do Visitante
              <span className="md:hidden ml-2">{openDropdown === 'guia' ? '▲' : '▼'}</span>
            </button>
            <div className={`${openDropdown === 'guia' ? 'block' : 'hidden'} md:group-hover:block relative md:absolute top-full left-0 pt-2 w-full md:w-48 z-50`}>
              <div className="bg-gray-50 md:bg-white/90 md:backdrop-blur-md rounded-lg shadow-inner md:shadow-xl overflow-hidden flex flex-col md:border border-gray-100 mt-2 md:mt-0 pl-4 md:pl-0">
                <Link href="/guia/como-chegar" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-100 transition">Como Chegar</Link>
                <Link href="/guia/onde-comer" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-100 transition">Onde Comer</Link>
                <Link href="/guia/mapa-evento" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-100 transition">Mapa do Evento</Link>
                <Link href="/guia/patrimonio-local" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-100 transition">Património Local</Link>
              </div>
            </div>
          </div>

          {/* 4. Botão Loja */} 
          <div>
            <Link href="/loja" className="bg-pink-50 md:bg-white/80 hover:bg-pink-100 hover:text-pink-700 text-pink-600 md:backdrop-blur-md md:border border-pink-200 md:shadow-sm font-bold px-4 py-2 rounded-lg transition-all duration-300 block text-center md:text-left">
              Loja
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}