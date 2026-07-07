import Link from 'next/link';

export default function ComoAjudar() {
    return (
        <main className="bg-gray-900 min-h-screen pt-10">

            <div className="px-8 max-w-6xl mx-auto mb-10">
                <h1 className="text-5xl font-bold text-white">Como Ajudar</h1>
            </div>

            <div className="px-8 max-w-6xl mx-auto flex flex-wrap gap-8 justify-center">
                <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-white">Doações Monetárias</h2>
                    <p className="text-gray-400 mb-4">Contribua financeiramente para apoiar a festa e garantir que ela continue a crescer.</p>
                    <Link href="/como-ajudar/doacoes" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Saiba Mais
                    </Link>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-white">Voluntariado</h2>
                    <p className="text-gray-400 mb-4">Junte-se à nossa equipa de voluntários e ajude na organização e execução da festa.</p>
                    <Link href="/como-ajudar/voluntariado" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Saiba Mais
                    </Link>
                </div>
                

                <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-white">Patrocínios</h2>
                    <p className="text-gray-400 mb-4">Se representa uma empresa, considere patrocinar a festa e ganhar visibilidade na comunidade.</p>
                    <Link href="/como-ajudar/patrocinios" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Saiba Mais
                    </Link>
                </div>
            </div>
        </main>
    );
}