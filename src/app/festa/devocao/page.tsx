import Image from 'next/image';

export default function DevocaoPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Devoção a Santa Luzia
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* CORPO DO TEXTO */}
        <article className="bg-white p-8 md:p-14 rounded-3xl shadow-xl border border-gray-100 text-lg text-gray-700 leading-relaxed">
          
          {/* ESPAÇO PARA A IMAGEM DE DESTAQUE */}
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-md bg-gray-100 flex items-center justify-center border border-gray-200">
            {/* Quando tiveres a imagem final, podes descomentar e usar isto: 
            <Image 
              src="/caminho-para-imagem.jpg" 
              alt="Imagem de Santa Luzia" 
              fill 
              className="object-cover"
            /> 
            */}
            <span className="text-gray-400 font-medium tracking-widest uppercase text-sm">
                [Fotografia ou Imagem Histórica]
            </span>
          </div>

          <div className="space-y-8">
            {/* Texto com letra capitular (Drop Cap) para um toque mais clássico */}
            <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-3 first-letter:float-left first-line:uppercase first-line:tracking-widest">
              A devoção a Santa Luzia em Moreira de Cónegos é uma tradição secular que atravessa gerações e fortalece os laços da nossa comunidade.
            </p>
            
            <p>
              Conhecida universalmente como a protetora dos olhos e padroeira da visão, a mártir de Siracusa encontra na nossa terra um eco profundo de fé. Todos os anos, as gentes da nossa vila reúnem-se não apenas para celebrar, mas para agradecer as graças concedidas e renovar a esperança, preservando raízes históricas que muito nos orgulham.
            </p>

            {/* Citação em destaque */}
            <blockquote className="border-l-4 border-blue-600 pl-6 italic text-xl text-gray-900 my-10 bg-gray-50 py-6 pr-6 rounded-r-xl shadow-inner">
              "Que Santa Luzia nos conserve a luz dos olhos e nos ilumine o caminho com a luz da fé e da união."
            </blockquote>

            <p>
              A festa que lhe dedicamos é um dos momentos mais marcantes do ano. É o culminar de meses de preparação, onde o espírito de voluntariado e o respeito pela nossa herança cultural se cruzam, mostrando que a história de Moreira de Cónegos se continua a escrever com a dedicação das suas gentes.
            </p>
          </div>

        </article>
      </div>
    </main>
  );
}