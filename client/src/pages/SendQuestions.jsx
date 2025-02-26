import React, { useEffect, useState } from 'react'
import uploadImage from '../utils/uploadimage'
import parse from 'html-react-parser'
import toastError from '../utils/toasterror'
import Axios from '../utils/axios'
import summaryApi from '../common/summaryApi'
import toastSuccess from '../utils/toastsuccess'

const SendQuestions = () => {
    const [data, setData] = useState({
        numero: '',
        ano: '',
        prova: '',
        conteudo: [],
        html: '',
        comando: '',
        alternativas: ['', '', '', '', ''],
        corretaIndex: ''
    })

    const handlePostQuestion = async ()=>{
        try {
            const res = await Axios({
                ...summaryApi.post_question,
                data: {
                    numero: data.numero,
                    ano: data.ano,
                    prova: data.prova,
                    conteudo: data.conteudo,
                    html: data.html,
                    comando: data.comando,
                    alternativas: data.alternativas,
                    corretaIndex: data.corretaIndex
                }
            })

            if (res.data.success) {
                setData({
                    numero: '',
                    ano: '',
                    prova: '',
                    conteudo: [],
                    html: '',
                    comando: '',
                    alternativas: ['', '', '', '', ''],
                    corretaIndex: ''
                })
                toastSuccess(res.data.message)
            }
        } catch (error) {
            toastError(error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))

        console.log(data)
    }

    const addHtmlButton = (htmlTag) => {
        setData(prevData => ({
            ...prevData,
            html: prevData.html + htmlTag  // Append the HTML tag to the existing HTML
        }))
    }

    const [imgLink, setImgLink] = useState("")

    const onChangeImg = async (e)=>{
        setImgLink('...')
        const file = e.target.files[0]

        const link = await uploadImage(file)

        setImgLink(link)

    }

    return (
        <div className="container mx-auto">
            <div className="px-auto p-6 md:p-8 shadow grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-6 bg-white mx-5 lg:mx-0">
                <div className="flex flex-col space-y-8 mb-8">
                    <strong className="text-2xl text-gray-800 text-center md:text-left">Enviar Questões</strong>

                    <div className='flex flex-row gap-2 w-full'>
                        <div className="flex flex-col gap-1 w-full">
                            <p className="font-medium text-sm text-gray-800">Numero:</p>
                            <input
                                type="text"
                                name="numero"
                                value={data.numero}
                                onChange={(e) => setData({ ...data, numero: e.target.value })}
                                className="py-2 px-3 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <p className="font-medium text-sm text-gray-800">Ano:</p>
                            <input
                                type="text"
                                name="ano"
                                value={data.ano}
                                onChange={(e) => setData({ ...data, ano: e.target.value })}
                                className="py-2 px-3 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <p className="font-medium text-sm text-gray-800">Prova de:</p>
                            <select 
                            className='py-2 px-3 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full'
                            value={data.prova}
                            name="prova"
                            onChange={handleChange}
                            >
                                <option value=""></option>
                                <option value="lin">lin</option>
                                <option value="hum">hum</option>
                                <option value="nat">nat</option>
                                <option value="mat">mat</option>
                            </select>
                        </div>
                    </div>


                    <div className="flex flex-col gap-1">
                        <p className="font-medium text-sm text-gray-800">Html:</p>
                        <textarea
                            name="html"
                            value={data.html}
                            onChange={handleChange}
                            className="py-2 px-3 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full h-24"
                        />

                        <div className='flex flex-wrap gap-2 mt-2'>
                            <button
                                onClick={() => addHtmlButton("<p></p>")}
                                className='px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg cursor-pointer'>
                                {"p -m"}
                            </button>

                            <button
                                onClick={() => addHtmlButton(`<p className="mt-2"></p>`)}
                                className='px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg cursor-pointer'>
                                {"p +m"}
                            </button>
                            <button
                                onClick={() => addHtmlButton("<p className='text-sm mt-2'></p>")}
                                className='px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg cursor-pointer'>
                                {"fonte"}
                            </button>

                            <button
                                onClick={() => addHtmlButton(`<img className="w-[30rem]" src=""/>`)}
                                className='px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg cursor-pointer'>
                                {"img q"}
                            </button>

                            <button
                                onClick={() => addHtmlButton(`<img className="w-[30rem] mx-auto" src=""/>`)}
                                className='px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg cursor-pointer'>
                                {"img qc"}
                            </button>

                            
                            <button
                                onClick={() => addHtmlButton(`<img className="w-[50rem]" src=""/>`)}
                                className='px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg cursor-pointer'>
                                {"img r"}
                            </button>

                            <button
                                onClick={() => addHtmlButton("<strong></strong>")}
                                className='px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg cursor-pointer'>
                                {"<strong/>"}
                            </button>

                            <button
                                onClick={() => addHtmlButton(`<p className="font-bold mt-2"></p>`)}
                                className='px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg cursor-pointer'>
                                {"strong +m"}
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-row gap-2'>
                        <label htmlFor='uploadFile' className='w-full py-1 text-center bg-blue-500 rounded text-white hover:bg-blue-600 transition-all cursor-pointer'>
                            Enviar imagem
                            <input type='file' className='hidden' id='uploadFile' onChange={onChangeImg}/>
                        </label>

                        <input
                        className='w-full bg-blue-50 py-1 px-2 border-2 border-blue-500 rounded'
                        value={imgLink}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                            <p className="font-medium text-sm text-gray-800">Comando:</p>
                            <input
                                type="text"
                                name="comando"
                                value={data.comando}
                                onChange={handleChange
                                }
                                className="py-2 px-3 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                            />
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-sm text-gray-800">Alternativas:</p>
                        {data.alternativas.map((alt, index) => (
                            <input
                                key={index}
                                type="text"
                                name={`alternativa-${index}`}
                                value={alt}
                                onChange={(e) => {
                                    const newAlternativas = [...data.alternativas]
                                    newAlternativas[index] = e.target.value
                                    setData({ ...data, alternativas: newAlternativas })
                                }}
                                className="py-2 px-3 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                            />
                        ))}
                    </div>

                    <div className='flex flex-row gap-2'>
                        <div className="flex flex-col gap-1">
                            <p className="font-medium text-sm text-gray-800">Conteúdo:</p>
                            <input
                                type="text"
                                name="conteudo"
                                value={data.conteudo.join(',')}
                                onChange={(e) => setData({ ...data, conteudo: e.target.value.split(',') })}
                                className="py-2 px-3 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="font-medium text-sm text-gray-800">Alternativa Correta:</p>
                            <input
                                type="number"
                                name="corretaIndex"
                                value={data.corretaIndex}
                                onChange={handleChange}
                                className="py-2 px-3 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
                            />
                        </div>
                    </div>
                        <button
                            onClick={handlePostQuestion}
                            className=" cursor-pointer py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
                        >
                            Enviar
                        </button>
                </div>

                <div className='hidden md:block'>
                    <div className={`border-2 p-3 rounded-lg min-h-[30rem] overflow-y-scroll max-h-full ${!data.html ? 'bg-gray-100 border-gray-400' : 'border-blue-500'}`}>
                        {!data.html ? (
                            <div className="flex items-center mt-5 justify-center text-gray-600 text-lg">
                                Preview estará disponível aqui
                            </div>
                        ) : (
                            <div className="p-2">{parse(data.html)}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendQuestions
