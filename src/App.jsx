import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./page/Dasboard.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<Dashboard/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
