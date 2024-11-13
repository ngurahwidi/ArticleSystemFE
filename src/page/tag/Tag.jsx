import THead from "../../component/THead.jsx";
import TagList from './component/TagList.jsx'
import {useEffect, useState} from "react";
import tagService from "../../service/api/tagService.js";

const Tag = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTags = async () => {
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
        fetchTags();
    }, [])

    return (
        <div>
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
                    <TagList datas={tags}/>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Tag