import React, { Suspense } from 'react';
import AuthLayout from '../layout/AuthLayout'
// import DefaultLayout from '../layout/DefaultLayout'
import { BrowserRouter as Routes, Route } from "react-router-dom";
import Boards from "../pages/Boards";
import Board from "../pages/Board";
import NotFound from "../pages/404";
import SignUp from '../pages/SignUp';
import SignIn from '../pages/signIn';

const PublicRoutes = () => {
    return (
            <Routes>
                <Route path="login" element={<SignIn />} />
                <Route path="loginone" element={<SignUp />} />
                <Route path="boards" element={<Boards />} />
                <Route path="board" element={<Board />} />
                <Route path="not-found" element={<NotFound />} />
            </Routes>
    );
};

export default PublicRoutes;