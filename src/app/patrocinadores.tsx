import Image from 'next/image';
import Link from 'next/link';

// Tipagem para os dados do Drupal
type Patrocinador = {
    id: string;
    attributes: {
        title: string; 

        field_link?: {
            uri: string;
            title?: string;
        };
    };
    relationships?: {
        field_imagem?: { 
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

export default async function Patrocinadores() {
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
    
    const res = await fetch(`${baseUrl}/jsonapi/node/patrocinadores?include=field_imagem&sort=created`, {
        cache: 'no-store'
    });

    // Se a API falhar, não escondemos a secção. 
    // Assumimos que não há dados e mostramos a caixa de apelo.
    let patrocinadores: Patrocinador[] = [];
    let ficheirosIncluidos: ImagemAtributos[] = [];

    if (res.ok) {
        const json = await res.json();
        patrocinadores = json.data || [];
        ficheirosIncluidos = json.included || [];
    }

    return (
        <div className="w-full bg-white border-y border-gray-200 mt-4 py-16 shadow-sm">
            <div className="max-w-6xl mx-auto px-8">
                
               <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Patrocinadores
                        </h2>
                        <div className="w-24 h-1 bg-pink-500 rounded-full"></div>
                    </div>
                </div>

                {patrocinadores.length === 0 ? (
                    
                    // ESTADO VAZIO: O APELO PARA NOVOS PATROCINADORES
                    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-10 md:p-16 text-center shadow-lg shadow-gray-200/50 max-w-3xl mx-auto">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Seja um Patrocinador!</h3>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
                            Festa de Santa Luzia é feita pela comunidade e para a comunidade. Associe a sua empresa às nossas raízes, ganhe visibilidade e ajude-nos a criar um evento inesquecível. Sem o apoio do comércio local, nada disto seria possível!
                        </p>
                        <Link 
                            href="/como-ajudar/patrocinios" 
                            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                        >
                            Quero ser Patrocinador
                        </Link>
                    </div>

                ) : (

                    // ESTADO COM DADOS: LISTA DE LOGÓTIPOS
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                        {patrocinadores.map((patrocinador) => {
                            const imagemId = patrocinador.relationships?.field_imagem?.data?.id;
                            const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                            const caminhoRelativo = ficheiroImagem?.attributes?.uri?.url;
                            
                            let urlImagem = null;
                            if (caminhoRelativo) {
                                urlImagem = caminhoRelativo.startsWith('http') 
                                    ? caminhoRelativo 
                                    : `${baseUrl}${caminhoRelativo}`;
                            }

                            if (!urlImagem) return null;

                            // Se o patrocinador não tiver link no Drupal, usamos '#' como fallback
                            const urlDestino = patrocinador.attributes.field_link?.uri || '#';

                            return (
                                <Link
                                    href={urlDestino}
                                    key={patrocinador.id} 
                                    target="_blank" // Abre num novo separador
                                    rel="noopener noreferrer" // Segurança extra ao abrir links externos
                                    className="relative w-32 h-20 md:w-48 md:h-28 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 block"
                                >
                                    <Image
                                        src={urlImagem}
                                        alt={patrocinador.attributes.title} 
                                        fill
                                        className="object-contain" 
                                    />
                                </Link>
                            );
                        })}
                    </div>

                )}

            </div>
        </div>
    );
}