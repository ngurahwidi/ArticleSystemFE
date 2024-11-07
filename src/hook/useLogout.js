import {useNavigate} from "react-router-dom";
import axios from "axios";

const useLogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const logout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/web/v1/articles/auths/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.clear()
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return logout
}

export default useLogout;