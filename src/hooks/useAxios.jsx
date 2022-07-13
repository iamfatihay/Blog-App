import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
    const { token } = useSelector((state) => state.auth); //& tokeni stateden okumak için axios instanceları custom hook içerinde tanımladık.
    //+ birden fazla instance oluşturabiliriz. instance ı tanımladığımız isimle kullanabiliriz.

    // Use HTTPS to avoid CORS issues
    const baseURL =
        process.env.REACT_APP_BASE_URL || "https://fullstack.clarusway.com";

    const axiosWithToken = axios.create({
        baseURL: baseURL,
        headers: { Authorization: `Token ${token}` },
    });
    const axiosWithPublic = axios.create({
        baseURL: baseURL,
    });
    return { axiosWithToken, axiosWithPublic };
};

export default useAxios;
