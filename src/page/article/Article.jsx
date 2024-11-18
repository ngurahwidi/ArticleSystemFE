import THead from "../../component/THead.jsx";
import ArticleList from "./component/ArticleList.jsx";
import {useEffect, useState} from "react";
import { format, parseISO, isValid } from 'date-fns';
import {useNavigate} from "react-router-dom";
import {AddCircle} from "iconsax-react";
import articlePath from "../../path/articlePath.js";
import articleService from "../../service/api/articleService.js";
import categoryService from "../../service/api/categoryService.js";
import tagService from "../../service/api/tagService.js";
import ArticleFilter from "./component/ArticleFilter.jsx";

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
            <ArticleFilter
                search={filters.search}
                handleChange={handleChange}
                statusId={filters.statusId}
                selectedTags={selectedTags}
                handleTagChange={handleTagChange}
                tags={tags}
                categories={categories}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                sortByDate={filters.sortByDate}
                sortByPopular={filters.sortByPopular}
                fromDate={filters.fromDate}
                toDate={filters.toDate}
                fetchArticles={fetchArticles}
            />

            <div className='mb-4'>
                <button className="btn btn-warning px-4 py-1" onClick={() => navigate(articlePath.add)}><AddCircle
                    color="#555555"/></button>
            </div>

            <table className="table">
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