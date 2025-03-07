import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Axios from './utils/axios';
import summaryApi from './common/summaryApi';
import { endStreak, setUserDetails } from './store/userslice';
import toastError from './utils/toasterror';
import checkStreak from './utils/checkStreak';

function App() {
  const dispatch = useDispatch()
  
  const fetchUser = async ()=>{ 
    try {
        const res = await Axios({
            ...summaryApi.get_user
        })

        const { data : resData } = res

        if (resData.success) {
            dispatch(setUserDetails(resData.data));
        }

    } catch (error) {
        console.log("ERROR AQUI", error)
    }
}

  const location = useLocation()

  useEffect(()=>{

    fetchUser()
  },[])
  return (
    <main>
      {
        location.pathname !== "/" && <Header /> // Only render Header if not on the landing page
      }
      <Outlet />
      <ToastContainer />
    </main>
  );
}

export default App;
