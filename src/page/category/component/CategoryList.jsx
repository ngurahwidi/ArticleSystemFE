import logo from '../../../assets/image/avatar.svg'
import BtnEdit from "../../../component/BtnEdit.jsx";
import BtnDelete from "../../../component/BtnDelete.jsx";
import {useNavigate} from "react-router-dom";
import categoryPath from "../../../path/categoryPath.js";
import Swal from "sweetalert2";
import categoryService from "../../../service/api/categoryService.js";

const CategoryList = ({ datas, fetchCategory }) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action will permanently delete the category.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if (result.isConfirmed) {
            try {
                await categoryService.deleteCategory(id)

                Swal.fire(
                    'Deleted!',
                    'The category has been deleted.',
                    'success'
                )

                fetchCategory()
            } catch (err) {
                Swal.fire(
                    'Error!',
                    'There was an error deleting the category.!',
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
                        <BtnEdit onClick={() => navigate(`${categoryPath.list}/${data.id}/edit`)}/>
                        <BtnDelete onClick={() => handleDelete(data.id)}/>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default CategoryList;