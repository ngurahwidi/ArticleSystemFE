import THead from "../../component/THead.jsx";
import ArticleList from "./component/ArticleList.jsx";
import {useEffect, useState} from "react";
import { format, parseISO, isValid } from 'date-fns';
import Label from "../../component/Label.jsx";
import Select from "react-select";
import {useNavigate} from "react-router-dom";
import {AddCircle} from "iconsax-react";
import articlePath from "../../path/articlePath.js";
import articleService from "../../service/api/articleService.js";
import categoryService from "../../service/api/categoryService.js";
import tagService from "../../service/api/tagService.js";

const Article = () => {
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

    const handleChange = (e) => {
        const {name, value} = e.target

        setFilters((prevState) => {
            const newUpdateState = {...prevState}
            newUpdateState[name] = value;

            return newUpdateState;
        })
    }

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

    const fetchArticles = async () => {
        setLoading(true);
        setError(null);
        const params = {
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
        try {
            const response = await articleService.getArticles(params);
            setArticles(response.data.result);
        } catch (err) {
            setError(err.response.data.status.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getCategory()

            setCategories(response.data.result.map((category) => {
                return {value: category.id, label: category.name};
            }));
        } catch (err) {
            setError(err.response.data.status.message);
        }
    }

    const fetchTags = async () => {
        try {
            const response = await tagService.getTag()
            setTags(response.data.result.map((tag) => {
                return {value: tag.id, label: tag.name}
            }));
        } catch (err) {
            setError(err.response.data.status.message);
        }
    }

    useEffect(() => {
        fetchArticles();
        fetchCategories();
        fetchTags();
    }, [])

    return (
        <>
            <div className="mb-5">
                <div className="row mb-4">
                    <div className="col">
                        <Label>Search</Label>
                        <input
                            className="form-control"
                            placeholder="Type to search..."
                            name="search"
                            value={filters.search}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col">
                        <Label>Status</Label>
                        <select
                            className="form-control text-secondary"
                            value={filters.statusId}
                            name='statusId'
                            onChange={handleChange}
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
                            placeholder='Tag'
                            isMulti
                        />
                    </div>

                    <div className="col">
                        <Label>Category</Label>
                        <Select
                            options={categories}
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            placeholder='Category'
                            isMulti
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className="col">
                        <Label>Sort By Date</Label>
                        <select
                            className="form-control text-secondary"
                            name='sortByDate'
                            value={filters.sortByDate}
                            onChange={handleChange}
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
                            name='sortByPopular'
                            value={filters.sortByPopular}
                            onChange={handleChange}
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
                            name='fromDate'
                            className="form-control text-secondary"
                            value={filters.fromDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col">
                        <Label>To Date</Label>
                        <input
                            type="date"
                            name='toDate'
                            className="form-control text-secondary"
                            value={filters.toDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type='button' onClick={fetchArticles}
                        className='btn btn-sm btn-outline-warning px-4 py-1 mt-3'>Search
                </button>
            </div>

            <div className='mb-4'>
                <button className="btn btn-warning px-4 py-1" onClick={() => navigate(articlePath.add)}><AddCircle
                    color="#d9e3f0"/></button>
            </div>

            <table className="table table-bordered">
                <THead titles={["No", "Feature Image", "Title", "Description", "Status", "Popular", "Action"]}/>
                <tbody>
                {error ? (
                    <tr>
                        <td colSpan='7' className='text-center text-danger'>{error}</td>
                    </tr>
                ) : loading ? (
                    <tr>
                        <td colSpan='7' className='text-center'>Loading...</td>
                    </tr>
                ) : (
                    <ArticleList datas={articles} fetchArticles={fetchArticles}/>
                )}
                </tbody>
            </table>
        </>
    );
};

export default Article;