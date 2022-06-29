import React from "react";
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
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <NavBar />
            <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
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
