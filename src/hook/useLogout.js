import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {clearLs, getToken} from "../config/auth.js";

const useLogout = () => {
    const navigate = useNavigate()
    const token = getToken()

    const logout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        })

        if (result.isConfirmed) {
            try {
                await axios.post('http://127.0.0.1:8000/api/web/v1/articles/auths/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                clearLs()
                navigate('/login')
            } catch (error) {
                console.log(error)
                Swal.fire("Error!", "Failed to logout", "error");
            }
        }

    }

    return logout
}

export default useLogout;