import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./page/Layout.jsx";
import Article from "./page/Article.jsx";
import Tag from "./page/Tag.jsx";
import Home from "./page/Home.jsx";
import Category from "./page/Category.jsx";
import Comment from "./page/Comment.jsx";

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
