import React, { useEffect, useState } from 'react'
import toastError from '../utils/toasterror'
import Axios from '../utils/axios'
import summaryApi from '../common/summaryApi'
import { MdOutlineClose } from "react-icons/md";
import parse from 'html-react-parser'
import Divider from '../components/Divider';
import { TbCircleLetterAFilled } from "react-icons/tb";
import { TbCircleLetterBFilled } from "react-icons/tb";
import { TbCircleLetterCFilled } from "react-icons/tb";
import { TbCircleLetterDFilled } from "react-icons/tb";
import { TbCircleLetterEFilled } from "react-icons/tb";
import correctEffect from '../assets/correct.mp3';
import wrongEffect from '../assets/wrong.mp3';
import { useLocation, useNavigate } from 'react-router-dom';
import LessonDone from './LessonDone';

const LessonSubject = () => {
    const [questionArray, setQuestionArray] = useState([])
    const [currentQIndex, setCurrentQIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [correctIndex, setCorrectIndex] = useState()
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [progressPercent, setProgressPercent] = useState(0)
    const [lessonDone, setLessonDone] = useState(false)
    const [disableButtons, setDisableButtons] = useState(false)
    const location = useLocation();

    const getQuestions = async () => {
        try {
            const splitPath = location.pathname.split("/");
            const lastSegment = splitPath[splitPath.length - 1];
    
            console.log(lastSegment);
    
            const res = await Axios({
                ...summaryApi[`get_${lastSegment}`]
            });
    
            if (res.data.success) {
                setQuestionArray(res.data.data);
            }
        } catch (error) {
            toastError(error);
        }
    };
    

    const handleInLesson = async (qid, userIndex)=>{
        try {
            const res = await Axios({
                ...summaryApi.in_lesson_update_create,
                data: {
                    qid: qid,
                    userIndex: userIndex
                }
            })

            if (res.data.success) {
                console.log("deu certo fi")
            }


        } catch (error) {
            toastError(error)
        }
    }

    const handleSetSIndex = (index) => {
        setSelectedIndex(index);
        setDisableButtons(true)

        const qid = questionArray[currentQIndex]?._id
        const correctIndex = questionArray[currentQIndex]?.corretaIndex
        const userIndex = index

        handleInLesson(qid, userIndex)

        if (correctIndex === userIndex) {
            setCorrectIndex(correctIndex);
            setOpenSuccess(true)

            const correct = new Audio(correctEffect);
            correct.play();
        }

        if (correctIndex !== userIndex) {
            setCorrectIndex(correctIndex);
            setOpenFail(true)

            const wrong = new Audio(wrongEffect)
            wrong.play()
        }
    };

    const nextQuestion = () => {
        setOpenSuccess(false); 
        setOpenFail(false)
        setSelectedIndex(null); 
        setCorrectIndex(null); 
        setDisableButtons(false)

        if (currentQIndex < questionArray.length - 1) {
            setCurrentQIndex((prevIndex) => prevIndex + 1);
            window.scrollTo(0, 0);
        } else { setLessonDone(true) }
    };

    const progressBarCalc = () => {
        const actualQIndex = (currentQIndex + 1)
        const actualQArray = (questionArray.length + 1)

        const percent = ((actualQIndex) / (actualQArray)) * 100

        let roundedPercent = Math.ceil(percent);

        setProgressPercent(roundedPercent)
    };

    useEffect(() => {
        progressBarCalc();
    }, [currentQIndex, questionArray]);

    useEffect(() => {
        const timer = setTimeout(() => {
            getQuestions();
        }, 500); 
        return () => clearTimeout(timer); 
    }, []);


    useEffect(() => {
        const deleteInLesson = async ()=>{
            try {
                const res = await Axios({
                    ...summaryApi.in_lesson_delete
                })

                if (res.data.success) {
                    console.log("deletou")
                }
            } catch (error) {
                toastError(error)
            }
        }

        const handleBeforeUnload = () => {
            deleteInLesson()
        };
    
        const handlePopState = () => {
            deleteInLesson()
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        deleteInLesson();
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
          window.removeEventListener('popstate', handlePopState);
        };
      }, [location.pathname]);

    return (
        <div className='container mx-auto'>
            { lessonDone && <LessonDone/> } 

            {
                questionArray.length > 0 &&  <div className={`px-auto shadow bg-white mx-3 lg:mx-0 ${lessonDone && "hidden"}`}>

                <div className='sticky top-24'>
                    <div className="flex justify-center items-center gap-2 bg-white md:p-6 p-6">
                        <div className="w-[60rem] h-[1rem] bg-gray-200 rounded-lg p-2 relative">
                            <div className={`absolute top-0 left-0 h-full bg-blue-400 rounded-lg`} style={{ width: `${progressPercent}%` }}></div>
                        </div>

                        <div className='hover:bg-gray-300 cursor-pointer rounded-full p-1 font-bold text-gray-600'>
                            <MdOutlineClose size={20} />
                        </div>
                    </div>
                </div>

                <div className=' mx-auto px-6 md:px-16 pb-25 '>
                    <div className='flex items-center justify-center'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='w-full'>
                                <div className='flex gap-1'>
                                    <strong className='text-lg flex-start'> {questionArray[currentQIndex]?.numero}</strong>
                                    <p className='text-lg font-medium'>( {questionArray[currentQIndex]?.ano})</p>
                                </div>
                                <Divider />
                            </div>
                            <div className='max-w-[50rem] mr-auto'>
                                {
                                    questionArray.length > 0 && parse(
                                        questionArray[currentQIndex]?.html.replace(
                                            "<img/>",
                                            '<img className="w-[30rem]" />'
                                        )
                                    )
                                }

                            </div>

                            <p className='mt-4 text-md max-w-[50rem] mr-auto'>{questionArray[currentQIndex]?.comando}</p>

                            {/* Loop through the alternatives and render them */}
                            <div className="mt-4 w-full">
                                {questionArray.length > 0 && questionArray[currentQIndex]?.alternativas?.map((alt, index) => (
                                    <div key={index} className='flex items-center justify-center gap-1' >
                                        <div>
                                            {
                                                index === 0 ? <TbCircleLetterAFilled size={30} className='text-gray-800 cusror-pointer' /> : ""
                                            }

                                            {
                                                index === 1 ? <TbCircleLetterBFilled size={30} className='text-gray-800 cusror-pointer' /> : ""
                                            }

                                            {
                                                index === 2 ? <TbCircleLetterCFilled size={30} className='text-gray-800 cusror-pointer' /> : ""
                                            }

                                            {
                                                index === 3 ? <TbCircleLetterDFilled size={30} className='text-gray-800 cusror-pointer' /> : ""
                                            }

                                            {
                                                index === 4 ? <TbCircleLetterEFilled size={30} className='text-gray-800 cusror-pointer' /> : ""
                                            }
                                        </div>
                                        <div
                                            onClick={() => handleSetSIndex(index)}
                                            className={` max-w-[40rem] md:w-[40rem] w-full mb-2 text-gray-800 p-4 cursor-pointer rounded-lg border-2 shadow transition duration-300 hover:bg-blue-100 border-blue-500 ${index === correctIndex ? "bg-green-200 hover:bg-green-200" : ""} ${disableButtons ? "pointer-events-none" : ""}`}
                                        >
                                            {alt}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {
                    openSuccess && (
                        <div className='sticky bottom-0 bg-green-200 text-white max-w-[50rem] mx-auto px-6 py-4 rounded-lg shadow-lg flex justify-between items-center animate-slide-up'>
                            <h2 className="text-xl font-semibold text-green-600">Resposta correta!</h2>
                            <button
                                onClick={nextQuestion}
                                className="cursor-pointer bg-white text-green-600 px-4 py-2 rounded-lg font-medium shadow-md hover:bg-gray-100 transition"
                            >
                                Próxima questão →
                            </button>
                        </div>
                    )
                }

                {
                    openFail && (
                        <div className='sticky bottom-0 bg-red-200 text-white max-w-[50rem] mx-auto px-6 py-4 rounded-lg shadow-lg flex justify-between items-center animate-slide-up'>
                            <h2 className="text-xl font-semibold text-red-600">Resposta errada!</h2>
                            <button
                                onClick={nextQuestion}
                                className="cursor-pointer bg-white text-red-600 px-4 py-2 rounded-lg font-medium shadow-md hover:bg-gray-100 transition"
                            >
                                Próxima questão →
                            </button>
                        </div>
                    )
                }

            </div>
            }
        </div>
    )
}

export default LessonSubject
