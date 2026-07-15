import Link from 'next/link';

// Tipagem para os dados que vêm do Drupal
type Estatistica = {
    id: string;
    attributes: {
        title: string;
        field_valor: string;
    };
};

// ==========================================
// MÁQUINA DE ROTAS
// ==========================================
function obterRota(titulo: string): string {
    const texto = titulo.toLowerCase();

    if (texto.includes("membro") || texto.includes("comissã") || texto.includes("comissa")) {
        return "/festa/comissao";
    }
    
    if (texto.includes("lkjhg") || texto.includes("dias") || texto.includes("romaria") || texto.includes("evento")) {
        return "/programa"; 
    }
    
    if (texto.includes("jnhbv") || texto.includes("parceiro") || texto.includes("patroc")) {
        return "#parceiros"; 
    }

    return "#";
}

export default async function BannerEstat() {
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
    
    let estatisticas: Estatistica[] = [];
    let totalEventos = 0;
    let totalParceiros = 0;

    try {
        // 1. O TRUQUE DE MESTRE: Buscar os 3 tipos de conteúdo em simultâneo
        const [resEstat, resEventos, resParceiros] = await Promise.all([
            fetch(`${baseUrl}/jsonapi/node/estatistica?sort=created`, { cache: 'no-store' }),
            fetch(`${baseUrl}/jsonapi/node/evento`, { cache: 'no-store' }),
            fetch(`${baseUrl}/jsonapi/node/parceiros`, { cache: 'no-store' }) // Tenta o plural
        ]);

        // Carregar as Estatísticas Base
        if (resEstat.ok) {
            const jsonEstat = await resEstat.json();
            estatisticas = jsonEstat.data || [];
        }

        // Contar os Eventos
        if (resEventos.ok) {
            const jsonEventos = await resEventos.json();
            totalEventos = jsonEventos.data?.length || 0; // .length conta quantos existem!
        }

        // Contar os Parceiros
        if (resParceiros.ok) {
            const jsonParceiros = await resParceiros.json();
            totalParceiros = jsonParceiros.data?.length || 0;
        } else {
            // Plano B: Se a chamada falhar porque o machine name no Drupal é no singular ("parceiro")
            const resParceiroSingular = await fetch(`${baseUrl}/jsonapi/node/parceiro`, { cache: 'no-store' });
            if (resParceiroSingular.ok) {
                const jsonParceiroSingular = await resParceiroSingular.json();
                totalParceiros = jsonParceiroSingular.data?.length || 0;
            }
        }

    } catch (error) {
        console.error("Falha ao carregar as estatísticas e as contagens:", error);
        return null;
    }

    if (!estatisticas || estatisticas.length === 0) return null;

    return (
        <div className="w-full bg-cyan-50 mt-20 mb-20 py-20 border-y border-gray-800 shadow-2xl relative overflow-hidden">
            
            <div className="absolute inset-0 bg-pink-900/10 blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 relative z-10">
                  
                {estatisticas.map((estat) => {
                    const destino = obterRota(estat.attributes.title);
                    const texto = estat.attributes.title.toLowerCase();
                    
                    // Começamos por usar o valor escrito à mão no Drupal
                    let valorDinamico = estat.attributes.field_valor;

                    // 2. A SUBSTITUIÇÃO DINÂMICA
                    // Se o título for sobre Eventos (LKJHG), ignoramos o valor falso e metemos o real
                    if (texto.includes("lkjhg") || texto.includes("evento")) {
                        valorDinamico = totalEventos.toString();
                    }
                    
                    // Se o título for sobre Parceiros (JNHBV), metemos a contagem real
                    if (texto.includes("jnhbv") || texto.includes("parceiro") || texto.includes("patroc")) {
                        valorDinamico = totalParceiros.toString();
                    }

                    return (
                        <Link 
                            href={destino} 
                            key={estat.id} 
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >
                            <span className="text-6xl md:text-7xl font-black text-pink-600 drop-shadow-[0_0_15px_rgba(219,39,119,0.3)] group-hover:scale-110 transition-transform duration-300">
                                {valorDinamico}
                            </span>
                            
                            <span className="text-lg font-bold text-gray-400 mt-4 uppercase tracking-widest group-hover:text-pink-600 transition-colors duration-300">
                                {estat.attributes.title}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}