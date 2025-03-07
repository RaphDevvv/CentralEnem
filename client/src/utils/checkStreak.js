import summaryApi from "../common/summaryApi"
import { endStreak } from "../store/userslice"
import Axios from "./axios"

const checkStreak = async (dispatch)=>{
    try {
      const res = await Axios({
        ...summaryApi.check_streak
      })

      if (res.data.reset) {
        dispatch(endStreak(0))
        console.log("funcionou")
      } else {
        console.log("streak em dia")
      }
    } catch (error) {
      console.log("ERRO AQUI", error)
    }
  }

  export default checkStreak
