import ProgramaFotos from './cliente/ProgramaFotos';

export default async function ProgramaPage() {
    // 1. O "JOIN": O ?include vai forçar o Drupal a enviar os ficheiros na mesma resposta
    const res = await fetch('https://admin.santaluziamoreira.pt/jsonapi/node/evento?include=field_imagem', {
        cache: 'no-store'
    });

    if (!res.ok) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center font-bold">
                Erro a carregar a base de dados (Erro {res.status}).
            </div>
        );
    }

    const json = await res.json();
    
    // 2. Separar a tabela principal (eventos) da tabela relacionada (ficheiros de imagem)
    const listaDeEventos = json.data;
    const ficheirosIncluidos = json.included || []; // Array com todas as fotos extra
   // const proximoEvento = 

    // 3. Enviamos as duas variáveis para o Frontend com o novo nome do componente
    return <ProgramaFotos evento={listaDeEventos} incluidos={ficheirosIncluidos} />
}   