import axios from "axios";

const useRegister = () => {
    const register = async (userData) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/web/v1/articles/auths/register', userData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            return response.data
        } catch (error) {
            console.log('Error register', error)
            throw error
        }
    }
    return { register }
}

export default useRegister;