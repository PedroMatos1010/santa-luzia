import parse from 'html-react-parser';
import Link from 'next/link';

// 1. O nosso contrato TypeScript para uma "Página Básica" do Drupal
type PaginaDrupal = {
    id: string;
    attributes: {
        title: string;
       field_body: {
            processed: string;
        };
    };
};

// Evita crash de build estático
export const dynamic = "force-dynamic";

export default async function DetalheAjudar({ params }: { params: Promise<{ slug: string }> }) {
    
    // Resolve a promise para extrair o slug de forma segura
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    // 2. URL Dinâmico (A nossa receita de sucesso!)
    const rawBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
    const baseUrl = rawBaseUrl.replace(/\/$/, '');
    const urlFetch = `${baseUrl}/jsonapi/node/page?filter[field_slug]=${slug}`;

    console.log("A consultar o Drupal com o slug:", slug);

    // 3. O Escudo de Proteção (Try/Catch)
    try {
        const res = await fetch(urlFetch, { cache: 'no-store' });
        
        if (!res.ok) {
            return (
                <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-6 px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-red-500">Erro de Comunicação</h1>
                    <p className="text-lg text-gray-600">O servidor devolveu o erro {res.status}.</p>
                    <code className="bg-gray-200 p-2 rounded text-sm break-all text-gray-500 max-w-xl">{urlFetch}</code>
                    <Link href="/como-ajudar/homepage" className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 shadow-md transition-all">
                        Voltar para Como Ajudar
                    </Link>
                </main>
            );
        }

        const json = await res.json();
        
        // 4. Extração Segura: Só tenta ir ao [0] se data existir e tiver itens!
        const pagina: PaginaDrupal = json?.data?.[0];

        // 5. Tratar o erro 404 (Se escreverem /como-ajudar/bananas)
        if (!pagina) {
            return (
                <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-6 px-8 text-center">
                    <h1 className="text-7xl font-extrabold text-gray-200">404</h1>
                    <h2 className="text-2xl font-bold text-gray-900">Página não encontrada</h2>
                    <p className="text-lg text-gray-600">A página "{slug}" que procuras não existe ou foi movida.</p>
                    <Link href="/como-ajudar/homepage" className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
                        Voltar para Como Ajudar
                    </Link>
                </main>
            );
        }

        // 6. O Ecrã Real: Desenhar a página com os dados que vieram do Drupal
        return (
            <main className="min-h-screen bg-gray-50 py-20 px-8">
                <div className="max-w-4xl mx-auto bg-white p-10 md:p-14 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                    
                    {/* Botão para voltar atrás */}
                    <Link href="/como-ajudar/homepage" className="text-blue-600 hover:text-blue-800 font-bold mb-10 inline-block transition flex items-center gap-2 w-max">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Voltar
                    </Link>

                    {/* Título dinâmico */}
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-gray-900 tracking-tight">
                        {pagina.attributes.title}
                    </h1>
                    
                    {/* 
                        Adicionei aqui o 'prose max-w-none' (do Tailwind Typography) 
                        para que o HTML que vem do Drupal (negritos, listas, links) 
                        fique formatado automaticamente de forma bonita! 
                    */}
                    <div className="text-lg text-gray-700 space-y-6 leading-relaxed prose max-w-none">
                        {pagina.attributes.field_body?.processed ? parse(pagina.attributes.field_body.processed) : (
                            <p className="italic text-gray-500">Nenhum detalhe disponível ainda.</p>
                        )}
                    </div>

                </div>
            </main>
        );
        
    } catch (error: any) {
        // Alarme de Rede
        console.error("============= ALARME =============");
        console.error(`Erro ao consultar a página /como-ajudar/${slug}:`, error);
        console.error("==================================");
        
        return (
            <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-6 px-8 text-center">
                <h1 className="text-4xl font-extrabold text-red-500">Falha de Ligação</h1>
                <p className="text-lg text-gray-600">Não foi possível contactar a base de dados.</p>
                <Link href="/como-ajudar/homepage" className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 shadow-md transition-all">
                    Voltar para Como Ajudar
                </Link>
            </main>
        );
    }
}