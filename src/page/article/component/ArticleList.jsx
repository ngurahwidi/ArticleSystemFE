import logo from "../../../assets/image/avatar.svg";
import BtnDetail from "../../../component/BtnDetail.jsx"
import BtnDelete from "../../../component/BtnDelete.jsx";
import BtnEdit from "../../../component/BtnEdit.jsx";
import Swal from "sweetalert2";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {articlePath} from "../../../path/crudPath.js";

const ArticleList = ({ datas, fetchArticles }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action will permanently delete the article.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/web/v1/articles/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                Swal.fire(
                    'Deleted!',
                    'The article has been deleted.',
                    'success'
                )

                fetchArticles()
            } catch (err) {
                Swal.fire(
                    'Error!',
                    'There was an error deleting the article.!',
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
                    <td>
                        <img
                            src={data.featuredImage ? `http://127.0.0.1:8000${data.featuredImage}` : logo}
                            alt={data.title}
                            style={{width: '50px', height: '50px'}}
                        />
                    </td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td>{data.status.name}</td>
                    <td>{data.popular}</td>
                    <td>
                        <BtnDetail onClick={() => navigate(`${articlePath.list}/${data.id}`)}/>
                        <BtnEdit onClick={() => navigate(`${articlePath.list}/${data.id}/edit`)}/>
                        <BtnDelete onClick={() => handleDelete(data.id)} />
                    </td>
                </tr>
            ))}
        </>
    )
}

export default ArticleList;