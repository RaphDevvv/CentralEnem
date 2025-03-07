import React, { useState, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import toastError from '../utils/toasterror';
import Axios from '../utils/axios';
import summaryApi from '../common/summaryApi';
import { Link, useNavigate } from 'react-router-dom';

const Ranking = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  const fetchUsers = async ()=>{
    try {
      const res = await Axios({
        ...summaryApi.users_rank
      })
      console.log(res)

      if (res.data.success) {
        setUsers(res.data.data)
        console.log(res.data)
      }
    } catch (error) {
      toastError(error)
    }
  }

  const formatName = (name) => {
    const finalName = name.replace(/ /g, "-");
    return finalName;
};


  useEffect(()=>{
    fetchUsers()
  },[])
  
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 414);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 360);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='p-6 mb-20 md:mb-0 flex flex-col items-center'>
      <div className='w-full max-w-3xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 mb-6 rounded-lg shadow-lg text-center'>
        <h1 className='text-3xl font-bold'>Ranking por XP</h1>
      </div>  

      <div className='w-full max-w-3xl flex flex-col gap-4'>
        {users.map((user, index) => (
          <Link key={index} 
          to={`/user-profile/${formatName(user.name)}`}
          className=' cursor-pointer bg-white hover:bg-gray-100 active:bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center hover:scale-101 active:scale-101 transition-transform'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-md'>
                {
                  user?.avatar ? <img className='w-full h-full rounded-full' src={user?.avatar}/> :  <FaUserCircle className='text-blue-500 w-full h-full' />
                }
              </div>
              <div className='flex flex-col'>
                <p className={`font-semibold text-gray-700 md:text-lg break-words md:max-w-[20rem] ${isSmallScreen ? 'max-w-[6rem]' : 'max-w-[10rem]'}`}>{user.name}</p>
                <p className='font-medium text-gray-600 text-md'>{user.xp} XP</p>
              </div>
            </div>

            <div className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center font-semibold md:text-lg shadow-md'>
              <p># {index + 1}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
