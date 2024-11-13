import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {clearLs} from "../config/auth.js";
import authService from "../service/api/authService.js";

const useLogout = () => {
    const navigate = useNavigate()

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
                await authService.logout()
                clearLs()
                navigate('/login')
            } catch (error) {
                Swal.fire("Error!", "Failed to logout", "error");
            }
        }

    }

    return logout
}

export default useLogout;