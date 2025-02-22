import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importação do CSS necessária para os toasts

const toastError = (error) => {
    const errorMsg =
    error?.response?.data?.message || 
    error?.message || 
    "An unexpected error occurred";

    toast.error(errorMsg, {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce, // Corrigido erro de importação
    });

};

export default toastError;