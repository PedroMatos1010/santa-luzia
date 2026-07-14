// Tipagem para os dados que vêm do Drupal
type Estatistica = {
    id: string;
    attributes: {
        title: string;       // Ex: "Dias de Romaria"
        field_valor: string; // Ex: "3", "+500"
    };
};

export default async function BannerEstat() {
    // 1. Pedido à API do Drupal (tipo de conteúdo: estatistica)
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'http://festa-santa-luzia-api.ddev.site';
    const res = await fetch(`${baseUrl}/jsonapi/node/estatistica?sort=created`, {
        cache: 'no-store'
    });

    // Se a API falhar, não desenhamos nada para não estragar a página
    if (!res.ok) {
        return null;
    }

    const json = await res.json();
    const estatisticas: Estatistica[] = json.data;

    // Se não houver estatísticas publicadas, escondemos o banner
    if (!estatisticas || estatisticas.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-cyan-50 mt-20 mb-20 py-20 border-y border-gray-800 shadow-2xl relative overflow-hidden">
            
            {/* Efeito de luz subtil no fundo */}
            <div className="absolute inset-0 bg-pink-900/10 blur-[120px] pointer-events-none"></div>

            {/* No telemóvel fica em coluna (flex-col), no PC fica em linha (md:flex-row) */}
            <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 relative z-10">
                  
                {estatisticas.map((estat) => (
                    <div key={estat.id} className="flex flex-col items-center text-center group">
                        
                        {/* O NÚMERO GIGANTE */}
                        <span className="text-6xl md:text-7xl font-black text-pink-600 drop-shadow-[0_0_15px_rgba(219,39,119,0.3)] group-hover:scale-110 transition-transform duration-300">
                            {estat.attributes.field_valor}
                        </span>
                        
                        {/* A ETIQUETA / TÍTULO */}
                        <span className="text-lg font-bold text-gray-400 mt-4 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                            {estat.attributes.title}
                        </span>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}