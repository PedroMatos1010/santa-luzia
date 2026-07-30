import ProgramaFotos from './cliente/ProgramaFotos';

export default async function ProgramaPage() {
    // 1. O "JOIN" e a Ordenação: Adicionamos &sort=field_data para vir logo por ordem cronológica
    const res = await fetch('http://festa-santa-luzia-api.ddev.site/jsonapi/node/evento?include=field_imagem&sort=field_data', {
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
    
    // 2. Separar a tabela principal da tabela relacionada
    const listaDeEventos = json.data || [];
    const ficheirosIncluidos = json.included || []; 

    // 3. Lógica do Próximo Evento
    const agora = new Date();
    
    const proximoEvento = listaDeEventos.find((evento: any) => {
        if (!evento.attributes.field_data) return false;
        
        // Converte a data do Drupal para um objeto Date do JavaScript
        const dataEvento = new Date(evento.attributes.field_data);
        
        // Verifica se o evento é no futuro (ou a acontecer agora)
        return dataEvento >= agora;
        
    }) || listaDeEventos[0] || null; // Se todos já passaram, mostra o 1º da lista. Se não houver nenhum, devolve null.

    // 4. Enviamos as três variáveis para o Frontend
    return (
        <ProgramaFotos 
            evento={listaDeEventos} 
            incluidos={ficheirosIncluidos} 
            proximoEvento={proximoEvento} 
        />
    );
}