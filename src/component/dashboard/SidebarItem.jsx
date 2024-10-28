import {NavLink} from "react-router-dom";

const SidebarItem = ({activePath, to, icon: Icon, label, isExpanded}) => {
    const isActive = activePath === to;
    const activeStyle = {color: '#FFC107'};
    const defaultStyle = {color: '#ACADC1'};

    return (
        <NavLink to={to}
                 style={isActive ? activeStyle : defaultStyle}
                 className="text-decoration-none d-flex align-items-center gap-2">
            <Icon size="32" color={isActive ? "#FFC107" : "#ACADC1"} variant="Bulk"/>
            {isExpanded && label}
        </NavLink>
    )
}
export default SidebarItem