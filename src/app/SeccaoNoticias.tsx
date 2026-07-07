import Link from 'next/link';
import Image from 'next/image';

type Noticia = {
    id: string;
    attributes: {
        title: string;
        created: string; // Data de criação
    };
    relationships?: {
        field_imagem_post?: {
            data?: {
                id: string;
            } | null;
        };
    };
};

type ImagemAtributos = {
    id: string;
    attributes: {
        uri: {
            url: string;
        };
    };
};

export default async function SecaoNoticias() {
    const res = await fetch('http://festa-santa-luzia-api.ddev.site/jsonapi/node/post?sort=-created&page[limit]=2&include=field_imagem_post', {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div className="text-center text-white">Não foi possível carregar as notícias.</div>;
    }

    const json = await res.json();
    const ultimasNoticias: Noticia[] = json.data;
    const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

    return (
        <section className="bg-gray-200 py-16">
            <div className="max-w-6xl mx-auto px-8">
                <h2 className="text-4xl font-bold mb-10 text-gray-900 text-center">Últimas Notícias</h2>

                {/* Removido o "flex justify-between" que estava a conflitar com o "grid" */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {ultimasNoticias.map((noticia) => {

                        const imagemId = noticia.relationships?.field_imagem_post?.data?.id;
                        const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                        const urlImagem = ficheiroImagem?.attributes?.uri?.url
                            ? `${process.env.NEXT_PUBLIC_DRUPAL_URL}${ficheiroImagem.attributes.uri.url}`
                            : null;

                        return (
                            <div key={noticia.id} className="relative overflow-hidden bg-white p-8 rounded-xl shadow-lg border border-gray-100">

                                {/* A IMAGEM VERDADEIRA! Se houver urlImagem, desenha a foto no canto top-0 right-0 */}
                                {urlImagem && (
                                    <div className="absolute top-0 right-0 bottom-0 w-44 h-44 bg-gray-100">
                                        <Image
                                            src={urlImagem}
                                            alt={noticia.attributes.title}
                                            fill
                                            className="object-cover rounded-bl-2xl shadow-sm"
                                        />
                                    </div>
                                )}

                                {/* ADICIONADO: pr-32 para que o título não fique escondido debaixo da imagem */}
                                <h3 className="text-2xl font-bold mb-4 text-gray-800 pr-32">
                                    {noticia.attributes.title}
                                </h3>

                                <p className="text-gray-500 text-sm mb-6">
                                    {new Date(noticia.attributes.created).toLocaleDateString('pt-PT')}
                                </p>

                                <Link
                                    href={`/noticias/${noticia.id}`}
                                    className="text-blue-600 font-bold hover:text-blue-800 transition relative z-10"
                                >
                                    Ler mais &rarr;
                                </Link>

                            </div>
                        )
                    })}
                </div>

                <div className="flex justify-center">
                    <Link
                        href="/noticias"
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition"
                    >
                        Ver Todas
                    </Link>
                </div>
            </div>
        </section>
    );
}