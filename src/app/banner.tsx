import Link from 'next/link';
import Image from 'next/image';

// 1. Tipos de dados rigorosos (TypeScript)
type BannerNode = {
    id: string;
    attributes: {
        title: string;
    };
    relationships?: {
        field_imagem?: {
            data?: {
                id: string;
            } | null;
        };
    };
};

type ImageIncluded = {
    id: string;
    attributes: {
        uri: {
            url: string;
        };
    };
};

export default async function Banner() {
    // 2. O Pedido à API: Pedimos apenas 1 resultado (limit=1) e incluímos os dados da imagem
    const res = await fetch('https://admin.santaluziamoreira.pt/jsonapi/node/Banner?page[limit]=1&include=field_imagem', {
        cache: 'no-store'
    });

    // Fallback: Se o Drupal estiver em baixo
    if (!res.ok) {
        return (
            <Link href="/" className="text-2xl font-bold text-white transition hover:text-blue-300">
                Sta. Luzia 2026
            </Link>
        );
    }

    const json = await res.json();

    // Fallback: Se não houver nenhum logo publicado no Drupal
    if (!json.data || json.data.length === 0) {
        return (
            <Link href="/" className="text-2xl font-bold text-white transition hover:text-blue-300">
                Sta. Luzia 2026
            </Link>
        );
    }

    // 3. Processar os Dados
    // Como pedimos limit=1, apanhamos apenas o primeiro registo da lista
    const bannerNode: BannerNode = json.data[0];
    const includedFiles: ImageIncluded[] = json.included || [];

    // 4. Encontrar a Imagem Verdadeira (Lógica idêntica ao Cartaz)
    const imagemId = bannerNode.relationships?.field_imagem?.data?.id;

    // Procura no array de ficheiros incluídos pelo ID correspondente
    const ficheiroImagem = includedFiles.find(item => item.id === imagemId);

    // Constrói o URL absoluto
    const urlImagem = ficheiroImagem?.attributes?.uri?.url
    ? `${process.env.NEXT_PUBLIC_DRUPAL_URL}${ficheiroImagem.attributes.uri.url}`
    : null;

    // 5. O Desenho Final (Retornado uma única vez, sem .map())
    return (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden shadow-lg border-y border-gray-700">
            {urlImagem ? (
                // O Logótipo Dinâmico do Drupal
                <Image
                    src={urlImagem}
                    alt={bannerNode.attributes.title}
                    fill
                    className="object-cover object-center"
                />
            ) : (
                // Texto de segurança caso a imagem falhe
                <span className="text-2xl font-bold text-white group-hover:text-blue-300">
                    Sta. Luzia 2026
                </span>
            )}
        </div>
    );
}   