import {BtnWarning, BtnWarningOutline} from "../component/BtnPrimary.jsx";
import Input from "../component/Input.jsx";
import Label from "../component/Label.jsx";
import logo from "../assets/image/logo-vertical.svg"
import image from "../assets/image/login-image.png"

const Login = () => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center gap-5">
                <div style={{height: "1024px", width: "624px"}} className="d-flex flex-column justify-content-between ps-5">
                    <div className="mt-3 ms-5 mb-5">
                        <img src={logo} alt="logo"/>
                    </div>
                    <form className="w-100 d-flex flex-column gap-2 p-5">
                        <div className="mb-5">
                            <h1 style={{fontSize: "26px"}} className="fw-normal">Welcome to <span className="fw-bold">GX Hybrid Work Schedule System V1.0</span>
                            </h1>
                            <p style={{fontSize: "14px"}} className="fw-light">Sign in to your account below</p>
                        </div>
                        <div>
                            <Label>Username</Label>
                            <Input type="text" id="username" placeholder="username"></Input>
                        </div>
                        <div className="mb-5 mt-4">
                            <Label>Password</Label>
                            <Input type="password" id="password" placeholder="password"/>
                        </div>
                        <div className="text-center mb-5">
                            <BtnWarning>Login</BtnWarning>
                        </div>
                        <div>
                            <p className="text-center fw-light">Or Sign In Using</p>
                            <BtnWarningOutline>GX Employee OAuth 2.0</BtnWarningOutline>
                        </div>
                    </form>
                    <div className="d-flex gap-4 mt-5 border-top w-100 py-5 justify-content-center align-items-center">
                        <p style={{fontSize: "11px"}} className="fw-light">© 2024 GX APP - Committed to better quality</p>
                        <p style={{fontSize: "11px"}} className="fw-light">Design & Development By GlobalXtreme</p>
                    </div>
                </div>

                <div style={{height: "1024px"}} className="overflow-hidden w-75 rounded-5 m-3 position-relative">
                    <img style={{width: "1538.7px", height: "1025.8px"}} src={image} alt="image"/>
                    <div style={{top: "682px", left: "75px"}} className="position-absolute text-white">
                        <p style={{fontSize: "24px"}}>-
                            Gordon B. Hinckley</p>
                        <h1 style={{fontSize: "34px"}} className="w-75">Without hard work, noting grows but weeds.</h1>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;