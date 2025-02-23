import React from 'react';
import { MdLanguage, MdScience, MdCalculate } from 'react-icons/md';
import { FaPersonHiking } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const exams = [
  { 
    title: 'Linguagens', 
    color: 'from-yellow-400 to-yellow-500', 
    textColor: 'text-yellow-500', 
    buttonHover: 'hover:bg-yellow-600',
    description: 'Teste seus conhecimentos em Língua Portuguesa, Literatura e Inglês/Espanhol.',
    onClickPath: "/lesson/lin",
    icon: <MdLanguage size={50} className="text-white" />
  },
  { 
    title: 'Ciências Humanas', 
    color: 'from-blue-400 to-blue-500', 
    textColor: 'text-blue-500', 
    buttonHover: 'hover:bg-blue-600',
    description: 'História, Geografia, Filosofia e Sociologia te esperam aqui!',
    onClickPath: "/lesson/hum",
    icon: <FaPersonHiking size={50} className="text-white" />
  },
  { 
    title: 'Ciências da Natureza', 
    color: 'from-green-400 to-green-500', 
    textColor: 'text-green-500', 
    buttonHover: 'hover:bg-green-600',
    description: 'Biologia, Química e Física para você desafiar seu conhecimento.',
    onClickPath: "/lesson/nat",
    icon: <MdScience size={50} className="text-white" />
  },
  { 
    title: 'Matemática', 
    color: 'from-red-400 to-red-500', 
    textColor: 'text-red-500', 
    buttonHover: 'hover:bg-red-600',
    description: 'Domine os números com questões de Álgebra, Geometria e Estatística.',
    icon: <MdCalculate size={50} className="text-white" />
  },
];

const Home = () => {
  const navigate = useNavigate()

  const navegar = (path)=>{
    navigate(path)
  }
  return (
    <div className='p-8 mb-20 md:mb-0'>
      <h1 className='text-3xl font-bold mb-6 text-gray-700'>Escolha uma prova</h1>
      <div className='grid md:grid-cols-2 xl:grid-cols-2 gap-6'>
        {exams.map((exam, index) => (
          <div 
            key={index} 
            className={`group p-5 rounded-lg shadow-lg bg-gradient-to-r ${exam.color} text-white flex flex-col justify-between transform transition-transform duration-300`}
          >
            <div className="flex items-center gap-4">
              {exam.icon}
              <h2 className='text-2xl font-semibold'>{exam.title}</h2>
            </div>
            <button 
              onClick={()=>navegar(exam.onClickPath)}
              className={`mt-4 px-4 py-2 bg-white ${exam.textColor} font-semibold rounded-md transition-all transform hover:scale-101 cursor-pointer hover:text-white ${exam.buttonHover}`}
            >
              Iniciar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
