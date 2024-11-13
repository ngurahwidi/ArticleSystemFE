import {Book, Home, Hashtag, Category} from "iconsax-react";
import SidebarLogo from "./SidebarLogo.jsx";
import SidebarItem from "./SidebarItem.jsx";
import articlePath from "../../../path/articlePath.js";
import tagPath from "../../../path/tagPath.js";
import categoryPath from "../../../path/categoryPath.js";

const Sidebar = ({isExpanded}) => {

    return (
        <>
            <div className={`container-sidebar z-2 bg-white position-fixed left-0 d-flex flex-column justify-content-start shadow-sm ${isExpanded ? 'default-width' : 'style-width'}`}>
               <SidebarLogo isExpanded={isExpanded}/>
                <div className={`container-icon d-flex flex-column gap-3 ${isExpanded ? "" : "align-items-center"}`}>
                    <SidebarItem to="/" isExpanded={isExpanded} icon={Home} label="Dashboard" exact/>
                    <SidebarItem to={articlePath.list} isExpanded={isExpanded} icon={Book} label="Article"/>
                    <SidebarItem to={tagPath.list} isExpanded={isExpanded} icon={Hashtag} label="Tag"/>
                    <SidebarItem to={categoryPath.list} isExpanded={isExpanded} icon={Category} label="Category"/>
                </div>
            </div>
        </>
    )
}

export default Sidebar