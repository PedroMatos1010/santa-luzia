import Link from 'next/link';

// Atualização: Nas versões modernas do Next.js, o params tem de ser tratado como Promise
export default async function DetalheNoticia({ params }: { params: Promise<{ id: string }> }) {
    
    // 1. Esperar que o Next.js leia o ID do URL com sucesso
    const resolvedParams = await params;
    const noticiaId = resolvedParams.id;
    
    // 2. Construir o URL exato
    const urlFetch = `https://admin.santaluziamoreira.pt/jsonapi/node/post/${noticiaId}`;

    // 3. Fazer o pedido ao Drupal
    const res = await fetch(urlFetch, {
        cache: 'no-store'
    });

    // 4. O SISTEMA DE DEBUG VISUAL (Mostra o erro no ecrã em vez de esconder)
    if (!res.ok) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-8 text-center">
                <h2 className="text-3xl font-bold mb-6 text-red-500">Erro {res.status} ao carregar a Notícia</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg text-left inline-block mb-8 border border-gray-700">
                    <p className="text-gray-400 mb-2">O Next.js tentou aceder a este URL:</p>
                    <code className="text-yellow-400 break-all text-sm block mb-4">
                        {urlFetch}
                    </code>
                    <p className="text-gray-400 mb-2">Resposta do Drupal:</p>
                    <code className="text-red-400 block font-bold">
                        {res.statusText}
                    </code>
                </div>

                <Link href="/" className="text-blue-400 hover:text-blue-300 transition font-bold text-lg">
                    &larr; Voltar à página inicial
                </Link>
            </div>
        );
    }

    const json = await res.json();
    const noticia = json.data;

    // 5. SE TUDO CORRER BEM, DESENHA A NOTÍCIA
    return (
        <main className="bg-gray-100 min-h-screen pt-20 pb-16">
            <div className="max-w-4xl mx-auto px-8 bg-white p-12 rounded-xl shadow-xl">
                
                <Link href="/" className="text-blue-600 font-bold hover:underline mb-8 inline-block">
                    &larr; Voltar à página inicial
                </Link>

                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    {noticia.attributes.title}
                </h1>
                
                <p className="text-gray-500 mb-10 border-b pb-6">
                    Publicado a: {new Date(noticia.attributes.created).toLocaleDateString('pt-PT')}
                </p>

                {/* O CONTEÚDO REAL DA NOTÍCIA VEM AQUI */}
                {noticia.attributes.body?.processed ? (
                    <div 
                        className="text-gray-700 text-lg leading-relaxed prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: noticia.attributes.body.processed }} 
                    />
                ) : (
                    <div className="text-gray-700 text-lg leading-relaxed">
                        <p className="italic text-gray-400">Esta notícia não tem corpo de texto.</p>
                    </div>
                )}
                
            </div>
        </main>
    );
}