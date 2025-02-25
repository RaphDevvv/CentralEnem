import React, { useEffect, useState } from 'react';
import { FaHome } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdOutlineNoteAlt } from "react-icons/md";
import { FaTrophy } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { CgMoreO, CgProfile } from "react-icons/cg";
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoGraph } from "react-icons/go";

const options = [
  {
    icon: <FaHome size={35} className="text-blue-500 hover:text-blue-700 xl:ml-7" />,
    name: "Home",
    route: "/main/home",
  },
  {
    icon: <MdOutlineNoteAlt size={35} className="text-yellow-500 hover:text-yellow-700 xl:ml-7" />,
    name: "Simulados",
    route: "/main/simulados",
  },
  {
    icon: <FaTrophy size={35} className="text-green-500 hover:text-green-700 xl:ml-7" />,
    name: "Desafios",
    route: "/main/desafios",
  },
  {
    icon: <FaRankingStar size={35} className="text-red-500 hover:text-red-700 xl:ml-7" />,
    name: "Ranking",
    route: "/main/ranking",
  },
  {
    icon: <GoGraph size={35} className="text-purple-500 hover:text-purple-700 xl:ml-7" />,
    name: "Estatísticas",
    route: "/main/estatisticas",
  },
];

const Main = () => {
  const [moreOpt, setMoreOpt] = useState(false)
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/main') {
      navigate('/main/home');
    }
  }, []); // Dependência vazia -> executa apenas uma vez ao montar


  return (
    <div className='max-w-[150rem] mx-auto'>
      <div className='md:grid xl:grid-cols-[250px_1fr] lg:grid-cols-[120px_1fr] md:grid-cols-[120px_1fr]'>
        {/* Sidebar para telas maiores */}
        <div className='bg-white md:block hidden'>
        <div className='overflow-y-scroll max-h-[calc(100vh-100px)]  sticky top-24'>
          <div className='flex md:flex-col space-y-5 md:py-5 px-4'>
            {options.map((item, index) => (
              <div 
                key={index}
                onClick={() => navigate(item.route)}
                className={`px-auto py-5 flex items-center md:justify-center xl:justify-normal lg:gap-2 md:gap-0 hover:bg-blue-100 ${location.pathname === item.route ? 'bg-blue-100' : ''} p-2 rounded cursor-pointer`}>
                {item.icon}
                <p className='font-medium text-lg hidden xl:block'>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Main content */}
        <div>
          <Outlet/>
        </div>

        {/* Sidebar for mobile (fixed at bottom) */}
        <div className='md:hidden fixed bottom-0 w-full  border-t-2 border-gray-300'>
          <div className='flex justify-around py-3 bg-white'>
            <div 
            onClick={()=>navigate("/main/home")}
            className='flex flex-col items-center hover:bg-gray-200 p-2 rounded cursor-pointer'>
              <FaHome size={26} className='text-blue-500 hover:text-blue-700' />
              <p className='text-sm'>Home</p>
            </div>
            <div 
            onClick={()=>navigate("/main/simulados")}
            className='flex flex-col items-center hover:bg-gray-200 p-2 rounded cursor-pointer'>
              <MdOutlineNoteAlt size={26} className='text-yellow-500 hover:text-yellow-700' />
              <p className='text-sm'>Simulados</p>
            </div>
            <div 
            onClick={()=>navigate("/main/desafios")}
            className='flex flex-col items-center hover:bg-gray-200 p-2 rounded cursor-pointer'>
              <FaTrophy size={26} className='text-green-500 hover:text-green-700' />
              <p className='text-sm'>Desafios</p>
            </div>
            <div 
              onClick={()=>setMoreOpt(!moreOpt)}
              className='flex flex-col items-center hover:bg-gray-200 p-2 rounded cursor-pointer'>
              <CgMoreO size={26} className='text-gray-500 hover:text-gray-700' />
              <p className='text-sm'>Mais</p>
            </div>
          </div>
          {
            moreOpt && <div className='absolute top-[-5.5rem] bg-white p-2 w-full'>
                <div 
                onClick={() => {navigate("/main/ranking"), setMoreOpt(false)}}
                className='flex flex-row items-center hover:bg-gray-200 p-2 rounded cursor-pointer gap-2'>
                <FaRankingStar size={20} className='text-red-500 hover:text-red-700' />
                <p className='text-sm'>Ranking</p>
              </div>
              <div 
                onClick={() => {navigate("/main/estatisticas"), setMoreOpt(false)}}
                className='flex flex-row items-center hover:bg-gray-200 p-2 rounded cursor-pointer gap-2'>
                <GoGraph size={20} className='text-purple-500 hover:text-purple-700' />
                <p className='text-sm'>Estatísticas</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Main;
