import React from 'react';
import Ilustration from '../assets/5500661.jpg';
import Divider from '../components/Divider';
import { FcGoogle } from "react-icons/fc";
const Register = () => {
  return (
    <div className='container mx-auto px-5 md:grid md:grid-cols-2 '>
      {/* Left Column */}
      <div className='hidden md:flex justify-center items-center bg-white p-6'>
        <img
          src={Ilustration}
          alt="Illustration"
          className='w-full max-w-md h-auto' // Imagem adaptável
        />
      </div>

      {/* Right Column */}
      <div className='bg-white py-8 px-4 md:py-12 md:px-8 flex justify-center rounded'>
        <div className='w-full max-w-md p-4'>
          <h2 className='font-semibold text-2xl text-gray-800 text-center'>
            Entre com sua conta
          </h2>
          <Divider />

          <div className='space-y-4'>
            <div className='flex flex-col'>
              <label className='font-medium text-sm text-gray-800'>Email</label>
              <input
                type="email"
                className='py-1 px-2 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-medium text-sm text-gray-800'>Senha</label>
              <input
                type="password"
                className='py-1 px-2 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300'
              />
              <div className='ml-auto text-md font-medium text-blue-600 mt-1 hover:underline cursor-pointer hover:text-blue-400'>
                esqueceu a senha?
              </div>
            </div>

            <button className='w-full py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300 cursor-pointer rounded-sm'>
              Confirmar
            </button>
          </div>

        
          <Divider/>

          <div className='flex justify-center items-center w-full border-1 border-gray-400 rounded-lg py-3 gap-1 cursor-pointer'>
            <FcGoogle size={28}/>
            <p className='text-gray-700 text-md'>google login</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
