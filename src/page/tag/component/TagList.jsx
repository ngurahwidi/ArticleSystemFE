import logo from '../../../assets/image/avatar.svg'
import BtnEdit from "../../../component/BtnEdit.jsx";
import BtnDelete from "../../../component/BtnDelete.jsx";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import tagService from "../../../service/api/tagService.js";
import tagPath from "../../../path/tagPath.js";

const TagList = ({ datas, fetchTag }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action will permanently delete the tag.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if (result.isConfirmed) {
            try {
                await tagService.deleteTag(id)
                Swal.fire(
                    'Deleted!',
                    'The tag has been deleted.',
                    'success'
                )
                fetchTag()
            } catch (err) {
                Swal.fire(
                    'Error!',
                    'There was an error deleting the tag.',
                    'error'
                )
            }

        }
    }
    return (
        <>
        {datas.map((data, index) => (
            <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>
                    <img
                        src={data.icon ? `http://127.0.0.1:8000${data.icon}` : logo}
                        alt={data.name}
                        style={{width: '50px', height: '50px'}}
                    />
                </td>
                <td>{data.status.name}</td>
                <td>
                    <BtnEdit onClick={() => navigate(`${tagPath.list}/${data.id}/edit`)}/>
                    <BtnDelete onClick={() => handleDelete(data.id)}/>
                </td>
            </tr>
        ))}
        </>
    )
}

export default TagList;