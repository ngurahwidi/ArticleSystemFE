import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import Swal from "sweetalert2";
import articlePath from "../../path/articlePath.js";
import articleService from "../../service/api/articleService.js";
import categoryService from "../../service/api/categoryService.js";
import tagService from "../../service/api/tagService.js";
import ArticleForm from "./component/ArticleForm.jsx";

const ArticleEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formRequest, setFormRequest] = useState({
        title: '',
        description: '',
        content: '',
        statusId: '',
        categories: [],
        tags: [],
    })
    const [featuredImage, setFeaturedImage] = useState(null);
    const [galleries, setGalleries] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormRequest((prevState) => {
            const newState = {...prevState}
            newState[name] = value;
            return newState;
        })
    }

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        } else {
            console.log("file input ref is null")
        }
    }

    const handleContentChange = (content) => {
        setFormRequest({ ...formRequest, content });
    };

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
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFeaturedImage(imageUrl);
        }
    };

    const handleGalleryChange = (e) => {
        setGalleries(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const articleData = {
            title: formRequest.title,
            description: formRequest.description,
            content: formRequest.content,
            statusId: formRequest.statusId,
            featuredImage,
            galleries,
            categoryIds: selectedCategoryIds,
            tagIds: selectedTagIds,
        }

        try {
            await articleService.updateArticle(id, articleData);

            Swal.fire("Success", "Article updated successfully!", "success");
            navigate(articlePath.list);
        } catch (error) {
            setError(error.response.data.status.message);
            Swal.fire("Error!", "Failed to update article!", "error");
        }
    };

    const fetchArticleData = async () => {
        try {
            const response = await articleService.getArticleById(id)

            const article = response.data.result;
            setFormRequest((prevState) => ({
                ...prevState,
                title: article.title,
                description: article.description,
                content: article.content,
                statusId: article.status.id.toString(),
            }))
            if (article.featuredImage) {
                const url = "http://127.0.0.1:8000"
                setFeaturedImage(`${url}${article.featuredImage}`);
            }
            setSelectedCategory(article.categories.map(category => ({ value: category.id, label: category.name })));
            setSelectedCategoryIds(article.categories.map(category => category.id));
            setSelectedTag(article.tags.map(tag => ({ value: tag.id, label: tag.name })));
            setSelectedTagIds(article.tags.map(tag => tag.id));
            console.log(response);
        } catch (err) {
            setError(err.response.data.status.message);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getCategory()

            setFormRequest((prevState) => ({
                ...prevState,
                categories: response.data.result.map((category) => ({
                    value: category.id,
                    label: category.name,
                }))
            }))
        } catch (err) {
            setError(err.response.data.status.message || "Failed to fetch categories.");
        }
    };

    const fetchTags = async () => {
        try {
            const response = await tagService.getTag()

            setFormRequest((prevState) => ({
                ...prevState,
                tags: response.data.result.map((tag) => ({
                    value: tag.id,
                    label: tag.name,
                }))
            }))
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
        <div className="form-container">
            <ArticleForm
                title={formRequest.title}
                handleChange={handleChange}
                handleContentChange={handleContentChange}
                description={formRequest.description}
                content={formRequest.content}
                featuredImage={featuredImage}
                handleImageChange={handleImageChange}
                handleGalleryChange={handleGalleryChange}
                statusId={formRequest.statusId}
                categories={formRequest.categories}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                tags={formRequest.tags}
                selectedTag={selectedTag}
                handleButtonClick={handleButtonClick}
                fileInputRef={fileInputRef}
                handleTagChange={handleTagChange}
                onSubmit={handleSubmit}
                onCancel={() => navigate(articlePath.list)}
            />
        </div>
    );
};

export default ArticleEdit;
