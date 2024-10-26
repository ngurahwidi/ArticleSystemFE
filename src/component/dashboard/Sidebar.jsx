import logo from '../../assets/image/logo-hitam.svg'
import {NavLink} from "react-router-dom";
import {Book, Home, Hashtag, Category, MessageCircle} from "iconsax-react";
import { useLocation } from 'react-router-dom';
import logosmall from '../../assets/image/logo-small.svg'

const Sidebar = ({isExpanded}) => {
    const pathActive = useLocation()

    const activeStyle = {
        color: '#FFC107'
    }
    return (
        <>
            <div style={{width: isExpanded ? "240px" : "80px", height: "960px", transition: "width 0.3s", overflow: "hidden"}} className="d-flex flex-column justify-content-start shadow-sm">
                <div className="text-center mb-5 p-3">
                    {isExpanded ? <img src={logo}/> : <img src={logosmall} />}
                </div>
                <div style={{padding: '8px 16px'}} className={`d-flex flex-column gap-3 ${isExpanded ? "" : "align-items-center"}`}>
                    <NavLink to="/" style={({isActive}) => (isActive ? activeStyle :{color: "#ACADC1"})} className="text-decoration-none d-flex align-items-center gap-2"><Home size="32" color={pathActive.pathname === '/' ? "#FFC107" : "#ACADC1"} variant="Bulk"/>{isExpanded && "Dashboard"}</NavLink>
                    <NavLink to="/article" style={({isActive}) => (isActive ? activeStyle :{color: "#ACADC1"})} className="text-decoration-none d-flex align-items-center gap-2"><Book size="32" color={pathActive.pathname === '/article' ? "#FFC107" : "#ACADC1"} variant="Bulk"/>{isExpanded && "Article"}</NavLink>
                    <NavLink to="/tag" style={({isActive}) => (isActive ? activeStyle :{color: "#ACADC1"})} className="text-decoration-none d-flex align-items-center gap-2"><Hashtag size="32" color={pathActive.pathname === "/tag" ? "#FFC107" : "#ACADC1"} variant="Bulk"/>{isExpanded && "Tag"}</NavLink>
                    <NavLink to="/category" style={({isActive}) => (isActive ? activeStyle :{color: "#ACADC1"})} className="text-decoration-none d-flex align-items-center gap-2"><Category size="32" color={pathActive.pathname === "/category" ? "#FFC107" : "#ACADC1"} variant="Bulk"/>{isExpanded && "Category"}</NavLink>
                    <NavLink to="/comment" style={({isActive}) => (isActive ? activeStyle :{color: "#ACADC1"})} className="text-decoration-none d-flex align-items-center gap-2"><MessageCircle size="32" color={pathActive.pathname === "/comment" ? "#FFC107" : "#ACADC1"} variant="Bulk"/>{isExpanded && "Comment"}</NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar