import {NavLink} from "react-router-dom";
import {Book, Home, Hashtag, Category, MessageCircle} from "iconsax-react";
import { useLocation } from 'react-router-dom';
import SidebarLogo from "./SidebarLogo.jsx";
import SidebarItem from "./SidebarItem.jsx";

const Sidebar = ({isExpanded}) => {
    const pathActive = useLocation().pathname

    return (
        <>
            <div style={{width: isExpanded ? "240px" : "80px", height: "960px", transition: "width 0.3s", overflow: "hidden"}} className="d-flex flex-column justify-content-start shadow-sm">
               <SidebarLogo isExpanded={isExpanded}/>
                <div style={{padding: '8px 16px'}} className={`d-flex flex-column gap-3 ${isExpanded ? "" : "align-items-center"}`}>
                    <SidebarItem to="/" isExpanded={isExpanded} activePath={pathActive} icon={Home} label="Dashboard"/>
                    <SidebarItem to="/article" isExpanded={isExpanded} activePath={pathActive} icon={Book} label="Article"/>
                    <SidebarItem to="/tag" isExpanded={isExpanded} activePath={pathActive} icon={Hashtag} label="Tag"/>
                    <SidebarItem to="/category" isExpanded={isExpanded} activePath={pathActive} icon={Category} label="Category"/>
                    <SidebarItem to="/comment" isExpanded={isExpanded} activePath={pathActive} icon={MessageCircle} label="Comment"/>
                </div>
            </div>
        </>
    )
}

export default Sidebar