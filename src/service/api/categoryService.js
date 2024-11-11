import apiInstance from "./apiConfig.js";

const categoryService = {
    getCategory() {
        return apiInstance.get('/components/categories')
    },
    createCategory(data) {
        return apiInstance.post('/components/categories', data);
    },
    updateCategory(id, data) {
        return apiInstance.post(`components/categories/${id}/update`, data);
    },
    deleteCategory(id) {
        return apiInstance.delete(`components/categories/${id}`);
    }
}

export default categoryService;