import summaryApi from "../common/summaryApi"
import Axios from "./axios"
import toastError from "./toasterror"

const setDate = async (req,res)=>{
    try {
        const res = await Axios({
            ...summaryApi.set_last_lesson
        })

            if (res.data.success) {
                console.log(res.data.message)
            }
    } catch (error) {
        toastError(error)
    }
}

export default setDate