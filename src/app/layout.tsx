import "./globals.css";
import Header from "./Header";
import Logo from "./logo";
import Link from "next/link";
import Image from "next/image";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // 1. Rota de base dinâmica com fallback garantido para o DDEV
  const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
  
  // 2. Email de recurso (fallback) caso o Drupal esteja desligado
  let emailContacto = "comissao.festas.santa.luzia.mc@gmail.com";

  // 3. Blindagem Try/Catch e Fetch à rota correta do email
  try {
    const res = await fetch(`${baseUrl}/jsonapi/node/email?page[limit]=1`, {
      cache: 'no-store'
    });

    if (res.ok) {
      const json = await res.json();
      // Opcionalmente procura por field_email_comissao ou field_email (consoante o nome exato que deste ao campo no Drupal)
      const fetchedEmail = json?.data?.[0]?.attributes?.field_email_comissao || json?.data?.[0]?.attributes?.field_email;
      
      if (fetchedEmail) {
        emailContacto = fetchedEmail;
      }
    } else {
      console.error(`Erro na API de Email: O Drupal respondeu com ${res.status}`);
    }
  } catch (error) {
    console.error("Falha crítica ao tentar contactar o DDEV no Layout:", error);
  }

  return (
    <html lang="pt">
      <body className="bg-gray-50 min-h-screen flex flex-col justify-between text-gray-900">

        <div>
          {/* 
            Passamos o Logo já processado no servidor para dentro do Header (que é cliente).
            Magia pura da arquitetura! 
          */}
          <Header logo={<Logo />} />

          <main>
            {children}
          </main>
        </div>

        {/* =========================================
            3. A FATIA DO RODAPÉ GLOBAL
            ========================================= */}
        <footer className="w-full bg-blue-900 text-white pt-24 pb-8 mt-20 shadow-inner flex flex-col justify-end">

          {/* ==============================================
              TOPO DO FOOTER (Empilha no Mobile, Lado a lado no Desktop)
              ============================================== */}
          <div className="max-w-6xl mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">

            {/* LADO ESQUERDO: Texto Oficial */}
            <div className="max-w-lg">
              <p className="font-bold text-lg leading-relaxed">
                Este é o site oficial das Festas de Santa Luzia de Moreira de Cónegos.
                <br className="hidden md:block" />
                <span className="md:mt-0 mt-2 block">Junta-te a nós e celebra a tradição, a cultura e a devoção nesta festa única!</span>
              </p>
            </div>

            {/* LADO DIREITO: Contactos e Morada */}
            <div className="flex-shrink-0 flex flex-col gap-4 items-center md:items-start">
              <p className="font-bold text-md">
                Contactos:
                <br />
                {/* Email dinâmico injetado aqui com link mailto ativo */}
                <a href={`mailto:${emailContacto}`} className="font-normal hover:text-pink-300 transition-colors">
                  {emailContacto}
                </a>
              </p>
              <p className="font-bold text-md">
                Morada:
                <br />
                <span className="font-normal">Rua do Infantario nº8, 4815-309 Moreira de Cónegos</span>
              </p>

              {/* Linha das Redes Sociais */}
              <div className="flex gap-3 mt-2 justify-center md:justify-start w-full">
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
          <div className="max-w-6xl mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row justify-between items-center md:items-end mt-12 gap-8 text-center md:text-left">

            {/* ESQUERDA: Logo + Informação Legal */}
            <div className="flex flex-col gap-3 items-center md:items-start">

              {/* 1. Logo por cima */}
              <div className="mb-2 bg-white border border-transparent rounded-lg hover:bg-gray-100 text-blue-900 shadow-sm transition cursor-pointer inline-block">
                <Logo />
              </div>

              {/* 2. Linha Centrada Horizontalmente: Copyright + Privacidade + Termos */}
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm">
                <span className="font-bold">© 2026 Festa de Santa Luzia</span>
                <div className="flex gap-4 mt-2 md:mt-0">
                  <Link href="/privacidade" className="hover:text-pink-300 transition-colors">Privacidade</Link>
                  <span className="md:hidden text-white/30">|</span>
                  <Link href="/termos" className="hover:text-pink-300 transition-colors">Termos</Link>
                </div>
              </div>

              {/* 3. Direitos reservados por baixo */}
              <div className="text-xs text-blue-200 mt-2 md:mt-0">
                Todos os direitos reservados
              </div>
            </div>

            {/* DIREITA: Botões Institucionais */}
            <div className="flex gap-6 items-center justify-center">
              <Link href="https://jfmoreiradeconegos.pt" className="bg-transparent border-transparent hover:bg-white/10 rounded-lg p-2 transition cursor-pointer">
                <Image src="/moreiradeconegos.png" alt="Junta de Freguesia de Moreira de Cónegos" width={100} height={30} className="object-contain" />
              </Link>
              <Link href="https://www.cm-guimaraes.pt" className="bg-transparent border-transparent hover:bg-white/10 rounded-lg p-2 transition cursor-pointer">
                <Image src="/guimaraeslogo.png" alt="Câmara Municipal de Guimarães" width={100} height={30} className="object-contain" />
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}