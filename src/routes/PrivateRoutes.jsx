import React from 'react'
import Board from "../pages/Board";

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="profile" element={<Board />} />
            </Route>
        </Routes>
    )
}

export default PrivateRoutes