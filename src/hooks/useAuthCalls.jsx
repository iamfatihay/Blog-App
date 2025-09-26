// import React from "react";
import axios from "axios";
import {
    fetchFail,
    fetchStart,
    loginSuccess,
    logoutSuccess,
    profileSuccess,
    registerSuccess,
} from "../features/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAuthCall = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const login = async (userInfo) => {
        dispatch(fetchStart());

        // Demo mode - check for demo credentials
        const demoCredentials = {
            "demo@example.com": {
                key: "demo_token_123",
                user: {
                    id: 1,
                    username: "Demo User",
                    first_name: "Demo",
                    last_name: "User",
                    email: "demo@example.com",
                    image: null,
                    bio: "Demo user account",
                },
            },
            "test@example.com": {
                key: "test_token_456",
                user: {
                    id: 2,
                    username: "Test User",
                    first_name: "Test",
                    last_name: "User",
                    email: "test@example.com",
                    image: null,
                    bio: "Test user account",
                },
            },
            "guest@example.com": {
                key: "guest_token_789",
                user: {
                    id: 3,
                    username: "Guest User",
                    first_name: "Guest",
                    last_name: "User",
                    email: "guest@example.com",
                    image: null,
                    bio: "Guest user account",
                },
            },
        };

        // Check if it's a demo login
        if (
            (demoCredentials[userInfo.email] &&
                userInfo.password === "demo123") ||
            (demoCredentials[userInfo.email] &&
                userInfo.password === "test123") ||
            (demoCredentials[userInfo.email] &&
                userInfo.password === "guest123")
        ) {
            const data = demoCredentials[userInfo.email];
            dispatch(loginSuccess(data));
            dispatch(profileSuccess(data));
            toastSuccessNotify("Demo login successful!");
            navigate("/");
            return;
        }

        // Try real API login
        try {
            const { data } = await axios.post(
                `${BASE_URL}users/auth/login/`,
                userInfo
            );
            dispatch(loginSuccess(data));
            dispatch(profileSuccess(data));
            toastSuccessNotify("Login performed");
            navigate("/");
            console.log(data);
        } catch (error) {
            dispatch(fetchFail());
            toastErrorNotify("Login can not be performed");
            console.log(error);
        }
    };

    const logout = async () => {
        dispatch(fetchStart());

        // Demo mode - check if it's a demo token
        if (
            token &&
            (token.includes("demo_token") ||
                token.includes("test_token") ||
                token.includes("guest_token"))
        ) {
            dispatch(logoutSuccess());
            toastSuccessNotify("Demo logout successful!");
            navigate("/");
            return;
        }

        try {
            await axios.post(`${BASE_URL}users/auth/logout/`, null, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            dispatch(logoutSuccess());
            toastSuccessNotify("Logout performed");
            navigate("/");
        } catch (err) {
            dispatch(fetchFail());
            toastErrorNotify("Logout can not be performed");
        }
    };

    const register = async (userInfo) => {
        dispatch(fetchStart());
        try {
            const { data } = await axios.post(
                `${BASE_URL}users/register/`,
                userInfo
            );
            dispatch(registerSuccess(data));
            dispatch(profileSuccess(data));
            toastSuccessNotify("Register performed");
            navigate("/login");
            console.log(data);
        } catch (err) {
            dispatch(fetchFail());
            toastErrorNotify("Register can not be performed");
        }
    };

    return { login, register, logout };
};

export default useAuthCall;
