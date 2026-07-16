import parse from 'html-react-parser';
import Image from 'next/image';

type ImagemAtributos = {
    id: string;
    attributes: {
        uri: {
            url: string;
        };
    };
};

type Noticia = {
    id: string;
    attributes: {
        title: string;
        created: string;
        body: {
            summary: string;
            processed: string;
            value: string;
        };
        field_comentarios: string;
    };
    relationships?: {
        field_imagem_post?: {
            data?: {
                id: string;
            } | null;
        };
    };
};

export default async function Home() {
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL;

    try {
        const res = await fetch(`${baseUrl}/jsonapi/node/post?include=field_imagem_post`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return <div className="text-white text-center py-20 font-bold">Erro a carregar as notícias. Tente novamente mais tarde.</div>;
        }

        const json = await res.json();
        const noticias: Noticia[] = json.data || [];
        const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

        return (
            <main className="bg-gray-900 min-h-screen pb-20">
                <h1 className="text-5xl font-bold mb-8 text-white text-center pt-10">Notícias</h1>

                <div className="px-8 max-w-6xl mx-auto">
                    {noticias.length > 0 ? (
                        <div className="flex flex-wrap gap-8 justify-center mt-10">
                            {noticias.map((noticia) => {
                                const imagemId = noticia.relationships?.field_imagem_post?.data?.id;
                                const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                                const caminhoRelativo = ficheiroImagem?.attributes?.uri?.url;

                                let urlCompleto = null;
                                if (caminhoRelativo) {
                                    urlCompleto = caminhoRelativo.startsWith('http')
                                        ? caminhoRelativo
                                        : `${baseUrl}${caminhoRelativo}`;
                                }

                                return (
                                    <div key={noticia.id} className="w-80 bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 group cursor-pointer transition-all hover:scale-105">

                                        <div className="relative aspect-[16/9] w-full bg-gray-700 border-b border-gray-600 flex flex-col items-center justify-center font-bold text-gray-400 text-sm group-hover:opacity-90 transition">
                                            {urlCompleto ? (
                                                <Image
                                                    src={urlCompleto}
                                                    alt={noticia.attributes.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <span className="text-xs font-normal">Sem Imagem</span>
                                            )}
                                        </div>

                                        <div className="p-6 space-y-3">
                                            <div className="text-xs text-pink-400 font-bold">
                                                {new Date(noticia.attributes.created).toLocaleDateString('pt-PT')}
                                            </div>

                                            <div className="space-y-2">
                                                <h2 className="text-xl font-bold text-white line-clamp-2">
                                                    {noticia.attributes.title}
                                                </h2>
                                            </div>

                                            <div className="text-sm text-gray-400 line-clamp-3 pt-2">
                                                {noticia.attributes.body?.processed ? parse(noticia.attributes.body.processed) : 'Sem conteúdo'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-gray-400 text-center py-20 font-bold text-lg">
                            Sem notícias publicadas no momento.
                        </div>
                    )}
                </div>
            </main>
        );
    } catch (error) {
        console.error("Falha ao ligar ao servidor nas notícias:", error);
        return <div className="text-white text-center py-20 font-bold">Falha de ligação ao servidor. Tente novamente.</div>;
    }
}