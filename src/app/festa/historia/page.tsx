import Image from 'next/image';

export default function HistoriaPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* CABEÇALHO */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            A Nossa História
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* CORPO DO TEXTO */}
        <article className="bg-white p-8 md:p-14 rounded-3xl shadow-xl border border-gray-100 text-lg text-gray-700 leading-relaxed space-y-8">
          
          <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-3 first-letter:float-left">
            A tradição da Festa de Santa Luzia em Moreira de Cónegos é um dos marcos mais importantes da nossa comunidade. Ano após ano, gerações reúnem-se para celebrar, honrar as raízes locais e manter viva uma herança que define a nossa identidade.
          </p>

          <p>
            Desde os tempos mais antigos, a devoção e o espírito de união transformam as ruas da freguesia. O que começou como uma celebração modesta, cresceu e adaptou-se aos novos tempos, sem nunca perder a sua essência. A Comissão de Festas trabalha incansavelmente para garantir que cada edição seja memorável.
          </p>

          {/* ÁREA DE IMAGEM DE DESTAQUE */}
          <div className="relative w-full h-80 md:h-96 my-10 rounded-2xl overflow-hidden shadow-md bg-gray-200">
            {/* Substituir o src por uma imagem real histórica depois */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold">
               [ IMAGEM HISTÓRICA AQUI ]
            </div>
          </div>

          <h3 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            Preservar o Passado, Construir o Futuro
          </h3>

          <p>
            Hoje, a festa não é apenas um momento de reflexão, mas também um ponto de encontro. Entre arruadas de bombos, magustos e o habitual fogo de artifício, a freguesia ganha uma nova vida. Este espaço serve como um arquivo vivo da nossa memória coletiva, para que as gerações futuras saibam sempre de onde viemos.
          </p>

        </article>
      </div>
    </main>
  );
}