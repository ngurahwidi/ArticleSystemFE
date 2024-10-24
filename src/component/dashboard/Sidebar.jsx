import logo from '../../assets/image/logo-hitam.svg'
import {NavLink} from "react-router-dom";
import {Book, Home, Hashtag, Category, MessageCircle} from "iconsax-react";

const Sidebar = () => {
    return (
        <>
            <div style={{width: "240px", height: "960px"}} className="d-flex flex-column justify-content-start shadow-sm">
                <div className="text-center mb-5 p-3"><img src={logo}/></div>
                <div style={{width: '240px', height: '288px', padding: '8px 16px'}} className="d-flex flex-column gap-3">
                    <NavLink style={{width: "208px", height: "48px", padding: "4px 8px", color: "#ACADC1"}} className="text-decoration-none d-flex align-items-center gap-2"><Home size="32" color="#ACADC1" variant="Bulk"/>Dashboard</NavLink>
                    <NavLink to="article" style={{width: "208px", height: "48px", padding: "4px 8px", color: "#ACADC1"}} className="text-decoration-none d-flex align-items-center gap-2"><Book size="32" color="#ACADC1" variant="Bulk"/>Article</NavLink>
                    <NavLink style={{width: "208px", height: "48px", padding: "4px 8px", color: "#ACADC1"}} className="text-decoration-none d-flex align-items-center gap-2"><Hashtag size="32" color="#ACADC1" variant="Bulk"/>Tag</NavLink>
                    <NavLink style={{width: "208px", height: "48px", padding: "4px 8px", color: "#ACADC1"}} className="text-decoration-none d-flex align-items-center gap-2"><Category size="32" color="#ACADC1" variant="Bulk"/>Category</NavLink>
                    <NavLink style={{width: "208px", height: "48px", padding: "4px 8px", color: "#ACADC1"}} className="text-decoration-none d-flex align-items-center gap-2"><MessageCircle size="32" color="#ACADC1" variant="Bulk"/>Comment</NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar