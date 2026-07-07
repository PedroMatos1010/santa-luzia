import parse from 'html-react-parser';
import Image from 'next/image';

// 1. Tipos atualizados para refletir a estrutura relacional do JSON:API
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
    // 2. Fetch COM o include para trazer os ficheiros das imagens
    const res = await fetch('http://festa-santa-luzia-api.ddev.site/jsonapi/node/post?include=field_imagem_post', {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div>Erro a carregar o site. Tente novamente mais tarde.</div>;
    }

    const json = await res.json();
    const noticias: Noticia[] = json.data;

    // Guardamos a lista de ficheiros extra que o Drupal enviou no fundo do pacote
    const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

    return (
        <main className="bg-gray-900 min-h-screen">
            <h1 className="text-5xl font-bold mb-8 text-white text-center pt-10">Notícias</h1>
            <div className="px-8 max-w-6xl mx-auto flex flex-wrap gap-8 justify-center">

                {/* =================== QUADRADO DE NOTÍCIA ===================*/}
                <div className="px-8 max-w-6xl mx-auto mt-10 flex flex-wrap gap-8 justify-center">

                    {noticias.map((noticia) => {
                        // 3. LÓGICA DE CRUZAMENTO DE DADOS
                        // Descobre o ID da imagem na notícia e procura o URL correspondente nos ficheiros incluídos
                        const imagemId = noticia.relationships?.field_imagem_post?.data?.id;
                        const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                        const caminhoRelativo = ficheiroImagem?.attributes?.uri?.url;

                        // LÓGICA BLINDADA: Usa o env.local e verifica se o URL já tem domínio
                        const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'http://festa-santa-luzia-api.ddev.site';
                        let urlCompleto = null;
                        if (caminhoRelativo) {
                            urlCompleto = caminhoRelativo.startsWith('http') 
                                ? caminhoRelativo 
                                : `${baseUrl}${caminhoRelativo}`;
                        }

                        return (
                            <div key={noticia.id} className="w-80 bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 group cursor-pointer transition-all hover:scale-105">

                                {/* IMAGEM COM NEXT/IMAGE */}
                                {/* Nota: A div tem de ter a classe 'relative' para o Image com 'fill' funcionar bem */}
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

                                {/* PARTE DE BAIXO: Conteúdo da Notícia */}
                                <div className="p-6 space-y-3">

                                    {/* DATA */}
                                    <div className="text-xs text-pink-400 font-bold">
                                        {new Date(noticia.attributes.created).toLocaleDateString('pt-PT')}
                                    </div>

                                    {/* TÍTULO */}
                                    <div className="space-y-2">
                                        <h2 className="text-xl font-bold text-white line-clamp-2">
                                            {noticia.attributes.title}
                                        </h2>
                                    </div>

                                    {/* CORPO DA NOTÍCIA */}
                                    <div className="text-sm text-gray-400 line-clamp-3 pt-2">
                                        {noticia.attributes.body ? parse(noticia.attributes.body.processed) : 'Sem conteúdo'}
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}