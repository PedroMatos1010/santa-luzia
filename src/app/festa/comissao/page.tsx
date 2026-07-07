import Image from 'next/image';

// Tipagem básica dos membros
type Membro = {
  id: string;
  nome: string;
  cargo: string;
  foto: string | null;
};

export default async function ComissaoPage() {
  // Fetch members from Drupal JSON:API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_URL}/jsonapi/node/comissao?include=field_imagem`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    return (
      <main className="text-center text-red-500">
        <h1>Erro ao carregar os dados da comissão.</h1>
      </main>
    );
  }

  const data = await res.json();

  // Mapear os dados da API para o nosso tipo Membro
  const membros: Membro[] = data.data.map((item: any) => {
    // Encontrar o ID da referência da imagem nas relações
    const imageId = item.relationships?.field_imagem?.data?.id;
    
    // Encontrar o objeto real da imagem no array 'included'
    const imageNode = data.included?.find((inc: any) => inc.id === imageId);
    
    // Construir o URL completo da imagem
    const imageUrl = imageNode?.attributes?.uri?.url
      ? `${process.env.NEXT_PUBLIC_DRUPAL_URL}${imageNode.attributes.uri.url}`
      : null;

    return {
      id: item.id,
      nome: item.attributes.title,
      cargo: item.attributes.field_cargo,
      foto: imageUrl,
    };
  });

  return (
    <main>
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
           <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Comissão de Festas 
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-500 text-lg">Conhece a equipa que torna tudo possível.</p>
        </div>

        {/* GRID DE MEMBROS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {membros.map((membro) => (
            <div key={membro.id} className="group text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg group-hover:border-blue-500 transition-all duration-300">
                {membro.foto ? (
                  <Image
                    src={membro.foto}
                    alt={`Fotografia de ${membro.nome}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  // Fallback se nenhuma imagem for fornecida no Drupal
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold">
                    FOTO
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{membro.nome}</h3>
              <p className="text-blue-600 font-medium mt-1">{membro.cargo}</p>
            </div>
          ))}
        </div>

        {/* MENSAGEM FINAL */}
        <div className="mt-20 p-10 bg-gray-50 rounded-2xl border border-gray-100 text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">Queres falar connosco?</h4>
          <p className="text-gray-600">Estamos sempre disponíveis para parcerias e sugestões.</p>
          <button className="mt-6 bg-gray-900 text-white py-3 px-8 rounded-full font-bold hover:bg-gray-700 transition">
            Enviar E-mail
          </button>
        </div>

      </div>
    </main>
  );
}