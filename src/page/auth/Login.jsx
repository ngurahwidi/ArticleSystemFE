import {BtnWarning, BtnWarningOutline} from "../../component/Button.jsx";
import Input from "../../component/Input.jsx";
import Label from "../../component/Label.jsx";
import logo from "../../assets/image/logo-vertical.svg"
import FormHeader from "./component/FormHeader.jsx";
import FormFooter from "./component/FormFooter.jsx";
import AuthImage from "./component/AuthImage.jsx";
import AuthImageContent from "./component/AuthImageContent.jsx";
import {useState} from "react";
import useLogin from "./hook/useLogin.js";
import {NavLink} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, loading, error} = useLogin()

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        login(userData)
    }

    return (
        <>
            <div className="d-flex justify-content-between position-fixed">
                <div className="auth-container d-flex flex-column justify-content-around ps-5">
                    <div className="mt-3 ms-5 mb-5">
                        <img src={logo} alt="logo"/>
                    </div>
                    <form className="w-100 d-flex flex-column gap-2 p-5" onSubmit={handleLogin}>
                        <FormHeader/>
                        <div>
                            <Label>Email</Label>
                            <Input type="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                        </div>
                        <div className="mb-5 mt-4">
                            <Label>Password</Label>
                            <Input type="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="text-center mb-5">
                            <p className='text-center text-danger'>{error}</p>
                            <BtnWarning type="submit" className="w-100 btn btn-warning px-4 rounded-3 py-2 mb-3">{loading ? 'Loading...' : 'Login'}</BtnWarning>
                            <NavLink to={'/register'} className="text-decoration-none text-secondary text-center">Create account?</NavLink>
                        </div>
                        <div>
                            <p className="text-center fw-light">Or Sign In Using</p>
                            <BtnWarningOutline>GX Employee OAuth 2.0</BtnWarningOutline>
                        </div>
                    </form>
                    <FormFooter />
                </div>

                <div className="image-container align-items-center rounded-5 m-3 overflow-hidden position-relative">
                    <AuthImage/>
                    <AuthImageContent/>
                </div>
            </div>
        </>
    )
};

export default Login;