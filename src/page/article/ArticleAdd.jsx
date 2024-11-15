import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import articlePath from "../../path/articlePath.js";
import articleService from "../../service/api/articleService.js";
import categoryService from "../../service/api/categoryService.js";
import tagService from "../../service/api/tagService.js";
import ArticleForm from "./component/ArticleForm.jsx";

const ArticleAdd = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formRequest, setFormRequest] = useState({
        title: '',
        content: '',
        statusId: '1',
        description: '',
        categories: [],
        tags: [],
    })
    const [featuredImage, setFeaturedImage] = useState(null);
    const [galleries, setGalleries] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [selectedTagIds, setSelectedTagIds] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormRequest((prevState) => {
            const newState = {...prevState}
            newState[name] = value;
            return newState;
        })
    }

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
            title: formRequest.title,
            description: formRequest.description,
            content: formRequest.content,
            featuredImage,
            galleries,
            statusId: formRequest.statusId,
            categoryIds: selectedCategoryIds,
            tagIds: selectedTagIds,
        }

        try {
            await articleService.createArticle(articleData);

            Swal.fire("Success", "Article added successfully!", "success");

            navigate(articlePath.list);
        } catch (error) {
            setError(error.response.data.status.message);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getCategory()

            setFormRequest((prevState) => ({
                ...prevState,
                categories: response.data.result.map((category) => ({
                    value: category.id,
                    label: category.name
                }))
            }));
        } catch (err) {
            setError(err.response.data.status.message);
        }
    }

    const fetchTags = async () => {
        try {
            const response = await tagService.getTag()
            setFormRequest((prevState) => ({
                ...prevState,
                tags: response.data.result.map((tag) => ({
                    value: tag.id,
                    label: tag.name
                }))
            }))
        } catch (err) {
            setError(err.response.data.status.message);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchTags()
    }, []);

    return (
        <div className="form-container">
            <p className='text-danger'>{error}</p>
            <ArticleForm
                title={formRequest.title}
                handleChange={handleChange}
                description={formRequest.description}
                content={formRequest.content}
                handleImageChange={handleImageChange}
                handleGalleryChange={handleGalleryChange}
                statusId={formRequest.statusId}
                categories={formRequest.categories}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                tags={formRequest.tags}
                selectedTag={selectedTag}
                handleTagChange={handleTagChange}
                onSubmit={handleSubmit}
                onCancel={() => navigate(articlePath.list)}/>
        </div>
    )
}

export default ArticleAdd