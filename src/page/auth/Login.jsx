import {BtnWarning, BtnWarningOutline} from "../../component/Button.jsx";
import Input from "../../component/Input.jsx";
import Label from "../../component/Label.jsx";
import logo from "../../assets/image/logo-vertical.svg"
import FormHeader from "./component/FormHeader.jsx";
import FormFooter from "./component/FormFooter.jsx";
import AuthImage from "./component/AuthImage.jsx";
import AuthImageContent from "./component/AuthImageContent.jsx";

const Login = () => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center gap-5">
                <div className="auth-container d-flex flex-column justify-content-between ps-5">
                    <div className="mt-3 ms-5 mb-5">
                        <img src={logo} alt="logo"/>
                    </div>
                    <form className="w-100 d-flex flex-column gap-2 p-5">
                        <FormHeader/>
                        <div>
                            <Label>Username</Label>
                            <Input type="text" id="username" placeholder="username"></Input>
                        </div>
                        <div className="mb-5 mt-4">
                            <Label>Password</Label>
                            <Input type="password" id="password" placeholder="password"/>
                        </div>
                        <div className="text-center mb-5">
                            <BtnWarning className="w-100 btn btn-warning px-4 rounded-3 py-2">Login</BtnWarning>
                        </div>
                        <div>
                            <p className="text-center fw-light">Or Sign In Using</p>
                            <BtnWarningOutline>GX Employee OAuth 2.0</BtnWarningOutline>
                        </div>
                    </form>
                    <FormFooter />
                </div>

                <div className="image-container overflow-hidden w-75 rounded-5 m-3 position-relative">
                    <AuthImage/>
                    <AuthImageContent/>
                </div>
            </div>
        </>
    )
};

export default Login;