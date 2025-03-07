import React, { useEffect, useState } from "react";
import { FaUserCircle, FaTrophy, FaFire, FaClipboardList, FaMedal } from "react-icons/fa";
import Axios from "../utils/axios";
import summaryApi from "../common/summaryApi";
import toastError from "../utils/toasterror";
import { useLocation } from "react-router-dom";

const DiffUserProfile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState(null);
    const location = useLocation();

    const handleGetUser = async () => {
        try {
            if (name) {
                const res = await Axios({
                    ...summaryApi.find_user_by_name,
                    data: { name },
                });

                if (res.data.success) {
                    setUser(res.data.user);
                }
            }
        } catch (error) {
            toastError(error);
        }
    };

    const getNameFromUrl = () => {
        const url = location.pathname;
        const splitArray = url.split("/");
        let finalName = splitArray[2];

        // Replace all dashes (-) with spaces
        finalName = finalName.replace(/-/g, " ");
        setName(finalName);
    };

    useEffect(() => {
        getNameFromUrl();
    }, [location.pathname]); 


    useEffect(() => {
        if (name) {
            handleGetUser();
        }
    }, [name]); 

    return (
        <div>
            {user ? (
                <div className="container mx-auto">
                    <div className="px-auto p-6 shadow grid grid-cols-1 md:grid-cols-2 gap-6 bg-white mx-5 lg:mx-0">
                        {/* Profile Info */}
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="rounded-full h-28 w-28 relative mb-4 border-1 border-blue-400">
                                {user?.avatar ? (
                                    <img src={user.avatar} className="w-full h-full rounded-full" />
                                ) : (
                                    <FaUserCircle className="w-full h-full rounded-full text-blue-500" />
                                )}
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                Enviar solicitação
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
                                <p className="text-lg font-semibold text-gray-600 ">Xp</p>
                                <p className="text-2xl font-bold text-gray-700">{user?.xp}</p>
                            </div>

                            <div className="flex flex-col items-center bg-gray-200 shadow-inner-lg p-4 rounded-lg ">
                                <FaClipboardList className="text-green-500 text-4xl mb-2" />
                                <p className="text-lg font-semibold text-gray-600">Questões feitas</p>
                                <p className="text-2xl font-bold text-gray-700">{user?.totalQuestions}</p>
                            </div>

                            <div className="flex flex-col items-center bg-gray-200 shadow-inner-lg p-4 rounded-lg">
                                <FaMedal className="text-blue-500 text-4xl mb-2" />
                                <p className="text-lg font-semibold text-gray-600">Ranking</p>
                                <p className="text-2xl font-bold text-gray-700">em breve</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Usuario não encontrado</p>
            )}
        </div>
    );
};

export default DiffUserProfile;
