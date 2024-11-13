import apiInstance from "./apiConfig.js";

const tagService = {
    getTag() {
        return apiInstance.get('/components/tags')
    },
    createTag(data) {
        return apiInstance.post('/components/tags', data)
    },
    updateTag(id, data) {
        return apiInstance.post(`/components/tags/${id}/update`, data)
    },
    deleteTag(id) {
        return apiInstance.delete(`/components/tags/${id}`)
    }
}

export default tagService;