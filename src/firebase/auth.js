import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
} from "firebase/auth";
import { auth, isDemoMode } from "./config";

// Temporary auth system for demo mode (no longer used - real Firebase is used)
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
            bio: "Demo user account (Local)",
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
            bio: "Firebase Test user account",
            token: "firebase-test-token",
        },
    },
};

// Demo mode is now taken from config

// User registration
export const registerUser = async (email, password, userData) => {
    if (isDemoMode) {
        // Demo mode - temporary registration
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

        // Update user profile
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

// User login
export const loginUser = async (email, password) => {
    if (isDemoMode) {
        // Demo mode - temporary login
        const demoUser = DEMO_USERS[email];
        if (demoUser && demoUser.password === password) {
            return {
                success: true,
                user: demoUser.userData,
            };
        } else {
            return {
                success: false,
                error: "Invalid email or password",
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

        // Get token
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

// User logout
export const logoutUser = async () => {
    if (isDemoMode) {
        // Demo mode - temporary logout
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

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
    if (isDemoMode) {
        // Demo mode - not listening to auth state
        return () => {};
    }
    return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = () => {
    if (isDemoMode) {
        // Demo mode - return null
        return null;
    }
    return auth.currentUser;
};
