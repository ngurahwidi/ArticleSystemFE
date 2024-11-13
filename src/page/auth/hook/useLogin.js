import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../../config/auth.js";
import authService from "../../../service/api/authService.js";

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const login = async (data) => {
        setLoading(true)
        setError(null)

        try {
            const response = await authService.login(data);
            if (response.status === 200 && response.data.result.token) {
                setToken(response.data.result.token)
                navigate('/')
            }
        } catch(error) {
            setError(error.response.data.status.message);
        } finally {
            setLoading(false)
        }
    }
    return {login, loading, error}
}

export default useLogin;