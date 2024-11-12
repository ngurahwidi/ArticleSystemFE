import {Book, Home, Hashtag, Category, MessageCircle} from "iconsax-react";
import SidebarLogo from "./SidebarLogo.jsx";
import SidebarItem from "./SidebarItem.jsx";

const Sidebar = ({isExpanded}) => {

    return (
        <>
            <div className={`container-sidebar z-2 bg-white position-fixed left-0 d-flex flex-column justify-content-start shadow-sm ${isExpanded ? 'default-width' : 'style-width'}`}>
               <SidebarLogo isExpanded={isExpanded}/>
                <div className={`container-icon d-flex flex-column gap-3 ${isExpanded ? "" : "align-items-center"}`}>
                    <SidebarItem to="/" isExpanded={isExpanded} icon={Home} label="Dashboard" exact/>
                    <SidebarItem to="/article" isExpanded={isExpanded} icon={Book} label="Article"/>
                    <SidebarItem to="/tag" isExpanded={isExpanded} icon={Hashtag} label="Tag"/>
                    <SidebarItem to="/category" isExpanded={isExpanded} icon={Category} label="Category"/>
                    <SidebarItem to="/comment" isExpanded={isExpanded} icon={MessageCircle} label="Comment"/>
                </div>
            </div>
        </>
    )
}

export default Sidebar