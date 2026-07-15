import Image from 'next/image';
import Link from 'next/link';

type EventoDetalhe = {
    id: string;
    attributes: {
        title: string;
        field_data?: string;
        field_local?: string;
        // Se tiveres um campo de descrição longa (body) no teu Tipo de Conteúdo do Drupal:
        body?: {
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

// O Next.js injeta automaticamente os parâmetros do URL em 'params'
export default async function DynamicProgramaDetalhes({ params }: { params: { id: string } }) {
    const { id } = params;
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
    
    // Pedido ao Drupal para trazer apenas o nó com este UUID específico
    const res = await fetch(`${baseUrl}/jsonapi/node/evento/${id}?include=field_imagem`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-6">
                <p className="text-gray-900 font-bold text-2xl mb-4">Evento não encontrado</p>
                <Link href="/programa" className="text-pink-600 font-bold hover:underline">Voltar ao Programa</Link>
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
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-pink-600 mb-8 transition-colors group"
                >
                    <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Voltar ao Programa
                </Link>

                {/* CARTÃO PRINCIPAL DE DETALHES */}
                <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                    
                    {/* ÁREA DA FOTO GIGANTE */}
                    <div className="relative w-full h-96 bg-gray-800">
                        {urlImagem ? (
                            <Image 
                                src={urlImagem} 
                                alt={evento.attributes.title} 
                                fill 
                                className="object-cover"
                                priority // Carrega a imagem imediatamente por ser o topo da página
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold uppercase tracking-widest">
                                Sem Imagem Disponível
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                    </div>

                    {/* CONTEÚDO E INFORMAÇÕES */}
                    <div className="p-8 md:p-12 -mt-12 relative z-10">
                        
                        {/* DATA EXTENSA */}
                        <span className="text-pink-500 font-black tracking-widest text-sm uppercase block mb-3 drop-shadow-sm">
                            {dataX}
                        </span>

                        {/* TÍTULO PRINCIPAL */}
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight leading-tight">
                            {evento.attributes.title}
                        </h1>

                        {/* ETIQUETAS RÁPIDAS (LOCAL E HORA) */}
                        <div className="flex flex-wrap gap-4 mb-10 pb-8 border-b border-gray-800">
                            <div className="bg-gray-800 text-gray-200 px-5 py-3 rounded-xl font-bold flex items-center gap-3 border border-gray-700 shadow-md">
                                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                {evento.attributes.field_local || "Local a definir"}
                            </div>

                            <div className="bg-gray-800 text-gray-200 px-5 py-3 rounded-xl font-bold flex items-center gap-3 border border-gray-700 shadow-md">
                                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Horário: {horaY}
                            </div>
                        </div>

                        {/* DESCRIÇÃO DETALHADA */}
                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Sobre o Evento</h3>
                            {evento.attributes.body?.value ? (
                                <div 
                                    className="text-gray-300 text-lg leading-relaxed space-y-4"
                                    dangerouslySetInnerHTML={{ __html: evento.attributes.body.value }}
                                />
                            ) : (
                                <p className="text-gray-500 italic text-lg">Não existem detalhes adicionais para este evento.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}