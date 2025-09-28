import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChange } from "../firebase/auth";
import {
    loginSuccess,
    profileSuccess,
    logoutSuccess,
} from "../features/authSlice";

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChange((user) => {
            if (user) {
                // Kullanıcı giriş yapmış
                const userData = {
                    key: user.accessToken || user.uid,
                    user: {
                        id: user.uid,
                        email: user.email,
                        username: user.displayName || user.email.split("@")[0],
                        first_name: user.displayName?.split(" ")[0] || "",
                        last_name: user.displayName?.split(" ")[1] || "",
                        image: user.photoURL || null,
                        bio: "",
                        token: user.accessToken || user.uid,
                    },
                };

                dispatch(loginSuccess(userData));
                dispatch(profileSuccess(userData));
            } else {
                // Kullanıcı çıkış yapmış
                dispatch(logoutSuccess());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return children;
};

export default AuthProvider;
