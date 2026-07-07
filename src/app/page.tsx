import "./globals.css";
import Link from 'next/link';
import SecaoNoticias from './SeccaoNoticias';
import Banner from './banner';
import ProximosEventos from './ProximosEventos';
import Cronometro from "./cronometro"; // Importação normal

export default async function Home() {
  const res = await fetch('http://festa-santa-luzia-api.ddev.site/jsonapi/node/produtos', {
    cache: 'no-store'
  });

  if (!res.ok) {
    return <div>Erro a carregar o site. Tente novamente mais tarde.</div>;
  }

  const json = await res.json();

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* 2. FATIA DO TEXTO PRINCIPAL */}
      {/* 2. FATIA DO TEXTO PRINCIPAL (agora com margens curtas) */}
      <div className="px-8 max-w-6xl mx-auto mt-6 mb-4">
        <Cronometro />
      </div>  

      {/* 3. FATIA DO BANNER */}
      <Banner />

      {/* 4. FATIA DOS BOTÕES DE BAIXO (Glassmorphism) */}
      <div className="p-8 max-w-6xl mx-auto flex gap-4 justify-between">
        <Link href="/cartaz" className="bg-white/60 hover:bg-white/90 text-gray-900 backdrop-blur-md border border-gray-200/60 shadow-sm px-6 py-3 rounded-lg font-bold transition duration-300 cursor-pointer">
          Ver Cartaz
        </Link>
        <Link href="/como-ajudar/homepage" className="bg-white/60 hover:bg-white/90 text-gray-900 backdrop-blur-md border border-gray-200/60 shadow-sm px-6 py-3 rounded-lg font-bold transition duration-300 cursor-pointer">
          Como Ajudar
        </Link>
      </div>

      <SecaoNoticias />

      {/* 6. Proximo evento */}
      <div className="px-8 max-w-6xl mx-auto mt-20">
      </div>
      <ProximosEventos />

      {/* =========================================
          BANNER DE ESTATÍSTICAS
          ========================================= */}
      <div className="w-full bg-white mt-28 mb-28 py-16 border-y border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">

          {/* ESTATÍSTICA 1 */}
          <div className="flex flex-col">
            <span className="text-5xl md:text-6xl font-black text-pink-600">10</span>
            <span className="text-lg font-bold text-gray-500 mt-2 uppercase tracking-wide">elementos</span>
          </div>

          {/* ESTATÍSTICA 2 */}
          <div className="flex flex-col">
            <span className="text-5xl md:text-6xl font-black text-pink-600">3</span>
            <span className="text-lg font-bold text-gray-500 mt-2 uppercase tracking-wide">Dias de Romaria</span>
          </div>

          {/* ESTATÍSTICA 3 */}
          <div className="flex flex-col">
            <span className="text-5xl md:text-6xl font-black text-pink-600">+500</span>
            <span className="text-lg font-bold text-gray-500 mt-2 uppercase tracking-wide">febras na Grelha</span>
          </div>

          {/* ESTATÍSTICA 4 */}
          <div className="flex flex-col">
            <span className="text-5xl md:text-6xl font-black text-pink-600">100%</span>
            <span className="text-lg font-bold text-gray-500 mt-2 uppercase tracking-wide">Moreira</span>
          </div>

        </div>
      </div>

      <div className="px-8 max-w-6xl mx-auto mt-20">
        <h2 className="text-4xl font-bold mb-2 text-gray-900">Patrocinadores</h2>
      </div>
      <div className="w-full h-64 bg-white border-y border-gray-200 mt-4 flex items-center justify-center font-bold text-gray-400 text-2xl shadow-sm">
        Patrocinadores
      </div>

      <div className="px-8 max-w-6xl mx-auto mt-20">
        <h2 className="text-4xl font-bold mb-2 text-gray-900">Parceiros</h2>
      </div>
      <div className="w-full h-64 bg-white border-y border-gray-200 mt-4 flex items-center justify-center font-bold text-gray-400 text-2xl shadow-sm mb-10">
        Parceiros
      </div>

    </main>
  );
}