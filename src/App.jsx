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

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="/" element={<Dashboard/>}>
                  <Route index element={<Home/>}/>
                  <Route path="article" element={<Article/>} />
                  <Route path="tag" element={<Tag/>}/>
                  <Route path="category" element={<Category/>}/>
                  <Route path="comment" element={<Comment/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
