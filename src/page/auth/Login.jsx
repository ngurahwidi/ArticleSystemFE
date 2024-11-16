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
            <div className="row min-vh-100 bg-white">
                <div className="col-md-5">
                    <div className="w-100 d-flex flex-wrap">
                        <div className="px-5 mx-5">
                            <div className="mt-3 ms-5 mb-5 pt-5">
                                <img src={logo} alt="logo"/>
                            </div>
                            <form className="w-100 d-flex flex-column gap-2 p-5" onSubmit={handleLogin}>
                                <FormHeader/>
                                <div>
                                    <Label>Email</Label>
                                    <Input type="email" id="email" placeholder="email" value={email}
                                           onChange={(e) => setEmail(e.target.value)}></Input>
                                </div>
                                <div className="mb-5 mt-4">
                                    <Label>Password</Label>
                                    <Input type="password" id="password" placeholder="password" value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="text-center mb-5">
                                    <p className='text-center text-danger'>{error}</p>
                                    <BtnWarning type="submit"
                                                className="w-100 btn btn-warning px-4 rounded-3 py-2 mb-3">{loading ? 'Loading...' : 'Login'}</BtnWarning>
                                    <NavLink to={'/register'}
                                             className="text-decoration-none text-secondary text-center">Create
                                        account?</NavLink>
                                </div>
                                <div>
                                    <p className="text-center fw-light">Or Sign In Using</p>
                                    <BtnWarningOutline>GX Employee OAuth 2.0</BtnWarningOutline>
                                </div>
                            </form>
                        </div>
                        <div className="px-5 w-100">
                            <FormFooter/>
                        </div>
                    </div>
                </div>

                <div className="col-md-7 position-relative p-4">
                    <div className="w-100 h-100 position-relative overflow-hidden rounded-4">
                        <AuthImage/>
                        <AuthImageContent/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;