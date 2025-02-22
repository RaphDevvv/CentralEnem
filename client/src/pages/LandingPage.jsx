import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaFire } from 'react-icons/fa';
import { FaClipboardList } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="mt-10">
        <div className="text-xl md:text-3xl font-bold flex items-center gap-2">
          <div className="w-10 h-10 bg-white text-blue-500 rounded-full flex justify-center items-center">
            <span className="text-lg font-semibold">CE</span>
          </div>
          <span>Central Enem</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center flex flex-col gap-6 justify-center items-center mt-6">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-2xl mx-auto">
          Prepare-se para o ENEM de forma divertida e eficiente!
        </h1>
        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link to="/auth" className="bg-yellow-500 text-white py-3 px-8 rounded-lg text-lg hover:bg-yellow-600 transition w-full sm:w-auto">
            Começar Agora
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-white py-12 mt-16 rounded">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <div className="flex flex-col items-center bg-blue-600 text-white p-6 rounded-lg shadow-lg">
          <FaClipboardList size={40} />
  <h3 className="text-2xl font-semibold mt-4">
    Questões Na Prática
  </h3>
  <p className="mt-2">
    Complete questões reais do ENEM, exercitando seu conhecimento e encontrando pontos fracos
  </p>
          </div>
          <div className="flex flex-col items-center bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <FaFire size={40} />
            <h3 className="text-2xl font-semibold mt-4">Sua Streak</h3>
            <p className="mt-2">Mantenha-se constante e aumente sua sequência de dias de estudo.</p>
          </div>
          <div className="flex flex-col items-center bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <FaUserCircle size={40} />
            <h3 className="text-2xl font-semibold mt-4">Perfil do Estudante</h3>
            <p className="mt-2">Acompanhe seu progresso e veja suas estatísticas de desempenho.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
