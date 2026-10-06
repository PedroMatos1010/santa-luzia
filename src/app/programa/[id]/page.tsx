import Image from 'next/image';
import Link from 'next/link';

type EventoDetalhe = {
    id: string;
    attributes: {
        title: string;
        field_data?: string;
        field_local?: string;
        field_descricao?: {
            value: string;
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

export default async function DynamicProgramaDetalhes({ params }: { params: Promise<{ id: string }> }) {
    
    // Resolvemos a Promise ANTES de extrair o ID
    const resolvedParams = await params;
    const id = resolvedParams.id;
    
    // 1. Limpa possíveis barras no final do URL
    const rawBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
    const baseUrl = rawBaseUrl.replace(/\/$/, '');
    
    const urlFetch = `${baseUrl}/jsonapi/node/evento/${id}?include=field_imagem`;

    try {
        const res = await fetch(urlFetch, {
            cache: 'no-store'
        });

        if (!res.ok) {
            return (
                <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-6">
                    <p className="text-gray-900 font-bold text-3xl mb-2">Evento não encontrado</p>
                    <p className="text-red-500 font-semibold mb-6">Erro {res.status} retornado pelo Drupal</p>
                    <code className="bg-gray-200 p-3 rounded text-gray-600 text-sm block mb-8 max-w-xl text-center break-all">{urlFetch}</code>
                    <Link href="/programa" className="text-pink-600 font-bold hover:underline text-lg">&larr; Voltar ao Programa</Link>
                </div>
            );
        }

        const json = await res.json();
        const evento: EventoDetalhe = json.data;
        const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

        // Lógica para extrair a Imagem
        let urlImagem = null;
        const imagemId = evento.relationships?.field_imagem?.data?.id;
        if (imagemId && ficheirosIncluidos.length > 0) {
            const ficheiro = ficheirosIncluidos.find((inc) => inc.id === imagemId);
            if (ficheiro?.attributes?.uri?.url) {
                urlImagem = `${baseUrl}${ficheiro.attributes.uri.url}`;
            }
        }

        // Lógica para formatar Data e Hora
        const dataBruta = evento.attributes.field_data;
        let dataX = "Data a definir";
        let horaY = "--:--";
        if (dataBruta) {
            const dataObj = new Date(dataBruta);
            dataX = dataObj.toLocaleDateString('pt-PT', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
            horaY = dataObj.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
        }

        return (
            <main className="min-h-screen bg-gray-50 py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    
                    {/* BOTÃO VOLTAR ATRÁS */}
                    <Link 
                        href="/programa" 
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-pink-600 mb-8 transition-colors group"
                    >
                        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Voltar ao Programa
                    </Link>

                    {/* CARTÃO PRINCIPAL DE DETALHES (TEMA CLARO) */}
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                        
                        {/* ÁREA DA FOTO GIGANTE */}
                        <div className="relative w-full h-96 bg-gray-100">
                            {urlImagem ? (
                                <Image 
                                    src={urlImagem} 
                                    alt={evento.attributes.title} 
                                    fill 
                                    className="object-cover"
                                    priority // Carrega a imagem imediatamente por ser o topo da página
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">
                                    Sem Imagem Disponível
                                </div>
                            )}
                            {/* Gradiente sutil para garantir que a imagem se funde bem */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        </div>

                        {/* CONTEÚDO E INFORMAÇÕES */}
                        <div className="p-8 md:p-12 -mt-10 relative z-10 bg-white rounded-t-3xl">
                            
                            {/* DATA EXTENSA */}
                            <span className="text-pink-600 font-black tracking-widest text-sm uppercase block mb-3">
                                {dataX}
                            </span>

                            {/* TÍTULO PRINCIPAL */}
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
                                {evento.attributes.title}
                            </h1>

                            {/* ETIQUETAS RÁPIDAS (LOCAL E HORA) */}
                            <div className="flex flex-wrap gap-4 mb-10 pb-8 border-b border-gray-100">
                                <div className="bg-gray-50 text-gray-700 px-5 py-3 rounded-xl font-bold flex items-center gap-3 border border-gray-200 shadow-sm">
                                    <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    {evento.attributes.field_local || "Local a definir"}
                                </div>

                                <div className="bg-gray-50 text-gray-700 px-5 py-3 rounded-xl font-bold flex items-center gap-3 border border-gray-200 shadow-sm">
                                    <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Horário: {horaY}
                                </div>
                            </div>

                            {/* DESCRIÇÃO DETALHADA */}
                            <div className="prose prose-lg max-w-none text-gray-600">
                                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Sobre o Evento</h3>
                                {evento.attributes.field_descricao?.value ? (
                                    <div 
                                        className="text-gray-700 text-lg leading-relaxed space-y-4"
                                        dangerouslySetInnerHTML={{ __html: evento.attributes.field_descricao.value }}
                                    />
                                ) : (
                                    <p className="text-gray-400 italic text-lg">Não existem detalhes adicionais para este evento.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );

    } catch (error: any) {
        // 4. CATCH: Previne ecrãs pretos se o fetch falhar
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-6 text-center">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Falha de Ligação ao Servidor</h2>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-2xl mb-8 text-left inline-block">
                    <p className="text-gray-500 mb-2 font-semibold">A tentar aceder a:</p>
                    <code className="text-pink-600 break-all text-sm block mb-4">{urlFetch}</code>
                    
                    <p className="text-gray-500 mb-2 font-semibold">Erro interno do Next.js:</p>
                    <code className="text-red-500 break-all text-sm block">{error.message || 'Erro de rede ou certificado inválido'}</code>
                </div>

                <Link href="/programa" className="text-pink-600 font-bold hover:underline text-lg">
                    &larr; Voltar ao Programa
                </Link>
            </div>
        );
    }
}