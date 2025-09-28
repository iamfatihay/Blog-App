import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, isDemoMode } from "./config";

// Demo modu için geçici auth sistemi (artık kullanılmıyor - gerçek Firebase kullanılıyor)
const DEMO_USERS = {
    "demo@example.com": {
        password: "demo123",
        userData: {
            id: "demo-user-1",
            email: "demo@example.com",
            username: "Demo User",
            first_name: "Demo",
            last_name: "User",
            image: null,
            bio: "Demo kullanıcı hesabı (Local)",
            token: "demo-token-123",
        },
    },
    "test@example.com": {
        password: "test123",
        userData: {
            id: "test-user-1",
            email: "test@example.com",
            username: "Firebase Test User",
            first_name: "Firebase",
            last_name: "Test",
            image: null,
            bio: "Firebase Test kullanıcı hesabı",
            token: "firebase-test-token",
        },
    },
};

// Demo modu artık config'den alınıyor

// Kullanıcı kaydı
export const registerUser = async (email, password, userData) => {
    if (isDemoMode) {
        // Demo modu - geçici kayıt
        return {
            success: true,
            user: {
                id: `demo-user-${Date.now()}`,
                email: email,
                username: userData.username,
                first_name: userData.first_name,
                last_name: userData.last_name,
                image: userData.image || null,
                bio: userData.bio || "",
                token: `demo-token-${Date.now()}`,
            },
        };
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Kullanıcı profilini güncelle
        await updateProfile(user, {
            displayName: userData.username,
            photoURL: userData.image || null,
        });

        return {
            success: true,
            user: {
                id: user.uid,
                email: user.email,
                username: userData.username,
                first_name: userData.first_name,
                last_name: userData.last_name,
                image: userData.image || null,
                bio: userData.bio || "",
                token: user.accessToken || user.uid, // Firebase token
            },
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// Kullanıcı girişi
export const loginUser = async (email, password) => {
    if (isDemoMode) {
        // Demo modu - geçici giriş
        const demoUser = DEMO_USERS[email];
        if (demoUser && demoUser.password === password) {
            return {
                success: true,
                user: demoUser.userData,
            };
        } else {
            return {
                success: false,
                error: "Geçersiz email veya şifre",
            };
        }
    }

    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Token almak için
        const token = await user.getIdToken();

        return {
            success: true,
            user: {
                id: user.uid,
                email: user.email,
                username: user.displayName || user.email.split("@")[0],
                first_name: user.displayName?.split(" ")[0] || "",
                last_name: user.displayName?.split(" ")[1] || "",
                image: user.photoURL || null,
                bio: "",
                token: token,
            },
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// Kullanıcı çıkışı
export const logoutUser = async () => {
    if (isDemoMode) {
        // Demo modu - geçici çıkış
        return { success: true };
    }

    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// Auth state değişikliklerini dinle
export const onAuthStateChange = (callback) => {
    if (isDemoMode) {
        // Demo modu - auth state dinlemiyor
        return () => {};
    }
    return onAuthStateChanged(auth, callback);
};

// Mevcut kullanıcıyı al
export const getCurrentUser = () => {
    if (isDemoMode) {
        // Demo modu - null döndür
        return null;
    }
    return auth.currentUser;
};
