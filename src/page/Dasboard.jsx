import Sidebar from "../component/dashboard/Sidebar.jsx";
import Navbar from "../component/dashboard/Navbar.jsx";
import {Outlet} from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <div className="d-flex">
                <Sidebar/>
                <Navbar/>
            </div>
        </>
    )
}

export default Dashboard