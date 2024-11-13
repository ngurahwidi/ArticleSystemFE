import {NavLink, useLocation} from "react-router-dom";

const SidebarItem = ({to, icon: Icon, label, isExpanded, exact = false}) => {
    const location = useLocation();
    const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

    return (
        <NavLink to={to}
                 className={`text-decoration-none d-flex align-items-center gap-2 ${isActive ? 'active-color' : 'default-color'}`}>
            <Icon size="24" color={isActive ? "#FFC107" : "#ACADC1"} variant="Bulk"/>
            {isExpanded && label}
        </NavLink>
    )
}
export default SidebarItem