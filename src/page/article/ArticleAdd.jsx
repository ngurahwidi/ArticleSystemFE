import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ArticleForm from "./component/ArticleForm.jsx";
import {articlePath} from "../../path/crudPath.js";
import articleService from "../../service/api/articleService.js";

const ArticleAdd = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [featuredImage, setFeaturedImage] = useState(null);
    const [galleries, setGalleries] = useState(null)
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
    }

    const handleGalleryChange = (e) => {
        setGalleries(Array.from(e.target.files));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const articleData = {
            title,
            description,
            content,
            featuredImage,
            galleries,
            statusId,
            categoryIds: selectedCategoryIds,
            tagIds: selectedTagIds,
        }

        try {
            await articleService.createArticle(articleData);

            Swal.fire("Success", "Article added successfully!", "success");

            navigate(articlePath.list);
        } catch (error) {
            setError(error)
            Swal.fire("Error!", error.response.data.status.message, 'error');
            navigate(articlePath.list);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/web/v1/articles/components/categories', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            setCategories(response.data.result.map((category) => {
                return {value: category.id, label: category.name};
            }));
        } catch (err) {
            if (err.response && err.response.status === 401) {
                localStorage.clear()
            } else {
                setError(err.response.data.status.message);
            }
        }
    }

    const fetchTags = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/web/v1/articles/components/tags', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setTags(response.data.result.map((tag) => {
                return {value: tag.id, label: tag.name}
            }));
        } catch (err) {
            if (err.response && err.response.status.code === 401) {
                localStorage.clear()
            } else {
                setError(err.response.data.status.message);
            }
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchTags()
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div className='container mt-5 bg-white p-5 rounded-4'>
            <h1 className='text-center mb-3'>Add Article</h1>
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
                onCancel={() => navigate(articlePath.list)}/>
        </div>
    )
}

export default ArticleAdd