import hamburger from '../../assets/image/hamburger-menu.svg'
import {Outlet} from "react-router-dom";
import {useState} from "react";
import Sidebar from "./component/Sidebar.jsx";
import Navbar from "./component/Navbar.jsx";
import useLogout from "../../hook/useLogout.js";

const Layout = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const logout = useLogout()

    const toggleSidebar = () => {
        setIsSidebarExpanded(prevState => !prevState);
        console.log(isSidebarExpanded)
    }

    return (
        <>
            <Sidebar isExpanded={isSidebarExpanded}/>
            <Navbar isSidebarExpanded={isSidebarExpanded} onClick={toggleSidebar} toggleImage={hamburger} logout={logout}/>

            <div className="dashboard-container">

                <div className={`content-container ${isSidebarExpanded ? 'default-pl' : 'style-pl'}`}>
                    <div className="p-5">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Layout