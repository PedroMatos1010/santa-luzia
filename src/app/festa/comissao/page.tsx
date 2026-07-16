import Image from 'next/image';
import Link from 'next/link';

// Tipagem básica dos membros
type Membro = {
  id: string;
  nome: string;
  cargo: string;
  foto: string | null;
};

export default async function ComissaoPage() {
  const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'http://festa-santa-luzia-api.ddev.site';

  // 1. LÓGICA PARA IR BUSCAR A COMISSÃO
  const resComissao = await fetch(
    `${baseUrl}/jsonapi/node/comissao?include=field_imagem&sort=field_ordem`,
    { cache: 'no-store' }
  );

  if (!resComissao.ok) {
    return (
      <main className="text-center text-red-500 py-20">
        <h1>Erro ao carregar os dados da comissão.</h1>
      </main>
    );
  }

  const dataComissao = await resComissao.json();

  // Mapear os dados da API para o nosso tipo Membro
  const membros: Membro[] = dataComissao.data.map((item: any) => {
    const imageId = item.relationships?.field_imagem?.data?.id;
    const imageNode = dataComissao.included?.find((inc: any) => inc.id === imageId);
    const imageUrl = imageNode?.attributes?.uri?.url
      ? `${baseUrl}${imageNode.attributes.uri.url}`
      : null;

    return {
      id: item.id,
      nome: item.attributes.title,
      cargo: item.attributes.field_cargo,
      foto: imageUrl,
    };
  });

  // 2. LÓGICA PARA IR BUSCAR O E-MAIL (Igual aos Contactos)
  let emailDinamico = "geral@santaluzia.pt"; // Email de fallback
  try {
    const resEmail = await fetch(`${baseUrl}/jsonapi/node/site_settings`, {
      cache: 'no-store'
    });

    if (resEmail.ok) {
      const jsonEmail = await resEmail.json();
      if (jsonEmail.data && jsonEmail.data.length > 0 && jsonEmail.data[0].attributes.field_email) {
        emailDinamico = jsonEmail.data[0].attributes.field_email;
      }
    }
  } catch (error) {
    console.error("Erro ao carregar o e-mail:", error);
  }

  return (
    <main className="py-20">
      <div className="max-w-4xl mx-auto px-8">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-24">
           <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
             Comissão de Festas 
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-500 text-lg mt-6">Conhece a equipa que torna tudo possível.</p>
        </div>

        {/* GRID DE MEMBROS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 justify-items-center">
          {membros.map((membro) => (
            <div key={membro.id} className="group text-center w-full max-w-xs">
              
              <div className="relative w-56 h-56 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg group-hover:border-blue-500 transition-all duration-300">
                {membro.foto ? (
                  <Image
                    src={membro.foto}
                    alt={`Fotografia de ${membro.nome}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold">
                    FOTO
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{membro.nome}</h3>
              <p className="text-blue-600 font-medium mt-2">{membro.cargo}</p>
            </div>
          ))}
        </div>

        {/* MENSAGEM FINAL COM BOTÃO DE E-MAIL DINÂMICO */}
        <div className="mt-32 p-10 bg-gray-50 rounded-3xl border border-gray-100 text-center">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">Queres falar connosco?</h4>
          <p className="text-gray-600">Estamos sempre disponíveis para parcerias e sugestões.</p>
          
          {/* Troca do <button> para a tag <a> com mailto */}
          <a 
            href={`mailto:${emailDinamico}`}
            className="inline-block mt-6 bg-gray-900 text-white py-3 px-8 rounded-full font-bold hover:bg-gray-700 transition"
          >
            Enviar E-mail
          </a>
        </div>

      </div>
    </main>
  );
}