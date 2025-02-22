import summaryApi from "../common/summaryApi"
import { setUserDetails } from "../store/userslice"
import Axios from "./axios"
import fetchUser from "./fetchuser"
import toastError from "./toasterror"


const setStreak = async (dispatch)=>{
    try {
        const res = await Axios({
            ...summaryApi.set_streak_after_lesson
        })

        if (res.data.updatePeriod) {
            const userData = await fetchUser();
            if (userData && userData.data) {
                dispatch(setUserDetails(userData.data));
            }
        }
    } catch (error) {
        toastError(error)
    }
}

export default setStreak