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
    const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL;
const res = await fetch(`${baseUrl}/jsonapi/node/cartaz?include=field_imagem`, {
    cache: 'no-store'
});

    if (!res.ok) {
        return <div className="text-gray-900 text-center mt-20">Erro a carregar o site. Tente novamente mais tarde.</div>;
    }

    const json = await res.json();
    const cartazes: Cartaz[] = json.data || [];
    const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

    // MENSAGEM SE NÃO HOUVER CARTAZ
    if (cartazes.length === 0) {
        return (
            <main className="bg-white min-h-screen pt-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-5xl font-extrabold mb-12 text-gray-900 text-center tracking-tight">Cartaz</h1>
                    <div className="bg-gray-50 border border-gray-200 rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">O cartaz ainda não foi revelado</h2>
                        <p className="text-gray-600">A comissão está a preparar grandes surpresas. Fica atento às novidades!</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-white min-h-screen pt-10">
            <div className="px-8 max-w-6xl mx-auto">
                <h1 className="text-5xl font-extrabold mb-12 text-gray-900 text-center tracking-tight">Cartaz</h1>

                {cartazes.map((cartaz) => {
                    const imagemId = cartaz.relationships?.field_imagem?.data?.id;
                    const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                    const caminhoRelativo = ficheiroImagem?.attributes?.uri?.url;
                    
                    let urlCompleto = null;
                    if (caminhoRelativo) {
                        urlCompleto = caminhoRelativo.startsWith('http') 
                            ? caminhoRelativo 
                            : `${baseUrl}${caminhoRelativo}`;
                    }

                    return (
                        <div key={cartaz.id} className="flex flex-col items-center mb-24">
                            <CartazInterativo urlCompleto={urlCompleto} />

                            {urlCompleto && (
                                <div className="flex justify-center mt-8">
                                    <a
                                        href={urlCompleto}
                                        download
                                        className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 hover:shadow-lg transition-all"
                                    >
                                        Transferir cartaz
                                    </a>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </main>
    );
}