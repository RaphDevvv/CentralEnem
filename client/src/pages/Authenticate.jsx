import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ilustration from '../assets/5500661.jpg';
import Divider from '../components/Divider';
import { FcGoogle } from "react-icons/fc";
import Axios from '../utils/axios';
import summaryApi from '../common/summaryApi';
import toastSuccess from '../utils/toastsuccess';
import toastError from '../utils/toasterror';
import fetchUser from '../utils/fetchuser';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userslice';

const Authenticate = () => {
  const user = useSelector(state=>state?.user)
  const navigate = useNavigate()
  const [login, setLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const res = await Axios({
        ...summaryApi.register,
        data: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        }
      });

      if (res.data.success) {
        
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        const uDetails = await fetchUser()
        dispatch(setUserDetails(uDetails.data))
        navigate("/main/home")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await Axios({
        ...summaryApi.login,
        data: {
          email: formData.email,
          password: formData.password
        }
      });

      if (res.data.success) {
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        const uDetails = await fetchUser()
        dispatch(setUserDetails(uDetails.data))
        navigate("/main/home")
        toastSuccess(res.data.message)
      }
    } catch (error) {
      toastError(error)
    }
  };

  useLayoutEffect(()=>{
    if (user?._id) {
      navigate("/main/home")
    }
  },[user])

  return (
    <div className='container mx-auto px-5 md:grid md:grid-cols-2'>
      <div className='bg-white'>
        <div className='hidden md:flex justify-center mx-auto items-center p-6 max-h-[31rem]'>
          <img src={Ilustration} alt="Illustration" className='max-w-md' />
        </div>
      </div>

      <div className='bg-white py-8 px-4 md:py-12 md:px-8 flex justify-center rounded'>
        <div className='w-full max-w-md p-4'>
          <div className='flex'>
            <div className='space-y-1 w-full flex flex-col items-center cursor-pointer group' onClick={() => setLogin(true)}>
              <h2 className='font-semibold text-2xl text-gray-800 text-center'>Login</h2>
              <div className={`p-[1.5px] w-[70%] ${login ? "bg-blue-400" : "bg-white"} group-hover:bg-blue-400 transition-colors duration-300`}></div>
            </div>
            <div className='space-y-1 w-full flex flex-col items-center cursor-pointer group' onClick={() => setLogin(false)}>
              <h2 className='font-semibold text-2xl text-gray-800 text-center'>Registrar</h2>
              <div className={`p-[1.5px] w-[70%] ${login ? "bg-white" : "bg-blue-400"} group-hover:bg-blue-400 transition-colors duration-300`}></div>
            </div>
          </div>

          <Divider />

          {login ? (
            <div className='space-y-4'>
              <div className='flex flex-col'>
                <label className='font-medium text-sm text-gray-800'>Email</label>
                <input type='email' name='email' value={formData.email} onChange={handleChange} className='py-1 px-2 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300' />
              </div>

              <div className='flex flex-col'>
                <label className='font-medium text-sm text-gray-800'>Senha</label>
                <input type='password' name='password' value={formData.password} onChange={handleChange} className='py-1 px-2 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300' />
              </div>

              <button onClick={handleLogin} className='w-full py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300 cursor-pointer rounded-sm'>
                Confirmar
              </button>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='flex flex-col'>
                <label className='font-medium text-sm text-gray-800'>Nome</label>
                <input name='name' value={formData.name} onChange={handleChange} className='py-1 px-2 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300' />
              </div>

              <div className='flex flex-col'>
                <label className='font-medium text-sm text-gray-800'>Email</label>
                <input name='email' value={formData.email} onChange={handleChange} className='py-1 px-2 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300' />
              </div>

              <div className='flex flex-col'>
                <label className='font-medium text-sm text-gray-800'>Senha</label>
                <input name='password' value={formData.password} onChange={handleChange} className='py-1 px-2 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300' />
              </div>

              <div className='flex flex-col'>
                <label className='font-medium text-sm text-gray-800'>Confirmar senha</label>
                <input name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} className='py-1 px-2 border border-blue-500 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300' />
              </div>

              <button onClick={handleRegister} className='w-full py-3 bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300 cursor-pointer rounded-sm'>
                Confirmar
              </button>
            </div>
          )}

          <Divider />

          <div className='flex justify-center items-center w-full border border-gray-400 rounded-lg py-3 gap-1 cursor-pointer'>
            <FcGoogle size={28} />
            <p className='text-gray-700 text-md'>Google Login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;