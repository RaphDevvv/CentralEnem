import React from 'react'
import UserMenu from './UserMenu'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/axios'
import summaryApi from '../common/summaryApi'
import toastError from '../utils/toasterror'
import toastSuccess from '../utils/toastsuccess'
import { logout } from '../store/userslice'

const MobileUserMenu = ({setOpenMobileMenu}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)

  const handleLogout = async ()=>{
    try {
      const res = await Axios({
        ...summaryApi.logout
      })

      if (res.data.success) {
        dispatch(logout())
        localStorage.clear();
        toastSuccess(res.data.message)
      }

    } catch (error) {
      toastError(error)
    }
  }
    return (
        <div className='w-full z-50 bg-white p-2 absolute '>
            <div >
                <div 
                onClick={()=>{navigate("/profile", setOpenMobileMenu(false))}}
                className='p-3 py-auto hover:bg-blue-100 rounded transiton duration-300 cursor-pointer hover:text-blue-500'>
                    Perfil
                </div>

                <div className='py-2'>
                    <div className='bg-gray-300 p-[0.5px]'>
                    </div>
                </div>

                {
                  user?.role === "ADMIN" && <div>

                <div 
                onClick={()=>{navigate("/dev/sendq", setOpenMobileMenu(false))}}
                className='p-3 py-auto hover:bg-blue-100 rounded transiton duration-300 cursor-pointer hover:text-blue-500'>
                    Enviar questões
                </div>

                <div className='py-2'>
                    <div className='bg-gray-300 p-[0.5px]'>
                    </div>
                </div>
                  </div>
                }

                <div 
                      onClick={
                        ()=>{
                          handleLogout()
                          navigate("/")
                          setOpenMobileMenu(false)
                        }
                      }
                className='p-3 py-auto hover:bg-red-100 rounded transiton duration-300 cursor-pointer hover:text-red-500'>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default MobileUserMenu