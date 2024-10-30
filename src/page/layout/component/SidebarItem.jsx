import {NavLink} from "react-router-dom";

const SidebarItem = ({activePath, to, icon: Icon, label, isExpanded}) => {
    const isActive = activePath === to;

    return (
        <NavLink to={to}
                 className={`text-decoration-none d-flex align-items-center gap-2 ${isActive ? 'active-color' : 'default-color'}`}>
            <Icon size="24" color={isActive ? "#FFC107" : "#ACADC1"} variant="Bulk"/>
            {isExpanded && label}
        </NavLink>
    )
}
export default SidebarItem