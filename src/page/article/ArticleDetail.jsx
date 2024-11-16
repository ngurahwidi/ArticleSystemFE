import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import articleService from "../../service/api/articleService.js";
import formatDate from "../../helper/dateFormat.js";

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [error, setError] = useState(null);

    const fetchArticle = async () => {
        try {
            const response = await articleService.getArticleById(id)
            setArticle(response.data.result);
        } catch (err) {
            setError(err.response.data.status.message);
        }
    }

    useEffect(() => {
        fetchArticle();
    }, [id])
    return (
        <>
            <div>
                {error && <p>{error.message}</p>}
                <div className="ms-5">
                    <div className='mt-5 mb-5 ms-5'>
                        <h1 style={{fontSize: "4.5rem"}} className='fw-bolder w-75'>{article.title}</h1>
                    </div>
                    <div className='d-flex gap-5 ms-5'>
                        <div>
                            <p className='fw-bolder'>Published</p>
                            <p className='text-secondary fw-bold'>{article.createdAt ? formatDate(article.createdAt) : "Unknown Date"}</p>
                        </div>
                        <div className='ms-5'>
                            <p className='fw-bolder'>Author</p>
                            <p className='text-secondary fw-bold'>{article.user?.username || "Unknown Author"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 ps-4">
                <div style={{maxHeight: "85vh"}}
                     className='mb-5 w-100 overflow-hidden rounded-5 position-relative'>
                    <img style={{height: "300px", width: "500px"}} src={`http://127.0.0.1:8000${article.featuredImage}`}
                         alt='featured image' className='h-100 w-100 position-relative'/>
                </div>
            </div>
            <div className="container">
                <div className="row flex-row-reverse">
                    <div className="col-md-9">
                        <div
                            dangerouslySetInnerHTML={{__html: article.content}}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default ArticleDetail