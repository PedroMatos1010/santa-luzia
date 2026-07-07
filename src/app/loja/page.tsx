import Link from 'next/link';
import { title } from 'process';

type Produto = {
    id: string;
    attributes: {
        title: string;
        field_descricao: string;
        field_preco: string;
        field_imagem: any;
        field_tamanhos: string[];


    }
}

export default async function Home() {
    // Fazemos o fetch diretamente ao endpoint JSON do teu DDEV
    const res = await fetch('http://festa-santa-luzia-api.ddev.site/jsonapi/node/produtos', {
        cache: 'no-store' // Para garantir que vês as alterações na hora durante o desenvolvimento local
    });


    if (!res.ok) {
        return <div>Erro a carregar o site. Tente novamente mais tarde.</div>;
    }

    const json = await res.json();
    const produtos: Produto[] = json.data;


    return (
        <main className="bg-gray-900 min-h-screen">
            <div className="px-8 max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold mb-8 text-white">Loja</h1>
            </div>

            {/* 1. FATIA DOS PRODUTOS (De volta à caixa central) */}
            <div className=" px-8 max-w-6xl mx-auto flex flex-wrap gap-8 justify-center">

                {produtos.map((produto) => (

                    <div key={produto.id} className="w-80 bg-gray-300 border-y border-gray-400 mt-4 flex flex-col font-bold text-gray-500 text-2xl mx-auto rounded-lg shadow-md overflow-hidden">

                        {/* bloco do produto*/}
                        < div className="w-80 bg-gray-300 border-y border-gray-400 mt-4 flex flex-col font-bold text-gray-500 text-2xl mx-auto rounded-lg shadow-md overflow-hidden" >
                            <div className="w-full h-36 bg-gray-700 border-gray-800 border-dashed border-2 rounded-t-lg flex items-center justify-center">
                            {produto.attributes.field_imagem}
                            </div>

                            <div className="w-full h-44 bg-gray-600 border-gray-800 border-2 rounded-b-lg ">
                                <div className="px-4 py-2 flex flex-col justify-between h-full">
                                    <h2 className="text-2xl font-bold mb-2 text-white">{produto.attributes.title}</h2>
                                    <p className="text-gray-400 mb-4 text-sm">{produto.attributes.field_descricao}</p>
                                    <p className="text-gray-400 mb-4 text-sm">{produto.attributes.field_preco}€</p>
                                    <Link href="" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Ver Detalhes</Link>
                                </div>
                            </div>
                        </div>

                    </div>))}

            </div>

        </main >
    );
}