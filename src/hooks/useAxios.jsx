import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
    const { token } = useSelector((state) => state.auth); //& tokeni stateden okumak için axios instanceları custom hook içerinde tanımladık.
    //+ birden fazla instance oluşturabiliriz. instance ı tanımladığımız isimle kullanabiliriz.

    // Use HTTPS to avoid CORS issues
    const baseURL =
        process.env.REACT_APP_BASE_URL ||
        "https://35111.fullstack.clarusway.com/";

    const axiosWithToken = axios.create({
        baseURL: baseURL,
        headers: { Authorization: `Token ${token}` },
        withCredentials: true, // CORS için credentials ekle
    });

    const axiosWithPublic = axios.create({
        baseURL: baseURL,
        withCredentials: true, // CORS için credentials ekle
    });

    // CORS hataları için interceptor ekle
    axiosWithToken.interceptors.response.use(
        (response) => response,
        (error) => {
            // CORS veya diğer hataları sessizce işle
            return Promise.reject(error);
        }
    );

    return { axiosWithToken, axiosWithPublic };
};

export default useAxios;
