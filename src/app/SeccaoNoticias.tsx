import Link from 'next/link';
import Image from 'next/image';

type Noticia = {
    id: string;
    attributes: {
        title: string;
        created: string;
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

export default async function SeccaoNoticias() {
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL;
    const res = await fetch(`${baseUrl}/jsonapi/node/post?sort=-created&page[limit]=2&include=field_imagem_post`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div className="text-center text-white py-8 bg-gray-900">Não foi possível carregar as notícias.</div>;
    }

    const json = await res.json();
    const ultimasNoticias: Noticia[] = json.data || [];
    const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

    return (
        <section className="bg-slate-500 py-24 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-pink-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-5xl font-extrabold text-white tracking-tight mb-4">
                        Últimas Notícias
                    </h2>
                    <div className="w-24 h-1 bg-pink-500 rounded-full"></div>
                </div>

                {ultimasNoticias.length === 0 ? (
                    <div className="bg-slate-600/50 border border-slate-400/30 rounded-3xl p-10 text-center max-w-xl mx-auto mb-16 shadow-xl backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                        </svg>
                        <h3 className="text-2xl font-bold text-white mb-3">Ainda não há notícias</h3>
                        <p className="text-slate-200">A comissão está a preparar novidades. Volta em breve para saberes tudo em primeira mão!</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-wrap justify-center gap-8 mb-16">
                            {ultimasNoticias.map((noticia) => {
                                const imagemId = noticia.relationships?.field_imagem_post?.data?.id;
                                const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                                const caminhoRelativo = ficheiroImagem?.attributes?.uri?.url;

                                let urlImagem = null;
                                if (caminhoRelativo) {
                                    urlImagem = caminhoRelativo.startsWith('http')
                                        ? caminhoRelativo
                                        : `${baseUrl}${caminhoRelativo}`;
                                }

                                return (
                                    <Link
                                        key={noticia.id}
                                        href={`/noticias/${noticia.id}`}
                                        className="group flex flex-col bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-pink-500/50 hover:-translate-y-2 transition-all duration-300 w-full max-w-sm"
                                    >
                                        <div className="relative w-full h-52 overflow-hidden bg-gray-900">
                                            {urlImagem ? (
                                                <Image
                                                    src={urlImagem}
                                                    alt={noticia.attributes.title}
                                                    fill
                                                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-700 font-bold text-sm uppercase tracking-widest">
                                                    Sem Imagem
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-800 to-transparent pointer-events-none"></div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1 relative mt-1">
                                            <div className="absolute -top-4 left-6 bg-pink-600 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-md shadow-lg">
                                                {new Date(noticia.attributes.created).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mt-3 mb-5 group-hover:text-pink-400 transition-colors duration-300 line-clamp-2">
                                                {noticia.attributes.title}
                                            </h3>
                                            <div className="mt-auto inline-flex items-center text-xs font-bold tracking-widest text-gray-400 uppercase group-hover:text-white transition-colors duration-300">
                                                Ler Notícia
                                                <span className="ml-3 w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center group-hover:bg-pink-600 transition-colors duration-300 transform group-hover:translate-x-2">
                                                    &rarr;
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex justify-center">
                            <Link
                                href="/noticias"
                                className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-pink-600 rounded-full overflow-hidden shadow-[0_0_15px_rgba(219,39,119,0.3)] hover:shadow-[0_0_25px_rgba(219,39,119,0.5)] hover:bg-pink-500 transition-all duration-300 cursor-pointer"
                            >
                                Ver Todas as Notícias
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}