import Image from 'next/image';
import Link from 'next/link';

// Tipagem para os dados do Drupal (Atualizada para campos de Link)
type Parceiro = {
    id: string;
    attributes: {
        title: string; 
        // O campo de link do Drupal vem como um objeto, não como uma simples string
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

export default async function Parceiros() {
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
    
    const res = await fetch(`${baseUrl}/jsonapi/node/parceiros?include=field_imagem&sort=created`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return null;
    }

    const json = await res.json();
    const parceiros: Parceiro[] = json.data;
    const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

    if (!parceiros || parceiros.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white border-y border-gray-200 mt-4 py-16 shadow-sm mb-10">
            <div className="max-w-6xl mx-auto px-8">
                
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                    
                    {parceiros.map((parceiro) => {
                        const imagemId = parceiro.relationships?.field_imagem?.data?.id;
                        const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                        const caminhoRelativo = ficheiroImagem?.attributes?.uri?.url;
                        
                        let urlImagem = null;
                        if (caminhoRelativo) {
                            urlImagem = caminhoRelativo.startsWith('http') 
                                ? caminhoRelativo 
                                : `${baseUrl}${caminhoRelativo}`;
                        }

                        if (!urlImagem) return null;
                        
                        // AQUI ESTÁ A MAGIA: Agora acedemos ao .uri dentro do field_link
                        const urlDestino = parceiro.attributes.field_link?.uri || '#';

                        return (
                            <Link 
                                href={urlDestino}
                                key={parceiro.id} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="relative w-32 h-20 md:w-48 md:h-28 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 block"
                            >
                                <Image
                                    src={urlImagem}
                                    alt={parceiro.attributes.title} 
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