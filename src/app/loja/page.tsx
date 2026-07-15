import Image from 'next/image';
import Link from 'next/link';

// Tipagem baseada nos dados do Drupal para os Produtos
type Produto = {
    id: string;
    attributes: {
        title: string;
        body?: {
            value: string;
            summary?: string;
        };
        field_preco?: number;
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

export default async function LojaPage() {
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
    
    // Fetch aos produtos no Drupal
    const res = await fetch(`${baseUrl}/jsonapi/node/produtos?include=field_imagem&sort=-created`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div className="text-center py-20 text-gray-500 font-bold">Erro a carregar a loja.</div>;
    }

    const json = await res.json();
    const produtos: Produto[] = json.data;
    const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

    return (
        <main className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-8">
                
                {/* CABEÇALHO DA LOJA */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-2">Loja Oficial</h1>
                        <p className="text-gray-500 font-medium text-lg">Apoia a nossa romaria levando uma recordação.</p>
                    </div>
                </div>

                {/* GRELHA DE PRODUTOS */}
                {produtos && produtos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {produtos.map((produto) => {
                            // Encontrar a Imagem
                            let urlImagem = null;
                            const imagemId = produto.relationships?.field_imagem?.data?.id;
                            if (imagemId && ficheirosIncluidos) {
                                const ficheiro = ficheirosIncluidos.find((inc) => inc.id === imagemId);
                                if (ficheiro?.attributes?.uri?.url) {
                                    urlImagem = `${baseUrl}${ficheiro.attributes.uri.url}`;
                                }
                            }

                            // Formatar Preço (Ex: 12.00 para "12,00 €")
                            const precoNumerico = produto.attributes.field_preco || 0;
                            const precoFormatado = precoNumerico.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });

                            // Obter resumo da descrição para não partir o layout
                            // Se não houver summary, limpa as tags HTML do body
                            const descricaoBruta = produto.attributes.body?.summary || produto.attributes.body?.value || "Sem descrição disponível.";
                            const descricaoLimpa = descricaoBruta.replace(/(<([^>]+)>)/gi, ""); 

                            return (
                                <div 
                                    key={produto.id} 
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 hover:-translate-y-2 transition-all duration-300 flex flex-col"
                                >
                                    {/* ÁREA DA IMAGEM */}
                                    <div className="relative h-64 bg-gray-100 overflow-hidden w-full">
                                        {urlImagem ? (
                                            <Image 
                                                src={urlImagem} 
                                                alt={produto.attributes.title} 
                                                fill 
                                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                                <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                <span className="text-xs font-bold uppercase tracking-widest">Sem foto</span>
                                            </div>
                                        )}
                                        {/* Etiqueta de novidade (Opcional, podes remover se não quiseres) */}
                                        <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            Novo
                                        </div>
                                    </div>

                                    {/* ÁREA DE TEXTO E PREÇO */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-1">
                                            {produto.attributes.title}
                                        </h3>
                                        
                                        {/* line-clamp-2 garante que a descrição nunca passa de 2 linhas, mantendo os cartões alinhados */}
                                        <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                                            {descricaoLimpa}
                                        </p>
                                        
                                        {/* ZONA INFERIOR: Preço e Botão colados ao fundo */}
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-2xl font-black text-gray-900">
                                                {precoFormatado}
                                            </span>
                                            
                                            {/* Link para a página de detalhes do produto (ajusta o href para a tua rota real) */}
                                            <Link 
                                                href={`/loja/${produto.id}`} 
                                                className="bg-gray-900 hover:bg-pink-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                                            >
                                                Ver Mais
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">A loja está a ser preparada</h2>
                        <p className="text-gray-500">Em breve teremos fantásticos artigos da comissão disponíveis.</p>
                    </div>
                )}

            </div>
        </main>
    );
}