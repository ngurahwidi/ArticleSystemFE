import THead from "../../component/THead.jsx";
import ArticleList from "./component/ArticleList.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import { format, parseISO, isValid } from 'date-fns';
import Label from "../../component/Label.jsx";
import Select from "react-select";
import {useNavigate} from "react-router-dom";
import {AddCircle} from "iconsax-react";

const Article = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        search: '',
        statusId: '',
        categoryIds: [],
        tagIds: [],
        sortByDate: '',
        sortByPopular: '',
        fromDate: '',
        toDate: '',
    });
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])

    const handleTagChange = (selectedOptions) => {
        const tagIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedTags(selectedOptions);
        setFilters(prevFilters => ({
            ...prevFilters,
            tagIds: tagIds,
        }));
    };

    const handleCategoryChange = (selectedOptions) => {
        const categoryIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setSelectedCategory(selectedOptions);
        setFilters(prevFilters => ({
            ...prevFilters,
            categoryIds: categoryIds,
        }));
    };

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value
        }))
    }

    // const {data: articles, loading, error} = useFetch(url, token, "GET")

    const fetchArticles = async () => {
        setLoading(true);
        setError(null);
        const url = 'http://127.0.0.1:8000/api/web/v1/articles';
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    ...(filters.fromDate && isValid(parseISO(filters.fromDate)) && {
                        fromDate: format(parseISO(filters.fromDate), 'dd/MM/yyyy').toString()
                    }),
                    ...(filters.toDate && isValid(parseISO(filters.toDate)) && {
                        toDate: format(parseISO(filters.toDate), 'dd/MM/yyyy').toString()
                    }),
                    ...(filters.search && { search: filters.search }),
                    ...(filters.statusId && { statusId: filters.statusId }),
                    ...(filters.categoryIds && { categoryIds: filters.categoryIds.join(',') }),
                    ...(filters.tagIds && { tagIds: filters.tagIds.join(',') }),
                    ...(filters.sortByDate && { sort_by_date: filters.sortByDate }),
                    ...(filters.sortByPopular && { sort_by_popular: filters.sortByPopular }),
                }
            });
            setArticles(response.data.result);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                localStorage.clear()
            } else {
                setError(err.response.data.status.message);
            }
        } finally {
            setLoading(false);
        }
    };

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
                return {value: tag.id.toString(), label: tag.name}
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
        fetchArticles();
        fetchCategories()
        fetchTags()
    }, [filters]);

    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Hello {username}</h1>
            <p>This is the article page</p>
            <div className="container mb-5">
                <div className="row mb-4">
                    <div className="col">
                        <Label>Search</Label>
                        <input
                            className="form-control"
                            placeholder="Type to search..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                        />
                    </div>

                    <div className="col">
                        <Label>Status</Label>
                        <select
                            className="form-control text-secondary"
                            value={filters.statusId}
                            onChange={(e) => handleFilterChange('statusId', e.target.value)}
                        >
                            <option value="">Select Status Option</option>
                            <option value="1">Draft</option>
                            <option value="2">Publish</option>
                            <option value="3">Archived</option>
                        </select>
                    </div>

                    <div className='col'>
                        <Label>Tag</Label>
                        <Select
                            value={selectedTags}
                            onChange={handleTagChange}
                            options={tags}
                            placeholder='Select tag'
                            isMulti
                        />
                    </div>

                    <div className="col">
                        <Label>Category</Label>
                        <Select
                            options={categories}
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            placeholder='Select Category'
                            isMulti
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <Label>Sort By Date</Label>
                        <select
                            className="form-control text-secondary"
                            value={filters.sortByDate}
                            onChange={(e) => handleFilterChange('sortByDate', e.target.value)}
                        >
                            <option value="">Select Sort Date Option</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>

                    <div className="col">
                        <Label>Sort By Popular</Label>
                        <select
                            className="form-control text-secondary"
                            value={filters.sortByPopular}
                            onChange={(e) => handleFilterChange('sortByPopular', e.target.value)}
                        >
                            <option value="">Select Popularity Option</option>
                            <option value="desc">Most Popular</option>
                            <option value="asc">Least Popular</option>
                        </select>
                    </div>

                    <div className="col">
                        <Label>From Date</Label>
                        <input
                            type="date"
                            className="form-control text-secondary"
                            value={filters.fromDate}
                            onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                        />
                    </div>

                    <div className="col">
                        <Label>To Date</Label>
                        <input
                            type="date"
                            className="form-control text-secondary"
                            value={filters.toDate}
                            onChange={(e) => handleFilterChange('toDate', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className='mb-4'>
                <button className="btn btn-primary px-4 py-1" onClick={() => navigate('/article/add')}><AddCircle color="#d9e3f0"/></button>
            </div>

            <table className="table table-bordered">
                <THead titles={["No", "Feature Image", "Title", "Description", "Status", "Popular", "Action"]}/>
                <ArticleList datas={articles} fetchArticles={fetchArticles} />
            </table>
        </div>
    );
};

export default Article;