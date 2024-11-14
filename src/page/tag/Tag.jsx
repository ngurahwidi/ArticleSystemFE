import THead from "../../component/THead.jsx";
import TagList from './component/TagList.jsx'
import {useEffect, useState} from "react";
import tagService from "../../service/api/tagService.js";
import {AddCircle} from "iconsax-react";
import {useNavigate} from "react-router-dom";
import tagPath from "../../path/tagPath.js";

const Tag = () => {
    const navigate = useNavigate()
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTag = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await tagService.getTag()
            setTags(response.data.result)
        } catch (err) {
            setError(err.response.data.status.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTag();
    }, [])

    return (
        <div>
            <div className='mb-4'>
                <button className="btn btn-warning px-4 py-1" onClick={() => navigate(tagPath.add)}><AddCircle
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
                    <TagList datas={tags} fetchTag={fetchTag}/>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Tag