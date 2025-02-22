import summaryApi from "../common/summaryApi"
import Axios from "./axios"
import toastError from "./toasterror"

const uploadImage = async (image)=>{
    try {
        const formData = new FormData();
        formData.append('image', image);

        const res = await Axios({
            ...summaryApi.upload_image,
            data: formData
        })

        return res.data.data
    } catch (error) {
        toastError(error)
    }
}

export default uploadImage