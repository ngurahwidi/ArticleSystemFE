import apiInstance from "./apiConfig.js";

const articleService = {
    getArticles(filters = {}) {
        return apiInstance.get('',{params: filters});
    },
    getArticleById(id) {
        return apiInstance.get(`/${id}`);
    },
    createArticle(data) {
        return apiInstance.post("", data);
    },
    updateArticle(id, data) {
        return apiInstance.post(`/${id}/update`, data);
    },
    deleteArticle(id) {
        return apiInstance.delete(`/${id}`);
    }
}

export default articleService;