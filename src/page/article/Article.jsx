import THead from "../../component/THead.jsx";
import ArticleList from "./component/ArticleList.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import { format, parseISO, isValid } from 'date-fns';
import Label from "../../component/Label.jsx";

const Article = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const [filters, setFilters] = useState({
        search: '',
        statusId: '',
        categoryIds: [],
        tagsIds: [],
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

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value
        }))
    }

    const handleMultiSelectChange = (key, selectedOptions) => {
        const values = Array.from(selectedOptions, (option) => option.value);
        console.log(values);
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: values
        }));
    };

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

            setCategories(response.data.result);
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
            setTags(response.data.result);
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
                <div className="row">
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
                    <div className="col">
                        <Label>Category</Label>
                        <select
                            className="form-control"
                            multiple
                            value={filters.categoryIds}
                            onChange={(e) => handleMultiSelectChange('categoryIds', e.target.selectedOptions)}
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col">
                        <Label>Tag</Label>
                        <select
                            className="form-control"
                            multiple
                            value={filters.tagsIds}
                            onChange={(e) => handleMultiSelectChange('tagsIds', e.target.selectedOptions)}
                        >
                            <option value="">Select Tag</option>
                            {tags.map(tag => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
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


            <table className="table table-bordered">
                <THead titles={["No", "Feature Image", "Title", "Description", "Status", "Popular", "Action"]}/>
                <ArticleList datas={articles}/>
            </table>
        </div>
    );
};

export default Article;