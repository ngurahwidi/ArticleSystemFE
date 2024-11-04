import THead from "../../component/THead.jsx";
import CategoryList from "./component/CategoryList.jsx"
import useFetch from "../../hook/useFetch.js";

const Category = () => {
    const token = localStorage.getItem("token");
    const url = 'http://127.0.0.1:8000/api/web/v1/articles/components/categories'

    const {data: category, loading, error} = useFetch(url, token)

    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Hello widi</h1>
            <p>This is category page</p>

            <table className="table table-bordered">
                <THead titles={['No', 'Name', 'Icon', 'Status', 'Action']} />
                <CategoryList datas={category}/>
            </table>
        </div>
    )
}

export default Category