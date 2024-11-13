import apiInstance from "./apiConfig.js";

const authService = {
    login(data) {
        return apiInstance.post('/auths/login', data)
    },
    register(data) {
        return apiInstance.post('/auths/register', data)
    },
    logout() {
        return apiInstance.post('/auths/logout')
    }
}

export default authService