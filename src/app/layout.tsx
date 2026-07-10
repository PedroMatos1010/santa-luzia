import "./globals.css";
import Link from 'next/link';
import Logo from './logo';
import Image from 'next/image';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-gray-50 min-h-screen flex flex-col justify-between text-gray-900">

        <div>
          {/* =========================================
              1. A FATIA DO MENU GLOBAL
              ========================================= */}
          <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
            <div className="p-6 max-w-6xl mx-auto flex justify-between items-center gap-4">
              <Logo />

              <div className="flex gap-4 items-center">

                {/* 1. Botão Programa (Glassmorphism) */}
                <div>
                  <Link href="/programa" className="bg-white/60 hover:bg-pink-50 hover:text-pink-600 text-gray-900 backdrop-blur-md border border-gray-200/60 shadow-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 block">
                    Programa
                  </Link>
                </div>

                {/* 2. Botão Festa com Dropdown */}
                <div className="relative group">
                  <Link href="#" className="bg-white/60 hover:bg-pink-50 hover:text-pink-600 text-gray-900 backdrop-blur-md border border-gray-200/60 shadow-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 block">
                    Festa
                  </Link>
                  <div className="absolute top-full left-0 pt-2 w-48 hidden group-hover:block z-50">
                    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-100">
                      <Link href="/festa/historia" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-50 transition">
                        A História
                      </Link>
                      <Link href="/festa/comissao" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-50 transition">
                        Comissão de 2026
                      </Link>
                      <Link href="/festa/devocao" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-50 transition">
                        Devoção a Santa Luzia
                      </Link>
                      <Link href="/festa/galeria" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-50 transition">
                        Galeria
                      </Link>
                      <Link href="/festa/contactos" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold transition">
                        Contactos
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 3. Botão Guia do Visitante com Dropdown */}
                <div className="relative group">
                  <Link href="#" className="bg-white/60 hover:bg-pink-50 hover:text-pink-600 text-gray-900 backdrop-blur-md border border-gray-200/60 shadow-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 block">
                    Guia do Visitante
                  </Link>
                  <div className="absolute top-full left-0 pt-2 w-48 hidden group-hover:block z-50">
                    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-xl overflow-hidden flex flex-col border border-gray-100">
                      <Link href="/guia/como-chegar" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-50 transition">
                        Como Chegar
                      </Link>
                      <Link href="/guia/onde-comer" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-50 transition">
                        Onde Comer
                      </Link>
                      <Link href="/guia/mapa-do-evento" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-50 transition">
                        Mapa do Evento
                      </Link>
                      <Link href="/guia/o-que-visitar" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold border-b border-gray-50 transition">
                        O que Visitar
                      </Link>
                      <Link href="/guia/contactos" className="px-4 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 font-bold transition">
                        Contactos
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 4. Botão Loja (Destaque ligeiramente mais opaco) */}
                <div>
                  <Link href="/loja" className="bg-white/80 hover:bg-pink-50 hover:text-pink-600 text-pink-600 backdrop-blur-md border border-pink-200 shadow-sm font-bold px-4 py-2 rounded-lg transition-all duration-300 block">
                    Loja
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* =========================================
              2. O RECHEIO DINÂMICO
              ========================================= */}
          <main>
            {children}
          </main>
        </div>

        {/* =========================================
            3. A FATIA DO RODAPÉ GLOBAL
            ========================================= */}
        {/* Aumentei o padding no topo (pt-32) para dar a altura onde vais inserir as coisas futuras */}
        <footer className="w-full bg-blue-900 text-white pt-24 pb-8 mt-20 shadow-inner flex flex-col justify-end">

          {/* ==============================================
              ESPAÇO LIVRE NO TOPO DO FOOTER 
              (Para adicionares links, newsletter, etc., mais tarde) 
              ============================================== */}
          {/* ==============================================
              ESPAÇO LIVRE NO TOPO DO FOOTER 
              ============================================== */}
          <div className="max-w-6xl mx-auto px-8 w-full flex justify-between items-start gap-8">

            {/* LADO ESQUERDO: Texto Oficial */}
            <div className="max-w-lg">
              <p className="font-bold text-lg leading-relaxed">
                Este é o site oficial das Festas de Santa Luzia de Moreira de Cónegos.
                <br />
                Junta-te a nós e celebra a tradição, a cultura e a devoção nesta festa única!
              </p>
            </div>

            {/* LADO DIREITO: Contactos e Morada */}
            <div className="flex-shrink-0 flex flex-col gap-2 ">
              <p className="font-bold text-md " >
                Contactos:
                <br />
                comissao.festas.santa.luzia.mc@gmail.com
              </p>
              <p className="font-bold text-md " >
                Morada:
                <br />
                Rua do Infantario, 4815-000 Moreira de Cónegos, Portugal
              </p>

              {/* Linha das Redes Sociais */}
              <div className="flex gap-3 mt-4">

                {/* Botão Instagram */}
                <a
                  href="https://www.instagram.com/st_luzia_2026_oficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-pink-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-white/10"
                  title="Siga-nos no Instagram"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* Botão Facebook */}
                <a
                  href="https://www.facebook.com/people/Comissão-de-Festa-Santa-Luzia-2026/61561751128130/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-white/10"
                  title="Siga-nos no Facebook"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

              </div>
            </div>
          </div>

          {/* ==============================================
              BASE DO FOOTER (Colada ao fundo)
              ============================================== */}
          <div className="max-w-6xl mx-auto px-8 w-full flex justify-between items-end mt-12">

            {/* ESQUERDA: Logo + Informação Legal */}
            <div className="flex flex-col gap-3">

              {/* 1. Logo por cima */}
              <div className="mb-2 bg-white border border-transparent rounded-lg hover:bg-gray-100 text-blue-900 shadow-sm transition cursor-pointer">
                <Logo />
              </div>

              {/* 2. Linha Centrada Horizontalmente: Copyright + Privacidade + Termos */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <span className="font-bold">© 2026 Festa de Santa Luzia</span>
                <Link href="/privacidade" className="hover:text-pink-300 transition-colors">
                  Política de Privacidade
                </Link>
                <Link href="/termos" className="hover:text-pink-300 transition-colors">
                  Termos e Condições
                </Link>
              </div>

              {/* 3. Direitos reservados por baixo */}
              <div className="text-xs text-blue-200 flex items-center gap-1">
                Todos os direitos reservados
              </div>
            </div>

            {/* DIREITA: Botões Institucionais */}
            <div className="flex gap-4 items-center">
              <Link href="https://jfmoreiradeconegos.pt" className=" bg-transparent border-transparent flex items-center justify-center text-xs font-bold rounded-lg hover:bg-gray-100 text-blue-900 shadow-sm transition cursor-pointer">
                <Image src="/moreiradeconegos.png" alt="Junta de Freguesia de Moreira de Cónegos" width={80} height={20} />
              </Link>
              {/*<Link href="https://www.cm-guimaraes.pt" className=" bg-transparent border-transparent flex items-center justify-center text-xs font-bold rounded-lg hover:bg-gray-100 text-blue-900 shadow-sm transition cursor-pointer">
                <Image src="/guimaraeslogo.png" alt="Câmara Municipal de Guimarães" width={80} height={20} />
              </Link>*/}
            </div>
          </div>
        </footer>
      </body>
    </html >
  );
}