import "./globals.css";
import Link from 'next/link';
import SecaoNoticias from './SeccaoNoticias';
import Banner from './banner';
import ProximosEventos from './ProximosEventos';
import Cronometro from "./cronometro"; // Importação normal
import BannerEstat from "./bannerestat";
import Patrocinadores from "./patrocinadores";
import Parceiros from "./parceiros";

export default async function Home() {
  const res = await fetch('https://admin.santaluziamoreira.pt/jsonapi/node/produtos', {
    cache: 'no-store'
  });

  if (!res.ok) {
    return <div>Erro a carregar o site. Tente novamente mais tarde.</div>;
  }

  const json = await res.json();

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* 2. FATIA DO TEXTO PRINCIPAL (agora com margens curtas) */}
      <div className="px-8 max-w-6xl mx-auto mt-6 mb-4">
        <Cronometro />
      </div>  

      {/* 3. FATIA DO BANNER */}
      <Banner />

      {/* 4. FATIA DOS BOTÕES DE BAIXO (Glassmorphism) */}
      <div className="p-8 max-w-6xl mx-auto flex gap-4 justify-between">
        <Link href="/cartaz" className="bg-white/60 hover:bg-pink-50 hover:text-pink-600 text-gray-900 backdrop-blur-md border border-gray-200/60 shadow-sm px-6 py-3 rounded-lg font-bold transition duration-300 cursor-pointer">
          Ver Cartaz
        </Link>
        <Link href="/como-ajudar/homepage" className="bg-white/60 hover:bg-pink-50 hover:text-pink-600 text-gray-900 backdrop-blur-md border border-gray-200/60 shadow-sm px-6 py-3 rounded-lg font-bold transition duration-300 cursor-pointer">
          Como Ajudar
        </Link>
      </div>

      <SecaoNoticias/>

      {/* 6. Proximo evento */}
      <div className="px-8 max-w-6xl mx-auto mt-20">
      </div>
      <ProximosEventos />

      <BannerEstat/>

      <div className="px-8 max-w-6xl mx-auto mt-20">
        <h2 className="text-4xl font-bold mb-2 text-gray-900">Patrocinadores</h2>
      </div>
      <Patrocinadores/>

      <div id="parceiros" className="px-8 max-w-6xl mx-auto mt-20 scroll-mt-32">
        <h2 className="text-4xl font-bold mb-2 text-gray-900">Parceiros</h2>
      </div>
     <Parceiros/>

    </main>
  );
} 