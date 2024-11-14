import TagForm from "./component/TagForm.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import tagService from "../../service/api/tagService.js";
import Swal from "sweetalert2";
import tagPath from "../../path/tagPath.js";

const TagAdd = () => {
    const navigate = useNavigate();
    const [formRequest, setFormRequest] = useState({
        name: '',
        statusId: '2'
    })
    const [icon, setIcon] = useState(null);
    const [error, setError] = useState(null);

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

        const tagData = {
            name: formRequest.name,
            statusId: formRequest.statusId,
            icon
        }

        try {
            await tagService.createTag(tagData)
            Swal.fire("Success", "Tag added successfully!", "success");
            navigate(tagPath.list);
        } catch (err) {
            setError(err.response.data.status.message);
        }
    }
    return (
        <div className='card card-body'>
            <h1 className='mb-3 fs-2'>Add Tag</h1>
            <p className='text-danger'>{error}</p>
            <TagForm
                onSubmit={handleSubmit}
                name={formRequest.name}
                statusId={formRequest.statusId}
                handleIconChange={handleIconChange}
                handleChange={handleChange}
                onCancel={() => navigate(tagPath.list)}
            />
        </div>
    )
}

export default TagAdd