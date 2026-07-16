import Image from 'next/image';
import Link from 'next/link';

export default function PatrimonioLocalPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                
                {/* CABEÇALHO COM A LINHA DE ESTILO */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Património Local
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                        Descobre a riqueza histórica e cultural de Moreira de Cónegos. 
                        Um passeio pelas nossas raízes, monumentos e tradições que marcam a identidade da nossa terra.
                    </p>
                </div>

                {/* GRELHA DE PONTOS DE INTERESSE */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* CARTÃO 1: CAPELA */}
                    <article className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col group">
                        <div className="relative w-full h-56 bg-gray-200">
                            {/* Placeholder para a imagem da Igreja */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium uppercase tracking-widest text-xs">
                                Imagem da Igreja
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                Igreja Matriz
                            </h2>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                                Dedicada a São Paio, a Igreja Paroquial guarda no seu interior traços de uma rica história, sendo o centro da vida litúrgica da nossa paróquia.
                                Lá é possível ver santa luzia, a padroeira da nossa festa, e sentir a história que cada pedra carrega.
                            </p>
                            <Link href="#" className="text-blue-600 font-bold inline-flex items-center hover:text-blue-800 transition-colors">
                                Ler mais
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </article>

                    {/* CARTÃO 2: IGREJA MATRIZ */}
                    <article className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col group">
                        <div className="relative w-full h-56 bg-gray-200">
                            {/* Placeholder para a imagem da Igreja */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium uppercase tracking-widest text-xs">
                                Imagem do moinho
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                Moinho
                            </h2>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                                O moinho de água, testemunho da engenhosidade e da vida rural, é um símbolo do nosso património.
                                Ele representa a ligação da comunidade com a natureza e a importância da agricultura na história local.
                            </p>
                            <Link href="#" className="text-blue-600 font-bold inline-flex items-center hover:text-blue-800 transition-colors">
                                Ler mais
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </article>

                    {/* CARTÃO 3: NATUREZA / MOINHOS / HISTÓRIA CIVIL */}
                    <article className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col group">
                        <div className="relative w-full h-56 bg-gray-200">
                            {/* Placeholder para imagem genérica */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium uppercase tracking-widest text-xs">
                                Imagem Histórica
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                            <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                                Tradições e Costumes
                            </h2>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                                Para além da componente religiosa, o nosso património vive das pessoas, da agricultura antiga e dos vestígios de épocas passadas que ainda marcam a paisagem.
                            </p>
                            <Link href="#" className="text-blue-600 font-bold inline-flex items-center hover:text-blue-800 transition-colors">
                                Ler mais
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </article>

                </div>
            </div>
        </main>
    );
}