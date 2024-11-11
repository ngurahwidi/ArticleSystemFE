import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ArticleForm from "./component/ArticleForm.jsx";
import {articlePath} from "../../path/crudPath.js";

const ArticleEdit = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [featuredImage, setFeaturedImage] = useState(null);
    const [galleries, setGalleries] = useState([]);
    const [statusId, setStatusId] = useState('2');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedTagIds, setSelectedTagIds] = useState([]);

    const handleTagChange = (selectedOptions) => {
        const tagIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedTag(selectedOptions || []);
        setSelectedTagIds(tagIds);
    };

    const handleCategoryChange = (selectedOptions) => {
        const categoryIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedCategory(selectedOptions || []);
        setSelectedCategoryIds(categoryIds);
    };

    const handleImageChange = (e) => {
        setFeaturedImage(e.target.files[0]);
    };

    const handleGalleryChange = (e) => {
        setGalleries(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const articleData = new FormData();
        articleData.append('title', title);
        articleData.append('description', description);
        articleData.append('content', content);
        if (featuredImage) articleData.append('featuredImage', featuredImage);
        galleries.forEach((file, index) => articleData.append(`galleries[${index}]`, file));
        articleData.append('statusId', statusId);
        selectedCategoryIds.forEach((categoryId, index) => articleData.append(`categoryIds[${index}]`, categoryId));
        selectedTagIds.forEach((tagId, index) => articleData.append(`tagIds[${index}]`, tagId));

        try {
            await axios.post(`http://127.0.0.1:8000/api/web/v1/articles/${id}`, articleData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            });

            Swal.fire("Success", "Article updated successfully!", "success");
            navigate(articlePath.list);
        } catch (error) {
            setError(error.response.data.status.message);
            Swal.fire("Error!", "Failed to update article!", "error");
            console.log(error);
        }
    };

    const fetchArticleData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/web/v1/articles/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const article = response.data.result;
            setTitle(article.title);
            setDescription(article.description);
            setContent(article.content);
            setStatusId(article.statusId);
            setSelectedCategory(article.categories.map(category => ({ value: category.id, label: category.name })));
            setSelectedCategoryIds(article.categories.map(category => category.id));
            setSelectedTag(article.tags.map(tag => ({ value: tag.id, label: tag.name })));
            setSelectedTagIds(article.tags.map(tag => tag.id));
        } catch (err) {
            setError(err.response?.data?.status?.message || "Failed to fetch article data.");
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/web/v1/articles/components/categories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setCategories(response.data.result.map((category) => ({
                value: category.id,
                label: category.name
            })));
        } catch (err) {
            setError(err.response.data.status.message || "Failed to fetch categories.");
        }
    };

    const fetchTags = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/web/v1/articles/components/tags', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setTags(response.data.result.map((tag) => ({
                value: tag.id,
                label: tag.name
            })));
        } catch (err) {
            setError(err.response.data.status.message || "Failed to fetch tags.");
        }
    };

    useEffect(() => {
        fetchArticleData();
        fetchCategories();
        fetchTags();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div className='container mt-5 bg-white p-5 rounded-4'>
            <h1 className='text-center mb-3'>Edit Article</h1>
            <ArticleForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                content={content}
                setContent={setContent}
                handleImageChange={handleImageChange}
                handleGalleryChange={handleGalleryChange}
                statusId={statusId}
                setStatusId={setStatusId}
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                tags={tags}
                selectedTag={selectedTag}
                handleTagChange={handleTagChange}
                onSubmit={handleSubmit}
                onCancel={() => navigate(articlePath.list)}
            />
        </div>
    );
};

export default ArticleEdit;
