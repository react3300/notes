import React, { Suspense, useState } from 'react'
import PublicRoutes from '../../src/routes/PublicRoutes';
import PrivateRoutes from '../../src/routes/PrivateRoutes';
import PropTypes from "prop-types";
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import Boards from '../pages/Boards';
import Board from "../pages/Board";
import NotFound from '../pages/404';
import AuthLayout from "../layout/AuthLayout";
import SignIn from '../pages/signIn';
import SignUp from '../pages/SignUp';

const  Allroutes = ({ isAuthenticated }) => {
    

    return (
        // <Suspense>
        //     <Routes>
        //          {
        //             (isAuthenticated === false) ?
        //                 <Route path="*" element={<PrivateRoutes />} /> :
        //                 <Route path="*" element={<PublicRoutes />} />
        //         }
        //     </Routes>
        // </Suspense>

        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="boards" element={<Boards />} />
                <Route path="board" element={<Board />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="not-found" element={<NotFound />} />
                <Route
                    path="/"
                    element={<Navigate to="/not-found" replace />}
                />
            </Route>
        </Routes>
    )
}


export default Allroutes;

Allroutes.propTypes = {
    isAuthenticated: PropTypes.any,
    userType: PropTypes.any
};