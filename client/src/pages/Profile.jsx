import React, { useState } from "react";
import { FaUserCircle, FaTrophy, FaFire, FaClipboardList, FaMedal } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import uploadImage from "../utils/uploadimage";
import Axios from "../utils/axios";
import summaryApi from "../common/summaryApi";
import toastSuccess from "../utils/toastsuccess";
import toastError from "../utils/toasterror";
import { updateAvatar } from "../store/userslice";

const Profile = () => {
    const user = useSelector(state=>state?.user)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const handleUpload = async (e)=>{
        try {
            setLoading(true)

            const file = e.target.files[0]

            const link = await uploadImage(file)

            const res = await Axios({
                ...summaryApi.upload_avatar,
                data : {
                    imageLink : link
                }
            })

            if (res.data.success) {
                toastSuccess(res.data.message)
                dispatch(updateAvatar(res.data.avatar));
            }
        } catch (error) {
            toastError(error)
        } finally {setLoading(false)}
    }
  return (
    <div className="container mx-auto">
      <div className="px-auto p-6 shadow grid grid-cols-1 md:grid-cols-2 gap-6 bg-white mx-5 lg:mx-0">
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center p-4">
          <form className={`rounded-full h-28  mb-4 relative ${loading ? "animate-pulse" : ""}`}>
          { user.avatar ? <img src={user.avatar} className="h-full w-full rounded-full"/> : <FaUserCircle className="text-gray-400 text-7xl w-full h-full" /> }
          <label htmlFor="uploadProfile" className="absolute bottom-0 right-0 cursor-pointer"><MdEdit className="bg-blue-500 rounded-full text-white p-1.5" size={30}/></label> <input
            onChange={handleUpload}
            type="file"
            id="uploadProfile"
            className="hidden"

          />
          </form>
          <h2 className="text-2xl font-semibold  text-gray-800">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Editar detalhes
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center bg-gray-200 shadow-inner-lg p-4 rounded-">
            <FaFire className="text-red-500 text-4xl mb-2" />
            <p className="text-lg font-semibold text-gray-600">Streak</p>
            <p className="text-2xl font-bold text-gray-700">{user?.streakNo}</p>
          </div>

          <div className="flex flex-col items-center bg-gray-200 shadow-inner-lg p-4 rounded-lg">
            <FaTrophy className="text-yellow-500 text-4xl mb-2" />
            <p className="text-lg font-semibold  text-gray-600 ">XP total</p>
            <p className="text-2xl font-bold text-gray-700">0</p>
          </div>

          <div className="flex flex-col items-center bg-gray-200 shadow-inner-lg p-4 rounded-lg ">
            <FaClipboardList className="text-green-500 text-4xl mb-2" />
            <p className="text-lg font-semibold  text-gray-600 w-full">Questões Totais</p>
            <p className="text-2xl font-bold text-gray-700">em breve</p>
          </div>

          <div className="flex flex-col items-center bg-gray-200 shadow-inner-lg p-4 rounded-lg">
            <FaMedal className="text-blue-500 text-4xl mb-2" />
            <p className="text-lg font-semibold  text-gray-600">Ranking</p>
            <p className="text-2xl font-bold text-gray-700">em breve</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
