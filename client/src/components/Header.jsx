import React, { useEffect, useState } from 'react'
import { FaBars, FaFire } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import UserMenu from './UserMenu';
import MobileUserMenu from './MobileUserMenu';

const Header = () => {

    const user = useSelector(state => state?.user)

    const [openMenu, setOpenMenu] = useState(false)
    const [openMobileMenu, setOpenMobileMenu] = useState(false)

    return (

        <div className='sticky top-0 shadow-md h-24 bg-white max-w-[150rem] mx-auto z-50'>
            <div className='flex justify-between items-center h-full md:mx-16 mx-5'>
                <Link to={"/main/home"} className='flex gap-2 items-center justify-center cursor-pointer'>
                    <div className='h-10 w-10 bg-blue-500 p-2 rounded-full flex justify-center items-center '>
                        {/* Logo */}
                        <span className='text-white text-lg font-semibold'>CE</span>
                    </div>
                    <p className='font-bold text-xl md:flex '>Central Enem</p>
                </Link>

                <div className='md:flex justify-center items-center gap-6 hidden'>
                    {
                        user?._id &&                     <div className='flex items-center justify-center gap-2 bg-gray-200 py-3 px-4 rounded'>
                        <FaFire size={25} className='text-red-500'/>
                        <p className='font-bold'>{user?.streakNo}</p>
                    </div>
                    }
                    
                    {user?._id ?
                        <div className='relative'>

                            
                            <div onClick={() => setOpenMenu(prev => !prev)}
                                className='rounded-full text-blue-500 h-10 w-10 flex items-center justify-center cursor-pointer'>
                                {
                                    user?.avatar ? (
                                        <img className="w-full h-full rounded-full" src={user.avatar} alt="User Avatar" />
                                    ) : (
                                        <FaUserCircle className='w-full h-full' />
                                    )
                                }

                            </div>
                            {
                                openMenu && <UserMenu setOpenMenu={setOpenMenu} />
                            }
                        </div>
                        : <Link to={"/auth"} className='cursor-pointer hover:underline text-gray-800 font-bold'>Entrar</Link>}
                </div>
                {
                    user?._id ? (
                        <div className='flex items-center justify-center gap-6 md:hidden lg:hidden'>
                                                <div className='flex items-center justify-center gap-2 bg-gray-200 py-3 px-4 rounded'>
                        <FaFire size={25} className='text-red-500'/>
                        <p className='font-bold'>{user?.streakNo}</p>
                      </div>
                        
                        <div
                            onClick={() => setOpenMobileMenu(prev => !prev)}
                            className=" cursor-pointer"
                        >
                            <FaBars size={20} />
                        </div>

                        </div>
                    ) : (
                        <Link
                            to={"/auth"}
                            className="cursor-pointer hover:underline text-gray-800 font-bold md:hidden lg:hidden"
                        >
                            Entrar
                        </Link>
                    )
                }


            </div>

            {
                openMobileMenu && <MobileUserMenu setOpenMobileMenu={setOpenMobileMenu} />
            }
        </div>

    )
}

export default Header
