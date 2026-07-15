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

    // 4. Tratar o erro 404
    // Se o visitante escrever um URL que não existe (ex: /como-ajudar/bananas)
    // O json.data[0] vai estar vazio (undefined)
    if (!pagina) {
        return (
            <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white space-y-6">
                <h1 className="text-5xl font-bold text-slate-500">404</h1>
                <p className="text-xl">A página "{slug}" não existe.</p>
                <Link href="/como-ajudar" className="bg-blue-500 px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition">
                    Voltar aos contactos
                </Link>
            </main>
        );
    }

    // 5. O Ecrã Real: Desenhar a página com os dados que vieram do Drupal
    return (
        <main className="min-h-screen bg-slate-900 text-white py-16 px-8">
            <div className="max-w-4xl mx-auto bg-slate-800 p-10 rounded-2xl shadow-xl border border-slate-700">
                
                {/* Botão simples para voltar atrás */}
                <Link href="/como-ajudar/homepage" className="text-blue-400 hover:text-blue-300 font-bold mb-8 inline-block transition">
                    &larr; Voltar
                </Link>

                {/* Título dinâmico */}
                <h1 className="text-4xl font-bold mb-8 text-white">
                    {pagina.attributes.title}
                </h1>
                
                {/* Texto dinâmico limpo pelo parser */}
                <div className="text-lg text-slate-300 space-y-4">
                    {pagina.attributes.body ? parse(pagina.attributes.body.processed) : 'Nenhum detalhe disponível ainda.'}
                </div>

            </div>
        </main>
    );
}