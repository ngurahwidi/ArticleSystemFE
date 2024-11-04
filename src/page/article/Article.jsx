import { useEffect, useState } from "react";
import axios from "axios";
import THead from "../../component/THead.jsx";
import ArticleList from "./component/ArticleList.jsx";
import useFetch from "../../hook/useFetch.js";

const Article = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    const url = 'http://127.0.0.1:8000/api/web/v1/articles'

    const {data: articles, loading, error} = useFetch(url, token, 'GET')

    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Hello {username}</h1>
            <p>This is the article page</p>
            <div className="w-25 mb-3">
                <label htmlFor="search" className="form-label">Search</label>
                <input className="form-control" placeholder="Type to search..." />
            </div>
            <table className="table table-bordered">
                <THead titles={["No", "Feature Image", "Title", "Description","Status", "Popular", "Action"]} />
                <ArticleList datas={articles} />
            </table>
        </div>
    );
};

export default Article;