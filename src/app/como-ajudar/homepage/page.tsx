import Link from 'next/link';

export default function ComoAjudar() {
    return (
        <main className="bg-gray-50 min-h-screen pt-20 pb-20">

            <div className="px-8 max-w-6xl mx-auto mb-16 text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">Como Ajudar</h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">A sua contribuição é fundamental para o sucesso e crescimento da nossa festa.</p>
            </div>

            <div className="px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* Cartão 1 */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Doações Monetárias</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">Contribua financeiramente para apoiar a festa e garantir que ela continue a crescer.</p>
                    </div>
                    <Link href="/como-ajudar/doacoes" className="bg-blue-600 text-white text-center px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition w-full">
                        Saiba Mais
                    </Link>
                </div>

                {/* Cartão 2 */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Voluntariado</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">Junte-se à nossa equipa de voluntários e ajude na organização e execução da festa.</p>
                    </div>
                    <Link href="/como-ajudar/voluntariado" className="bg-blue-600 text-white text-center px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition w-full">
                        Saiba Mais
                    </Link>
                </div>

                {/* Cartão 3 */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">Patrocínios</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">Se representa uma empresa, considere patrocinar a festa e ganhar visibilidade na comunidade.</p>
                    </div>
                    <Link href="/como-ajudar/patrocinios" className="bg-blue-600 text-white text-center px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition w-full">
                        Saiba Mais
                    </Link>
                </div>
                
            </div>
        </main>
    );
}