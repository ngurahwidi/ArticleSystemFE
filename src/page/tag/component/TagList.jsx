import logo from '../../../assets/image/avatar.svg'
import BtnDetail from "../../../component/BtnDetail.jsx";
import BtnEdit from "../../../component/BtnEdit.jsx";
import BtnDelete from "../../../component/BtnDelete.jsx";

const TagList = ({ datas }) => {
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
                    <BtnDetail />
                    <BtnEdit />
                    <BtnDelete />
                </td>
            </tr>
        ))}
        </>
    )
}

export default TagList;