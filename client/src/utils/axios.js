import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;


const Axios = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // Para garantir que cookies sejam enviados nas requisições
});


export default Axios;
