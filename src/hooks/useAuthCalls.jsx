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
    // const { token } = useSelector((state) => state.auth); // No longer used

    // Using Firebase, no need for API URL

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
                toastSuccessNotify("Login successful!");
                navigate("/");
            } else {
                dispatch(fetchFail());
                toastErrorNotify(result.error || "Login failed");
            }
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Login failed");
        }
    };

    const logout = async () => {
        dispatch(fetchStart());

        try {
            const result = await logoutUser();

            if (result.success) {
                dispatch(logoutSuccess());
                toastSuccessNotify("Logout successful!");
                navigate("/");
            } else {
                // Perform local logout even if Firebase logout fails
                dispatch(logoutSuccess());
                toastSuccessNotify("Logged out");
                navigate("/");
            }
        } catch (error) {
            // Perform logout even on error
            dispatch(logoutSuccess());
            toastSuccessNotify("Logged out");
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
                toastSuccessNotify("Registration successful!");
                navigate("/login");
            } else {
                dispatch(fetchFail());
                toastErrorNotify(result.error || "Registration failed");
            }
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Registration failed");
        }
    };

    return { login, register, logout };
};

export default useAuthCall;
