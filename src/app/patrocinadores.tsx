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
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'http://festa-santa-luzia-api.ddev.site';
    
    const res = await fetch(`${baseUrl}/jsonapi/node/patrocinadores?include=field_imagem&sort=created`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return null;
    }

    const json = await res.json();
    const patrocinadores: Patrocinador[] = json.data;
    const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

    if (!patrocinadores || patrocinadores.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white border-y border-gray-200 mt-4 py-16 shadow-sm">
            <div className="max-w-6xl mx-auto px-8">
                
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
                            <Link vv
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
            </div>
        </div>
    );
}