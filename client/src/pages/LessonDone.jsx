import React, { useEffect, useState } from 'react'
import { FaUserCircle, FaTrophy, FaFire } from "react-icons/fa";
import victoryEffect from '../assets/victory.mp3';
import setStreak from '../utils/setstreak';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LessonDone = () => {
  const user = useSelector(state => state?.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Track loading state

  const playVictorynScroll = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      const victory = new Audio(victoryEffect);
      victory.play();
    }, 200);
  };

  useEffect(() => {
    const init = async () => {
      await setStreak(dispatch); // Ensure setStreak completes
      playVictorynScroll();
      setLoading(false); // Mark as ready
    };
    init();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-blue-700 text-2xl">Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-white h-screen p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-blue-700 mb-4">Lição Concluída!</h1>
        <p className="text-lg text-blue-600">Você está se saindo muito bem! Continue assim!</p>
      </div>

      <div className='flex flex-row items-center justify-center md:gap-6 gap-4 w-[20rem] md:w-[30rem] lg:w-[40rem]'>
        <div className="flex justify-center mb-8 w-full">
          <div className="bg-white p-8 rounded-xl border-2 border-blue-400 text-center w-full">
            <FaTrophy className="h-10 md:h-12 w-10 md:w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl text-blue-600 mb-2">0 XP</h2>
            <p className="text-blue-500 hidden md:block">Você ganhou de XP nesta lição!</p>
          </div>
        </div>

        <div className="flex justify-center mb-8 w-full">
          <div className="bg-white p-8 rounded-xl border-2 border-blue-400 text-center w-full">
            <FaFire className="h-10 md:h-10 w-10 md:w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl text-blue-600 mb-2">
              {user.streakNo === 1 ? `${user.streakNo} dia` : `${user?.streakNo} dias`}
            </h2>
            <p className="text-blue-500 hidden md:block">Nova streak! Mantenha o ritmo!</p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-10 mb-10">
        <Link 
          to={"/main/home"}
          className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out hover:bg-blue-700">
          Voltar
        </Link>

        <button className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out hover:bg-blue-700">
          Nova lição
        </button>
      </div>
    </div>
  );
}

export default LessonDone;
