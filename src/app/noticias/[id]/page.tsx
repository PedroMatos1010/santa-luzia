import Link from 'next/link';
import parse from 'html-react-parser'; // Adicionei isto caso tenhas tags HTML no texto

export default async function DetalheNoticia({ params }: { params: Promise<{ id: string }> }) {
    
    const resolvedParams = await params;
    const noticiaId = resolvedParams.id;
    
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL;
    
    // MUDANÇA 1: Adicionámos o ?include=uid para pedir os dados do autor ao Drupal
    const urlFetch = `${baseUrl}/jsonapi/node/post/${noticiaId}?include=uid`;

    const res = await fetch(urlFetch, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-8 text-center">
                <h2 className="text-3xl font-bold mb-6 text-red-500">Erro {res.status} ao carregar a Notícia</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg text-left inline-block mb-8 border border-gray-700">
                    <p className="text-gray-400 mb-2">O Next.js tentou aceder a este URL:</p>
                    <code className="text-yellow-400 break-all text-sm block mb-4">
                        {urlFetch}
                    </code>
                </div>

                <Link href="/noticias" className="text-blue-400 hover:text-blue-300 transition font-bold text-lg">
                    &larr; Voltar à página de notícias
                </Link>
            </div>
        );
    }

    const json = await res.json();
    const noticia = json.data;
    const ficheirosIncluidos = json.included || [];

    // MUDANÇA 2: Procurar o autor nos ficheiros incluídos
    const autorId = noticia.relationships?.uid?.data?.id;
    const autorObj = ficheirosIncluidos.find((item: any) => item.id === autorId && item.type.startsWith('user'));
    
    // No Drupal, o nome de utilizador costuma estar no "name" ou "display_name"
    const nomeAutor = autorObj?.attributes?.display_name || autorObj?.attributes?.name || 'Comissão de Festas';

    return (
        <main className="bg-gray-100 min-h-screen pt-20 pb-16">
            <div className="max-w-4xl mx-auto px-8 bg-white p-12 rounded-xl shadow-xl">
                
                <Link href="/noticias" className="text-blue-600 font-bold hover:underline mb-8 inline-block">
                    &larr; Voltar às Notícias
                </Link>

                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    {noticia.attributes.title}
                </h1>
                
                {/* MUDANÇA 3: Mostrar o Autor junto da data */}
                <p className="text-gray-500 mb-10 border-b pb-6 flex items-center gap-2">
                    <span>Publicado a: {new Date(noticia.attributes.created).toLocaleDateString('pt-PT')}</span>
                    <span className="text-gray-300">|</span>
                    <span className="font-semibold text-gray-700">Por {nomeAutor}</span>
                </p>

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