import { Outlet } from "react-router-dom";
import {loginPath} from "../../path/authPath.js";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {getToken} from "../../config/auth.js";

const AuthRoute = () => {
    const navigate = useNavigate();
    const token = getToken()

    useEffect(() => {
        if (!token)
            navigate(loginPath);
    }, [token])

    return <Outlet/>
}

export default AuthRoute;