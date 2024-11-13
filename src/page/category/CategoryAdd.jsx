import {useNavigate} from "react-router-dom";
import {useState} from "react";
import CategoryForm from "./component/CategoryForm.jsx";
import categoryService from "../../service/api/categoryService.js";
import Swal from "sweetalert2";
import categoryPath from "../../path/categoryPath.js";

const CategoryAdd = () => {
    const navigate = useNavigate();
    const [formRequest, setFormRequest] = useState({
        name: '',
        statusId: '2',
    })
    const [icon, setIcon] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;

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
            await categoryService.createCategory(categoryData);
            Swal.fire("Success", "Category added successfully!", "success");
            navigate(categoryPath.list)
        } catch (error) {
            setError(error.response.data.status.message);
        }
    }

    return (
        <div className='card card-body'>
            <h1 className='fs-2 mb-3'>Add Category</h1>
            <p className='text-danger'>{error}</p>
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

export default CategoryAdd;