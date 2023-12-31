import { Outlet, useLocation } from 'react-router-dom';
import Boards from '../pages/Boards';
import Sidebar from '../pages/Sidebar';
import { useEffect, useState } from 'react';
import hamburger from "../assets/images/boards/hamburger.svg";

const AuthLayout = (props) => {
    const [showSideBar, setShowSideBar] = useState(true);

    const [pageUrl, setpageUrl] = useState();
    let location = useLocation();

    useEffect(() => {
        setpageUrl(location.pathname.split("/")[1])
    }, [location]);

    const toggleSidebar = () => {
        setShowSideBar(!showSideBar);
    };

    return (
        <>
            <div className="p-2 d-flex">
            {pageUrl !== "sign-in" && pageUrl !== "sign-up" &&
                    <> {showSideBar && <Sidebar />}</>}
                <div className='w-100 px-4 position-relative'>
                {pageUrl !== "sign-in" && pageUrl !== "sign-up" && <button onClick={toggleSidebar} className='side-button'><img src={hamburger}/></button>}
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AuthLayout;