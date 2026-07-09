import Image from 'next/image';
import Link from 'next/link';

// Tipagem atualizada para aceitar o array de incluidos e a relação
type Evento = {
    id: string;
    attributes: {
        title: string;
        field_data?: string;
        field_local?: string;
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

export default async function ProximosEventos() {
    // Garantir que temos o URL base correto
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'http://festa-santa-luzia-api.ddev.site';
    
    const res = await fetch(`${baseUrl}/jsonapi/node/evento?include=field_imagem&sort=field_data&page[limit]=2`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div className="text-center text-white py-8 bg-gray-900">Não foi possível carregar os eventos.</div>;
    }

    const json = await res.json();
    const ultimosEventos: Evento[] = json.data;
    const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

    return (
        <section className="bg-teal-900 py-24 px-6 relative overflow-hidden">
            
            {/* Brilho de fundo (Lado direito para equilibrar com as notícias) */}
            <div className="absolute bottom-0 right-0 w-3/4 h-32 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* TÍTULO DA SECÇÃO */}
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-5xl font-extrabold text-white tracking-tight mb-4">
                        Próximos Eventos
                    </h2>
                    <div className="w-24 h-1 bg-pink-500 rounded-full"></div>
                </div>

                {/* LISTA DOS CARTÕES CENTRADOS COM TAMANHO CONTROLADO */}
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    {ultimosEventos.map((evento) => {

                        // 1. Lógica da Imagem (com proteção de domínios duplicados)
                        const imagemId = evento.relationships?.field_imagem?.data?.id;
                        const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                        const caminhoRelativo = ficheiroImagem?.attributes?.uri?.url;
                        
                        let urlImagem = null;
                        if (caminhoRelativo) {
                            urlImagem = caminhoRelativo.startsWith('http') 
                                ? caminhoRelativo 
                                : `${baseUrl}${caminhoRelativo}`;
                        }

                        // 2. Lógica da Data e Hora
                        const dataBruta = evento.attributes.field_data;
                        let dataFormatada = "Em breve";
                        let horaFormatada = "";

                        if (dataBruta) {
                            const dataObj = new Date(dataBruta);
                            dataFormatada = dataObj.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
                            horaFormatada = dataObj.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
                        }

                        return (
                            <Link 
                                key={evento.id}
                                href={`/eventos/${evento.id}`}
                                className="group flex flex-col bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-pink-500/50 hover:-translate-y-2 transition-all duration-300 w-full max-w-sm"
                            >
                                {/* PARTE SUPERIOR: IMAGEM (Altura fixa h-52) */}
                                <div className="relative w-full h-52 overflow-hidden bg-gray-900">
                                    {urlImagem ? (
                                        <Image
                                            src={urlImagem}
                                            alt={evento.attributes.title}
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

                                {/* PARTE INFERIOR: CONTEÚDO */}
                                <div className="p-6 flex flex-col flex-1 relative mt-1">
                                    
                                    {/* DATA E HORA (Estilo Bilhete) */}
                                    <div className="absolute -top-6 left-6 bg-pink-600 text-white font-bold tracking-wider py-1.5 px-4 rounded-md shadow-lg flex flex-col items-center border-2 border-gray-800">
                                        <span className="text-sm uppercase">{dataFormatada}</span>
                                        {horaFormatada && (
                                            <span className="text-xs text-pink-200">{horaFormatada}</span>
                                        )}
                                    </div>

                                    {/* TÍTULO */}
                                    <h3 className="text-xl font-bold text-white mt-5 mb-3 group-hover:text-pink-400 transition-colors duration-300 line-clamp-2">
                                        {evento.attributes.title}
                                    </h3>

                                    {/* LOCAL (Com Ícone) */}
                                    <p className="text-gray-400 text-sm mb-5 flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <span className="truncate">{evento.attributes.field_local || "Local a definir"}</span>
                                    </p>

                                    {/* LINK ANIMADO */}
                                    <div className="mt-auto inline-flex items-center text-xs font-bold tracking-widest text-gray-400 uppercase group-hover:text-white transition-colors duration-300">
                                        Ler mais
                                        <span className="ml-3 w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center group-hover:bg-pink-600 transition-colors duration-300 transform group-hover:translate-x-2">
                                            &rarr;
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* BOTÃO VER PROGRAMA COMPLETO */}
                <div className="flex justify-center">
                    <Link
                        href="/programa"
                        className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-pink-600 rounded-full overflow-hidden shadow-[0_0_15px_rgba(219,39,119,0.3)] hover:shadow-[0_0_25px_rgba(219,39,119,0.5)] hover:bg-pink-500 transition-all duration-300 cursor-pointer"
                    >
                        Ver programa completo
                    </Link>
                </div>

            </div>
        </section>
    );
}