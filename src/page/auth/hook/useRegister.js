import authService from "../../../service/api/authService.js";

const useRegister = () => {
    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            return response.data
        } catch (error) {
            console.log('Error register', error)
            throw error
        }
    }
    return { register }
}

export default useRegister;