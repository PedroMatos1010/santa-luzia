import Image from 'next/image';
import Link from 'next/link';

// Tipo estrito (sem 'any') para passar no build de produção do servidor
type CampoTextoDrupal = string | { value?: string; processed?: string } | null | undefined;

type Agradecimento = {
    id: string;
    attributes: {
        title: string; 
        field_motivo?: CampoTextoDrupal;
        field_descricao?: CampoTextoDrupal;
        field_body?: CampoTextoDrupal;
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

// Função auxiliar sem 'any' para o ESLint do servidor não bloquear o deploy
function extrairTexto(campo: CampoTextoDrupal): string | null {
    if (!campo) return null;
    if (typeof campo === 'string') return campo;
    if (typeof campo === 'object') return campo.processed || campo.value || null;
    return null;
}

export default async function Agradecimentos() {
    // 1. Limpa possíveis barras no final do URL
    const rawBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
    const baseUrl = rawBaseUrl.replace(/\/$/, '');
    
    const urlComImagem = `${baseUrl}/jsonapi/node/agradecimentos?include=field_imagem&sort=created`;
    const urlSimples = `${baseUrl}/jsonapi/node/agradecimentos?sort=created`;

    try {
        let res = await fetch(urlComImagem, { cache: 'no-store' });

        if (res.status === 400) {
            res = await fetch(urlSimples, { cache: 'no-store' });
        }

        if (!res.ok) {
            return null;
        }

        const json = await res.json();
        const agradecimentos: Agradecimento[] = json?.data || [];
        const ficheirosIncluidos: ImagemAtributos[] = json?.included || [];

        return (
            <section className="w-full bg-white border-y border-gray-200 mt-4 py-16 shadow-sm mb-10">
                <div className="max-w-6xl mx-auto px-8">

                    <div className="max-w-6xl mx-auto relative z-10">
                        <div className="flex flex-col items-center mb-12 text-center">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                                Agradecimentos Especiais
                            </h2>
                            <div className="w-24 h-1 bg-pink-500 rounded-full mb-4"></div>
                            <p className="text-gray-500 max-w-2xl text-lg">
                                O nosso sincero obrigado a todos os que contribuíram a título individual para tornar esta festa possível.
                            </p>
                        </div>
                    </div>
                    
                    {agradecimentos.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200 max-w-xl mx-auto">
                            <p className="text-gray-500 italic">
                                Lista de agradecimentos em atualização.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                            
                            {agradecimentos.map((agradecimento) => {
                                const nome = agradecimento.attributes.title;
                                
                                const motivo = extrairTexto(agradecimento.attributes.field_motivo) 
                                            || extrairTexto(agradecimento.attributes.field_descricao)
                                            || extrairTexto(agradecimento.attributes.field_body);

                                const imagemId = agradecimento.relationships?.field_imagem?.data?.id;
                                const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                                const caminhoRelativo = ficheiroImagem?.attributes?.uri?.url;
                                
                                let urlImagem = null;
                                if (caminhoRelativo) {
                                    urlImagem = caminhoRelativo.startsWith('http') 
                                        ? caminhoRelativo 
                                        : `${baseUrl}${caminhoRelativo}`;
                                }
                                
                                const rawUri = agradecimento.attributes.field_link?.uri;
                                let urlDestino = '#';
                                if (rawUri) {
                                    urlDestino = rawUri
                                        .replace(/^internal:/, '')
                                        .replace(/^entity:/, '/');
                                }
                                const temLinkValido = urlDestino !== '#' && urlDestino !== '' && !urlDestino.startsWith('route:');

                                const inicial = nome ? nome.charAt(0).toUpperCase() : '★';

                                const conteudoCartao = (
                                    <div className="w-full max-w-xs bg-gray-50 hover:bg-white border border-gray-200 hover:border-pink-300 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group h-full justify-between">
                                        
                                        {/* PARTE DE CIMA: Imagem ou Inicial */}
                                        <div className="mb-4 flex items-center justify-center w-full">
                                            {urlImagem ? (
                                                <div className="relative w-32 h-24 grayscale group-hover:grayscale-0 opacity-85 group-hover:opacity-100 transition-all duration-500">
                                                    <Image
                                                        src={urlImagem}
                                                        alt={nome} 
                                                        fill
                                                        sizes="128px"
                                                        className="object-contain" 
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 font-extrabold flex items-center justify-center text-2xl group-hover:bg-pink-600 group-hover:text-white transition-colors shadow-inner">
                                                    {inicial}
                                                </div>
                                            )}
                                        </div>

                                        {/* PARTE DE BAIXO: Nome da Pessoa e o Motivo */}
                                        <div className="flex flex-col items-center">
                                            <h3 className="font-extrabold text-gray-900 group-hover:text-pink-600 text-lg transition-colors">
                                                {nome}
                                            </h3>
                                            
                                            {motivo && (
                                                <p className="text-sm text-gray-500 mt-1.5 leading-snug italic">
                                                    &ldquo;{motivo}&rdquo;
                                                </p>
                                            )}
                                        </div>

                                    </div>
                                );

                                if (temLinkValido) {
                                    return (
                                        <Link 
                                            href={urlDestino}
                                            key={agradecimento.id} 
                                            target={urlDestino.startsWith('http') ? "_blank" : undefined}
                                            rel={urlDestino.startsWith('http') ? "noopener noreferrer" : undefined}
                                            title={nome}
                                            className="w-full flex justify-center h-full"
                                        >
                                            {conteudoCartao}
                                        </Link>
                                    );
                                }

                                return (
                                    <div key={agradecimento.id} title={nome} className="w-full flex justify-center h-full">
                                        {conteudoCartao}
                                    </div>
                                );
                            })}

                        </div>
                    )}
                </div>
            </section>
        );
    } catch {
        return null;
    }
}