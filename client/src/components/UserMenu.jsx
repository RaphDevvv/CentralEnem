import React from 'react'
import Divider from './Divider'
import { useNavigate } from 'react-router-dom'
import toastError from '../utils/toasterror'
import summaryApi from '../common/summaryApi'
import toastSuccess from '../utils/toastsuccess'
import Axios from '../utils/axios'
import { useDispatch } from 'react-redux'
import { logout } from '../store/userslice'

const UserMenu = ({setOpenMenu}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    <div className='absolute bg-white p-2 right-0 rounded shadow'>
      <div 
      onClick={()=>{navigate("/profile"), setOpenMenu(false)}}
      className='p-3 py-auto hover:bg-blue-100 rounded transiton duration-300 cursor-pointer hover:text-blue-500'>
        Perfil
      </div>

    <div className='py-2'>
      <div className='bg-gray-300 p-[0.5px]'>
      </div>
    </div>

      <div 
      onClick={
        ()=>{
          handleLogout()
          navigate("/")
          setOpenMenu(false)
        }
      }
      className='p-3 py-auto hover:bg-red-100 rounded transiton duration-300 cursor-pointer hover:text-red-500'>
        LogOut
      </div>
    </div>
  )
}

export default UserMenu
