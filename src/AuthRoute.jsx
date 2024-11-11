import { Outlet } from "react-router-dom";
import {loginPath} from "./path/authPath.js";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AuthRoute = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token)
            navigate(loginPath);
    }, [token])

    return <Outlet/>
}

export default AuthRoute;