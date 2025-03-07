import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import toastError from '../utils/toasterror';
import Axios from '../utils/axios';
import summaryApi from '../common/summaryApi';
import { MdLanguage, MdScience, MdCalculate } from 'react-icons/md';
import { FaPersonHiking } from "react-icons/fa6";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Stats = () => {
  const [resData, setResData] = useState()
  const [selectedSub, setSelectedSub] = useState("lin")
  
  const handleStats = async ()=>{
    try {
      const res = await Axios({
        ...summaryApi.get_stats,
        data: {
          sub: selectedSub
        }
      })

      if (res.data.success) {
        setResData(res.data.data)

      }
    } catch (error) {
      toastError(error)
    }
  }
  
  useEffect(()=>{
    handleStats()
  },[selectedSub])

  const findHeaderName = (selectedSub) => {
    const subject = subjects.find(subject => subject.shortName === selectedSub);
    return subject ? subject.nome : "Matéria";
  };
  
  
  if (!resData) {
    return <div className='p-6 text-center text-gray-700 text-lg'>Carregando...</div>;
  }
  const data = {
    labels: ['Acertos', 'Erros'],
    datasets: [
      {
        data: [resData.correctNo, resData.wrongNo], 
        backgroundColor: ['#22c55e', '#ef4444'], 
        hoverOffset: 4,
      },
    ],
  };

  const mostCorrectTopics = resData?.mostCorrectTopics 
  const mostIncorrectTopics = resData?.mostWrongTopics

  const subjects = [
    {
      nome: "Linguagens",
      shortName: "lin",
      bgColor: 'bg-yellow-400',
      textColor: 'text-yellow-400'
    },
    {
      nome: "Ciências Humanas",
      shortName: "hum",
      bgColor: 'bg-blue-400',
      textColor: 'text-blue-400'
    },
    {
      nome: "Ciências da Natureza",
      shortName: "nat",
      bgColor: 'bg-green-400',
      textColor: 'text-green-400'
    },
    {
      nome: "Matemática",
      shortName: "mat",
      bgColor: 'bg-red-400',
      textColor: 'text-red-400'
    }
  ];
  return (

    <div className='p-6'>
    <div className='flex flex-row mb-6 rounded gap-2 overflow-y-scroll no-scrollbar'>
      {subjects.map((subject, index) => (
        <div
          key={index}
          onClick={()=>setSelectedSub(subject.shortName)}
          className={`flex items-center justify-center gap-2 p-2  rounded cursor-pointer transition durations-300  shadow-lg ${selectedSub === subject.shortName ? `bg-white ${subject.textColor}` : `text-white ${subject.bgColor}`}`}
        >
          <p className={`font-semibold text-nowrap `}>{subject.nome}</p>
        </div>
      ))}
    </div>
      <div className='bg-white p-8 w-full max-w-4xl rounded-2xl shadow-xl mb-20 '>
        <h2 className='text-3xl font-bold text-gray-800 mb-4 text-center'>
          Desempenho em {findHeaderName(selectedSub)}
        </h2>
        {
          resData.totalNo > 0 ?  <div><p className='text-gray-600 text-center mb-8'>Total de questões resolvidas: <strong>{resData.totalNo}</strong></p>

          <div className='grid md:grid-cols-2 gap-6'>
            {/* Gráfico de Pizza */}
            <div className='flex justify-center'>
              <div className='w-52 md:w-60'>
                <Pie data={data} />
              </div>
            </div>
  
            {/* Seções de Tópicos Corretos e Incorretos */}
            <div className='space-y-6 lg:flex lg:space-x-6'>
              {/* Tópicos com Mais Acertos */}
          {
            mostCorrectTopics.length > 0 ?               <div>
            <p className='font-semibold text-gray-700 mb-2 '>Mais acertos em</p>
            <div className='bg-green-100 p-4 rounded-lg shadow-md'>
              <ul className='list-disc pl-5 text-gray-800'>
                {mostCorrectTopics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          </div> : ""
          }
  
              {/* Tópicos com Mais Erros */}
          {
            mostIncorrectTopics.length > 0 ?               <div>
            <p className='font-semibold text-gray-700 mb-2'>Mais erros em:</p>
            <div className='bg-red-100 p-4 rounded-lg shadow-md'>
              <ul className='list-disc pl-5 text-gray-800'>
                {mostIncorrectTopics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          </div> : ""
          }
            </div>
          </div> 
          </div>
          : <p className='text-gray-600 text-center mb-8'>Você ainda não fez questões dessa matéria</p>
        }
      </div>
    </div>
  );
};

export default Stats;
