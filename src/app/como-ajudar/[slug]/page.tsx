import parse from 'html-react-parser';
import Link from 'next/link';

// 1. O nosso contrato TypeScript para uma "Página Básica" do Drupal
type PaginaDrupal = {
    id: string;
    attributes: {
        title: string;
        body: {
            processed: string;
        };
    };
};

// Nota o "await" antes do params!
export default async function DetalheAjudar({ params }: { params: Promise<{ slug: string }> }) {
    
    // Resolve a promise para extrair o slug de forma segura
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    // Isto é só para tu teres a certeza do que está a ser enviado para o Drupal.
    // Confirma no terminal se imprime "voluntariado" certinho.
    console.log("A consultar o DDEV com o slug:", slug);

    // 3. Fazer o pedido ao DDEV
    const res = await fetch(`https://admin.santaluziamoreira.pt/jsonapi/node/page?filter[field_slug]=${slug}`, {
        cache: 'no-store'
    });
    const json = await res.json();
    
    // Como fizemos um filtro, o JSON:API devolve sempre uma array (lista).
    // Queremos apenas o primeiro resultado dessa lista [0].
    const pagina: PaginaDrupal = json.data[0];

    // 4. Tratar o erro 404 (Tema Claro)
    // Se o visitante escrever um URL que não existe (ex: /como-ajudar/bananas)
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

    // 5. O Ecrã Real: Desenhar a página com os dados que vieram do Drupal (Tema Claro)
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
                
                {/* Texto dinâmico limpo pelo parser */}
                {/* O leading-relaxed ajuda imenso na leitura de textos longos */}
                <div className="text-lg text-gray-700 space-y-6 leading-relaxed">
                    {pagina.attributes.body ? parse(pagina.attributes.body.processed) : (
                        <p className="italic text-gray-500">Nenhum detalhe disponível ainda.</p>
                    )}
                </div>

            </div>
        </main>
    );
}