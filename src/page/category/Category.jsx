import THead from "../../component/THead.jsx";
import CategoryList from "./component/CategoryList.jsx"
import {useEffect, useState} from "react";
import categoryService from "../../service/api/categoryService.js";
import {AddCircle} from "iconsax-react";
import {useNavigate} from "react-router-dom";
import categoryPath from "../../path/categoryPath.js";

const Category = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCategory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await categoryService.getCategory()
            setCategories(response.data.result)
        } catch (error) {
            setError(error.response.data.status.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <>
            <div className='mb-4'>
                <button className="btn btn-warning px-4 py-1" onClick={() => navigate(categoryPath.add)}><AddCircle
                    color="#d9e3f0"/></button>
            </div>
            <table className="table table-bordered">
                <THead titles={['No', 'Name', 'Icon', 'Status', 'Action']}/>
                <tbody>
                {error ? (
                    <tr>
                        <td colSpan='5' className='text-center text-danger'>{error}</td>
                    </tr>
                ) : loading ? (
                    <tr>
                        <td colSpan='5' className='text-center'>Loading...</td>
                    </tr>
                ) : (
                    <CategoryList datas={categories} fetchCategory={fetchCategory}/>
                )}
                </tbody>
            </table>
        </>
)
}

export default Category