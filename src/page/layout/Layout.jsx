import hamburger from '../../assets/image/hamburger-menu.svg'
import {Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import Sidebar from "./component/Sidebar.jsx";
import Navbar from "./component/Navbar.jsx";
import axios from "axios";

const Layout = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    const toggleSidebar = () => {
        setIsSidebarExpanded(prevState => !prevState);
        console.log(isSidebarExpanded)
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/web/v1/articles/auths/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.clear()
            console.log("logged out", response)
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Sidebar isExpanded={isSidebarExpanded}/>
            <Navbar isSidebarExpanded={isSidebarExpanded} onClick={toggleSidebar} toggleImage={hamburger} dropdown={handleLogout}/>

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