import {Notification} from "iconsax-react";
import avatar from '../../assets/image/avatar.svg'
import hamburger from '../../assets/image/hamburger-menu.svg'
import {Outlet} from "react-router-dom";
import {useState} from "react";
import Sidebar from "./Sidebar.jsx";
import dropdown from '../../assets/image/Vector.svg'

const Navbar = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(prevState => !prevState);
        console.log(isSidebarExpanded)
    }
    return (
        <div className="d-flex" style={{width: '100%'}}>
            <Sidebar isExpanded={isSidebarExpanded}/>

            <div style={{width: '100%'}}>
                <nav style={{width: '100%', height: '68px', left: isSidebarExpanded ? '240px' : '80px', transition: 'left 0.3s'}}
                     className="d-flex justify-content-between align-items-center shadow-sm">
                    <div className="d-flex align-items-center gap-3 p-4">
                        <div onClick={toggleSidebar} style={{cursor: 'pointer'}}>
                            <img src={hamburger}/>
                        </div>
                        <div>Dashboard</div>
                    </div>
                    <div className="d-flex align-items-center p-4">
                        <div className="me-4"><Notification size="25" color="#4B3D02" variant="Bulk"/></div>
                        <div className="rounded-5 overflow-hidden me-2"><img src={avatar}/></div>
                        <div><img src={dropdown}/></div>
                    </div>
                </nav>
                <div className="p-4 m-4 h-100">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Navbar