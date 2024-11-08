import Label from "../../component/Label.jsx";
import Input from "../../component/Input.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";

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
        console.log(articleData);

        try {
            await axios.post('http://127.0.0.1:8000/api/web/v1/articles', articleData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                }
            })

            Swal.fire("Success", "Article added successfully!", "success");

            navigate("/article");
        } catch (error) {
            Swal.fire("Error!", "Failed to add article!", 'error');
            console.log(error);
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
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <Label>Title</Label>
                    <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <Label>Description</Label>
                    <Input type='text' value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <Label>Content</Label>
                    <Input type='text' value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div className='mb-3'>
                    <Label>Feature Image</Label>
                    <Input type='file' onChange={handleImageChange}/>
                </div>
                <div className='mb-3'>
                    <Label>Gallery</Label>
                    <input type='file' className='form-control' onChange={handleGalleryChange} multiple/>
                </div>
                <div className='mb-3'>
                    <Label>Content</Label>
                    <select className='form-control' value={statusId} onChange={(e) => setStatusId(e.target.value)} required >
                        <option value='1'>Draft</option>
                        <option value='2'>Publish</option>
                        <option value='3'>Archived</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <Label>Category</Label>
                    <Select value={selectedCategory} onChange={handleCategoryChange} options={categories} placeholder='Select Category' isMulti/>
                </div>
                <div className='mb-3'>
                    <Label>Tag</Label>
                    <Select value={selectedTag} onChange={handleTagChange} options={tags} placeholder='Select Tag' isMulti/>
                </div>

                <button type='submit' className='btn btn-primary'>Save Article</button>
                <button className='btn btn-secondary ms-2' onClick={() => navigate('/article')}>Cancel</button>
            </form>
        </div>
    )
}

export default ArticleAdd