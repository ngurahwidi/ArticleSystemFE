import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import categoryService from "../../service/api/categoryService.js";
import Swal from "sweetalert2";
import categoryPath from "../../path/categoryPath.js";
import CategoryForm from "./component/CategoryForm.jsx";

const CategoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formRequest, setFormRequest] = useState({
        name: '',
        statusId: ''
    });
    const [icon, setIcon] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormRequest((prevState) => {
            const newState = {...prevState}
            newState[name] = value;
            return newState;
        })
    }

    const handleIconChange = (e) => {
        setIcon(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoryData = {
            name: formRequest.name,
            statusId: formRequest.statusId,
            icon
        }
        try {
            await categoryService.updateCategory(id, categoryData);
            Swal.fire("Success", "Category updated successfully!", "success");
            navigate(categoryPath.list)
        } catch (err) {
            setError(err.response.data.status.message);
        }
    }

    const fetchCategoryData = async () => {
        try {
            const response = await categoryService.getCategoryById(id)

            const category = response.data.result;
            setFormRequest((prevState) => ({
                ...prevState,
                name: category.name,
                statusId: category.status.id,
            }))
        } catch (err) {
            setError(err.response.data.status.message);
        }
    }

    useEffect(() => {
        fetchCategoryData();
    }, [])
    return (
        <div className='card card-body'>
            <h1 className='mb-3 fs-2'>Edit Category</h1>
            <CategoryForm
                onSubmit={handleSubmit}
                name={formRequest.name}
                statusId={formRequest.statusId}
                handleIconChange={handleIconChange}
                handleChange={handleChange}
                onCancel={() => navigate(categoryPath.list)}
            />
        </div>
    )
}

export default CategoryEdit