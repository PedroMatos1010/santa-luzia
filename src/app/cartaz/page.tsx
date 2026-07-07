import Image from 'next/image'
import CartazInterativo from './cartazinterativo'; // <-- Ajusta o caminho se guardares noutra pasta!

type Cartaz = {
    id: string;
    relationships?: {
        field_imagem?: {
            data?: {
                id: string;
            } | null;
        };
    };
}

type ImagemAtributos = {
    id: string;
    attributes: {
        uri: {
            url: string;
        };
    };
};

export default async function Home() {
    const res = await fetch('http://festa-santa-luzia-api.ddev.site/jsonapi/node/cartaz?include=field_imagem', {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div className="text-white text-center mt-20">Erro a carregar o site. Tente novamente mais tarde.</div>;
    }

    const json = await res.json();
    const cartazes: Cartaz[] = json.data;
    const ficheirosIncluidos: ImagemAtributos[] = json.included || []

    return (
        <main className="bg-gray-900 min-h-screen pt-10">
            <div className="px-8 max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold mb-12 text-white text-center">Cartaz</h1>

                {cartazes.map((cartaz) => {

                    const imagemId = cartaz.relationships?.field_imagem?.data?.id;
                    const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                    const caminhoRelativo = ficheiroImagem?.attributes?.uri?.url;
                    
                    // BASE URL SEGURA (Igual ao que usamos no Banner e no Programa)
                    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'http://festa-santa-luzia-api.ddev.site';
                    
                    // LÓGICA BLINDADA: Verifica se o Drupal já mandou o 'http' no URL
                    let urlCompleto = null;
                    if (caminhoRelativo) {
                        urlCompleto = caminhoRelativo.startsWith('http') 
                            ? caminhoRelativo 
                            : `${baseUrl}${caminhoRelativo}`;
                    }

                    return (
                        <div key={cartaz.id} className="flex flex-col items-center mb-16">

                            {/* O NOVO COMPONENTE QUE AMPLIA A FOTO */}
                            <CartazInterativo urlCompleto={urlCompleto} />

                            {/* Botão centrado abaixo */}
                            {urlCompleto && (
                                <div className="flex justify-center mt-8">
                                    <a
                                        href={urlCompleto}
                                        download
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-500 transition"
                                    >
                                        Transferir cartaz
                                    </a>
                                </div>
                            )}

                        </div>
                    )
                })}

            </div>
        </main >
    );
}