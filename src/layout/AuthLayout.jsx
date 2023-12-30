import { Outlet, } from 'react-router-dom';
import Boards from '../pages/Boards';
import Sidebar from '../pages/Sidebar';
import { useState } from 'react';

const AuthLayout = (props) => {
    const [showSideBar, setShowSideBar] = useState(null);

    const toggleSidebar = () => {
        setShowSideBar(!showSideBar);
    };

    return (
        <>
            <div className="p-2">
                {showSideBar && <Sidebar />}
                <div>
                    <button onClick={toggleSidebar}>Sidebar</button>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AuthLayout;