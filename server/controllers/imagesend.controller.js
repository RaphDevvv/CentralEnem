import uploadImageCloudinary from "../utils/uploadimages.js"

const uploadImagesController = async (req, res)=>{
    try {
        const file = req.file

        const imgLink = await uploadImageCloudinary(file)

        return res.json({
            message: "upload done",
            data: imgLink.url,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export default uploadImagesController