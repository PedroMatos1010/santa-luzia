import Image from 'next/image';

export default function DevocaoPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Devocao
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* CORPO DO TEXTO */}
        <article className="bg-white p-8 md:p-14 rounded-3xl shadow-xl border border-gray-100 text-lg text-gray-700 leading-relaxed space-y-8">
          
           <p className=" text-2xl ">
           em desenvolvimento...
          </p>
        </article>
        </div>
        </main>
  )}
