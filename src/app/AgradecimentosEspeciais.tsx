import Image from 'next/image';
import Link from 'next/link';

// Tipagem para os dados do Drupal (Atualizada para campos de Link)
type Agradecimento = {
    id: string;
    attributes: {
        title: string; 
        // O campo de link do Drupal vem como um objeto, não como uma simples string
        field_link?: {
            uri: string;
            title?: string;
        } | null;
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

export default async function Agradecimentos() {
    // 1. Limpa possíveis barras no final do URL de forma segura
    const rawBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
    const baseUrl = rawBaseUrl.replace(/\/$/, '');
    
    // NOTA: Confirma no Drupal (Structure > Content types) se o machine name é mesmo 'agradecimentos'
    const urlFetch = `${baseUrl}/jsonapi/node/agradecimentos?include=field_imagem&sort=created`;

    // 2. Escudo Try/Catch: Se o servidor falhar, esconde apenas a secção em vez de rebentar o site
    try {
        const res = await fetch(urlFetch, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`Aviso: Falha ao carregar Agradecimentos (Status ${res.status}) em ${urlFetch}`);
            return null;
        }

        const json = await res.json();
        const agradecimentos: Agradecimento[] = json?.data || [];
        const ficheirosIncluidos: ImagemAtributos[] = json?.included || [];

        if (agradecimentos.length === 0) {
            return null;
        }

        return (
            <section className="w-full bg-white border-y border-gray-200 mt-4 py-16 shadow-sm mb-10">
                <div className="max-w-6xl mx-auto px-8">

                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="flex flex-col items-center mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                                Agradecimentos Especiais
                            </h2>
                            <div className="w-24 h-1 bg-pink-500 rounded-full"></div>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                        
                        {agradecimentos.map((agradecimento) => {
                            const imagemId = agradecimento.relationships?.field_imagem?.data?.id;
                            const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                            const caminhoRelativo = ficheiroImagem?.attributes?.uri?.url;
                            
                            let urlImagem = null;
                            if (caminhoRelativo) {
                                urlImagem = caminhoRelativo.startsWith('http') 
                                    ? caminhoRelativo 
                                    : `${baseUrl}${caminhoRelativo}`;
                            }

                            if (!urlImagem) return null;
                            
                            // 3. Limpeza segura do campo Link do Drupal (remove prefixos internal: ou route:)
                            const rawUri = agradecimento.attributes.field_link?.uri;
                            let urlDestino = '#';
                            
                            if (rawUri) {
                                urlDestino = rawUri
                                    .replace(/^internal:/, '')
                                    .replace(/^entity:/, '/');
                            }

                            const temLinkValido = urlDestino !== '#' && urlDestino !== '' && !urlDestino.startsWith('route:');

                            const classeCartao = "relative w-32 h-20 md:w-48 md:h-28 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 block";

                            // Se não tiver link preenchido no Drupal, mostra apenas a imagem sem ser clicável
                            if (!temLinkValido) {
                                return (
                                    <div key={agradecimento.id} className={classeCartao} title={agradecimento.attributes.title}>
                                        <Image
                                            src={urlImagem}
                                            alt={agradecimento.attributes.title || 'Logótipo de agradecimento'} 
                                            fill
                                            sizes="(max-width: 768px) 128px, 192px"
                                            className="object-contain" 
                                        />
                                    </div>
                                );
                            }

                            return (
                                <Link 
                                    href={urlDestino}
                                    key={agradecimento.id} 
                                    target={urlDestino.startsWith('http') ? "_blank" : undefined}
                                    rel={urlDestino.startsWith('http') ? "noopener noreferrer" : undefined}
                                    className={classeCartao}
                                    title={agradecimento.attributes.title}
                                >
                                    <Image
                                        src={urlImagem}
                                        alt={agradecimento.attributes.title || 'Logótipo de agradecimento'} 
                                        fill
                                        sizes="(max-width: 768px) 128px, 192px"
                                        className="object-contain" 
                                    />
                                </Link>
                            );
                        })}

                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error("🛑 ERRO NO FETCH DE AGRADECIMENTOS:", error);
        return null;
    }
}