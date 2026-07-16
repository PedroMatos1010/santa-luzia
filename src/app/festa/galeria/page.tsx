import Image from 'next/image';

export default function GaleriaPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Galeria
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* MENSAGEM DE EM DESENVOLVIMENTO */}
        <article className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center text-center">
          
          {/* Ícone de Fotografia/Galeria */}
          <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-6 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Em breve...
          </h2>
          
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            Neste espaço ficarão disponíveis as fotografias da Festa de Santa Luzia, assim como os registos das várias atividades da nossa comunidade.
          </p>

        </article>
      </div>
    </main>
  );
}