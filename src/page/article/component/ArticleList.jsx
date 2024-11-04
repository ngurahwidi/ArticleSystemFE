import logo from "../../../assets/image/avatar.svg";
import BtnDetail from "../../../component/BtnDetail.jsx"
import BtnDelete from "../../../component/BtnDelete.jsx";
import BtnEdit from "../../../component/BtnEdit.jsx";

const ArticleList = ({ datas }) => {
    return (
        <tbody>
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
                    <BtnDetail />
                    <BtnEdit />
                    <BtnDelete />
                </td>
            </tr>
        ))}
        </tbody>
    )
}

export default ArticleList;