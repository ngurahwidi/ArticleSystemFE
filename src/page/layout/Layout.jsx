import hamburger from '../../assets/image/hamburger-menu.svg'
import {Outlet} from "react-router-dom";
import {useState} from "react";
import Sidebar from "./component/Sidebar.jsx";
import dropdown from '../../assets/image/Vector.svg'
import Navbar from "./component/Navbar.jsx";

const Layout = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(prevState => !prevState);
        console.log(isSidebarExpanded)
    }
    return (
        <>
            <Sidebar isExpanded={isSidebarExpanded}/>
            <Navbar isSidebarExpanded={isSidebarExpanded} onClick={toggleSidebar} toggleImage={hamburger} dropdown={dropdown}/>

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