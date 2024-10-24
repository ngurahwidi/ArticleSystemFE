import {Notification, HambergerMenu} from "iconsax-react";
import avatar from '../../assets/image/avatar.svg'

const Navbar = () => {
    return (
        <nav style={{width: '100%', height: '68px', left: '240px'}} className="d-flex justify-content-between align-items-center shadow-sm">
            <div className="d-flex align-items-center gap-3 p-4">
                <div><HambergerMenu size="25" color="#26273B" variant="Bulk"/></div>
                <div>Dashboard</div>
            </div>
            <div className="d-flex align-items-center gap-3 p-4">
                <div><Notification size="25" color="#4B3D02" variant="Bulk"/></div>
                <div className="rounded-5 overflow-hidden"><img src={avatar}/></div>
            </div>
        </nav>
    )
}

export default Navbar