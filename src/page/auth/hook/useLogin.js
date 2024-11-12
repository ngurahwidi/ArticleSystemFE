import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setToken} from "../../../config/auth.js";

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const login = async (email, password) => {
        setLoading(true)
        setError(null)

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/web/v1/articles/auths/login', {
                email,
                password
            })
            if (response.status === 200 && response.data.result.token) {
                setToken(response.data.result.token)

                console.log("Login succes")
                navigate('/')
            }
        } catch(error) {
            console.log('Login error', error)
            setError('Login failed, please check your credentials')
        } finally {
            setLoading(false)
        }
    }
    return {login, loading, error}
}

export default useLogin;