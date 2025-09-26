import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Detail from "../pages/Detail";
import About from "../pages/About";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import MyBlogs from "../pages/MyBlogs";

const Router = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const [headerHeight, setHeaderHeight] = useState(80); // Default fallback

    useEffect(() => {
        const updateHeaderHeight = () => {
            const navbar = document.querySelector(".MuiAppBar-root");
            if (navbar) {
                setHeaderHeight(navbar.offsetHeight);
            }
        };

        // Initial measurement
        updateHeaderHeight();

        // Update on window resize
        window.addEventListener("resize", updateHeaderHeight);

        // Cleanup
        return () => window.removeEventListener("resize", updateHeaderHeight);
    }, []);

    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <NavBar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: `${headerHeight + 60}px`, // Extra padding for better spacing
                    minHeight: `calc(100vh - ${headerHeight}px)`,
                }}
            >
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/newblog" element={<PrivateRouter />}>
                        <Route path="" element={<NewBlog />} />
                    </Route>
                    <Route path="/my-blogs" element={<PrivateRouter />}>
                        <Route path="" element={<MyBlogs />} />
                    </Route>
                    <Route path="/about" element={<About />} />
                </Routes>
            </Box>
            {currentUser && <Footer />}
        </BrowserRouter>
    );
};

export default Router;
