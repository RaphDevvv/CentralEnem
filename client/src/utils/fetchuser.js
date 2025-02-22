import summaryApi from "../common/summaryApi"
import Axios from "./axios"

const fetchUser = async()=>{
    try {
        const res = await Axios({
            ...summaryApi.get_user
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUser