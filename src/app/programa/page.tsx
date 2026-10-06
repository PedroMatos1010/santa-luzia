import ProgramaFotos from './cliente/ProgramaFotos';

export const dynamic = "force-dynamic";

export default async function ProgramaPage() {
    // 1. A MAGIA ESTÁ AQUI: Usar a variável de ambiente em vez do endereço local fixo!
    const rawBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_URL || 'https://admin.santaluziamoreira.pt';
    const baseUrl = rawBaseUrl.replace(/\/$/, '');
    
    const urlFetch = `${baseUrl}/jsonapi/node/evento?include=field_imagem&sort=field_data`;

    try {
        const res = await fetch(urlFetch, { cache: 'no-store' });

        if (!res.ok) {
            return (
                <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8 font-bold text-center">
                    <p className="text-red-500 text-2xl mb-4">Erro a carregar a base de dados (Erro {res.status}).</p>
                    <code className="bg-gray-800 p-2 rounded text-sm text-yellow-400">{urlFetch}</code>
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
            
        }) || listaDeEventos[0] || null;

        // 4. Enviamos as três variáveis para o Frontend
        return (
            <ProgramaFotos 
                evento={listaDeEventos} 
                incluidos={ficheirosIncluidos} 
                proximoEvento={proximoEvento} 
            />
        );

    } catch (error: any) {
        // ESCUDO: Se a rede falhar, para aqui e avisa, em vez de crashar!
        console.error("🛑 ERRO NO FETCH DO PROGRAMA:", error);
        return (
            <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-3xl font-bold text-red-500 mb-4">Falha de Rede no Servidor</h2>
                <p className="text-gray-400 mb-2">A tentar contactar o Drupal em:</p>
                <code className="text-pink-400 block mb-4 break-all">{urlFetch}</code>
                <code className="text-red-400 block">{error.message}</code>
            </div>
        );
    }
}