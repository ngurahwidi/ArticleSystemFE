import {Notification, Logout} from "iconsax-react";
import avatar from "../../../assets/image/avatar.svg";

const Navbar = ({isSidebarExpanded, onClick, toggleImage, dropdown}) => {
    return (

        <nav className={`nav bg-white d-flex top-0 position-fixed end-0 justify-content-between align-items-center shadow-sm ${isSidebarExpanded ? 'default-left' : 'style-left'}`}>
            <div className="d-flex align-items-center gap-3 p-4">
                <div onClick={onClick} className="cursor-pointer">
                    <img src={toggleImage}/>
                </div>
                <div>Dashboard</div>
            </div>
            <div className="d-flex align-items-center p-4">
                <div className="me-4 cursor-pointer"><Notification size="25" color="#4B3D02" variant="Bulk"/></div>
                <div className="rounded-5 overflow-hidden me-2 cursor-pointer"><img src={avatar}/></div>
                <Logout color="#4B3D02" onClick={dropdown}/>
            </div>
        </nav>
    )
}

export default Navbar