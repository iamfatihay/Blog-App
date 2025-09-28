import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { registerUser, loginUser, logoutUser } from "../firebase/auth";
import {
    fetchFail,
    fetchStart,
    loginSuccess,
    logoutSuccess,
    profileSuccess,
    registerSuccess,
} from "../features/authSlice";

const useAuthCall = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { token } = useSelector((state) => state.auth); // Artık kullanılmıyor

    // Firebase kullanıyoruz, API URL'ye ihtiyaç yok

    const login = async (userInfo) => {
        dispatch(fetchStart());

        try {
            const result = await loginUser(userInfo.email, userInfo.password);

            if (result.success) {
                const data = {
                    key: result.user.token,
                    user: result.user,
                };
                dispatch(loginSuccess(data));
                dispatch(profileSuccess(data));
                toastSuccessNotify("Giriş başarılı!");
                navigate("/");
            } else {
                dispatch(fetchFail());
                toastErrorNotify(result.error || "Giriş yapılamadı");
            }
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Giriş yapılamadı");
        }
    };

    const logout = async () => {
        dispatch(fetchStart());

        try {
            const result = await logoutUser();

            if (result.success) {
                dispatch(logoutSuccess());
                toastSuccessNotify("Çıkış başarılı!");
                navigate("/");
            } else {
                // Firebase logout hatası olsa bile local logout yap
                dispatch(logoutSuccess());
                toastSuccessNotify("Çıkış yapıldı");
                navigate("/");
            }
        } catch (error) {
            // Hata durumunda bile logout yap
            dispatch(logoutSuccess());
            toastSuccessNotify("Çıkış yapıldı");
            navigate("/");
        }
    };

    const register = async (userInfo) => {
        dispatch(fetchStart());

        try {
            const result = await registerUser(
                userInfo.email,
                userInfo.password,
                userInfo
            );

            if (result.success) {
                const data = {
                    key: result.user.token,
                    user: result.user,
                };
                dispatch(registerSuccess(data));
                dispatch(profileSuccess(data));
                toastSuccessNotify("Kayıt başarılı!");
                navigate("/login");
            } else {
                dispatch(fetchFail());
                toastErrorNotify(result.error || "Kayıt yapılamadı");
            }
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Kayıt yapılamadı");
        }
    };

    return { login, register, logout };
};

export default useAuthCall;
