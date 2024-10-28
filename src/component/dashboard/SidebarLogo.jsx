import logo from "../../assets/image/logo-hitam.svg";
import logosmall from "../../assets/image/logo-small.svg";

const SidebarLogo = ({isExpanded}) => {
    return (
        <div className="text-center mb-5 p-3">
            {isExpanded ? <img src={logo}/> : <img src={logosmall}/>}
        </div>
    )
}

export default SidebarLogo;