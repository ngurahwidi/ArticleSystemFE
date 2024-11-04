import THead from "../../component/THead.jsx";
import TagList from './component/TagList.jsx'
import useFetch from "../../hook/useFetch.js";

const Tag = () => {
    const token = localStorage.getItem("token");
    const url = 'http://127.0.0.1:8000/api/web/v1/articles/components/tags'

    const {data: tag, loading, error} = useFetch(url, token)

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>Hello Widi</h1>
            <p>This is tag page</p>

            <table className="table table-bordered">
                <THead titles={['No', 'Name', 'Icon', 'Status', 'Action']} />
                <TagList datas={tag}/>
            </table>
        </div>
    )
}

export default Tag