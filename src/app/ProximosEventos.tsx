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
    const res = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_URL}/jsonapi/node/evento?include=field_imagem&sort=field_data&page[limit]=2`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div className="text-center text-white">Não foi possível carregar os eventos.</div>;
    }

    const json = await res.json();
    const ultimosEventos: Evento[] = json.data;
    const ficheirosIncluidos: ImagemAtributos[] = json.included || [];

    return (
        <section className="bg-gray-200 py-16">
            <div className="max-w-6xl mx-auto px-8">
                <h2 className="text-4xl font-bold mb-10 text-gray-900 text-center">Próximos Eventos</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {ultimosEventos.map((evento) => {
                        // Lógica da imagem
                        const imagemId = evento.relationships?.field_imagem?.data?.id;
                        const ficheiroImagem = ficheirosIncluidos.find(item => item.id === imagemId);
                        const urlImagem = ficheiroImagem?.attributes?.uri?.url
                            ? `${process.env.NEXT_PUBLIC_DRUPAL_URL}${ficheiroImagem.attributes.uri.url}`
                            : null;

                        return (
                            <div key={evento.id} className="relative overflow-hidden bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{evento.attributes.title}</h3>
                                    <Link href={`/eventos/${evento.id}`} className="text-blue-600 font-bold hover:text-blue-800">
                                        Ler mais &rarr;
                                    </Link>
                                </div>

                                {urlImagem && (
                                    <div className="relative w-32 h-32 flex-shrink-0 ml-4">
                                        <Image src={urlImagem} alt={evento.attributes.title} fill className="object-cover rounded-lg" />
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <div className="flex justify-center items-center col-span-1 md:col-span-2">
                        <Link
                            href="/programa"
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition "
                        >
                            Ver programa completo
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}