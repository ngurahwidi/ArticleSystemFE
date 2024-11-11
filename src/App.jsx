import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./page/auth/Login.jsx";
import Register from "./page/auth/Register.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./page/Dashboard.jsx";
import Article from "./page/article/Article.jsx";
import Tag from "./page/tag/Tag.jsx";
import Home from "./page/Home.jsx";
import Category from "./page/category/Category.jsx";
import Comment from "./page/comment/Comment.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AuthRoute from "./AuthRoute.jsx";
import ArticleAdd from "./page/article/ArticleAdd.jsx";
import ArticleDetail from "./page/article/ArticleDetail.jsx";
import ArticleEdit from "./page/article/ArticleEdit.jsx";
import {loginPath, registerPath} from "./path/authPath.js";
import {articlePath, categoryPath, tagPath} from "./path/crudPath.js";
import Layout from "./page/layout/Layout.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route
                  path={loginPath}
                  element={
                      <ProtectedRoute>
                          <Login />
                      </ProtectedRoute>
                  }
              />
              <Route
                  path={registerPath}
                  element={
                      <ProtectedRoute>
                          <Register />
                      </ProtectedRoute>
                  }
              />
              <Route element={<AuthRoute/>}>
                  <Route path="/" element={<Layout/>}>
                      <Route index element={<Home/>}/>
                      <Route path={articlePath.list} element={<Article/>} />
                      <Route path={articlePath.add} element={<ArticleAdd />} />
                      <Route path={articlePath.detail} element={<ArticleDetail />} />
                      <Route path={articlePath.edit} element={<ArticleEdit />} />
                      <Route path={tagPath.list} element={<Tag/>}/>
                      <Route path={categoryPath.list} element={<Category/>}/>
                      <Route path="comment" element={<Comment/>}/>
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
