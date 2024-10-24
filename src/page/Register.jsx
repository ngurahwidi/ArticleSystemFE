import logo from '../assets/image/logo-vertical.svg'
import Label from "../component/Label.jsx";
import Input from "../component/Input.jsx";
import {BtnWarning, BtnWarningOutline} from "../component/Button.jsx";
import LoginImage from "../component/login/LoginImage.jsx";
import LoginImageContent from "../component/login/LoginImageContent.jsx";
import FormHeader from "../component/login/FormHeader.jsx";
import FormFooter from "../component/login/FormFooter.jsx";

const Register = () => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center gap-5">
                <div className="content-container d-flex flex-column justify-content-between ps-5">
                    <div className="mt-3 ms-5 mb-5">
                        <img src={logo} alt="logo"/>
                    </div>
                    <form className="w-100 d-flex flex-column gap-4 p-5">
                        <FormHeader/>
                        <div>
                            <Label>Username</Label>
                            <Input type="text" id="username" placeholder="username"/>
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input type="email" id="email" placeholder="email"/>
                        </div>
                        <div>
                            <Label>Password</Label>
                            <Input type="password" id="password" placeholder="password"/>
                        </div>
                        <div className="text-center mb-5">
                            <BtnWarning>Register</BtnWarning>
                        </div>
                        <div>
                            <p className="text-center fw-light">Or Sign In Using</p>
                            <BtnWarningOutline>GX Employee OAuth 2.0</BtnWarningOutline>
                        </div>
                    </form>
                    <FormFooter/>
                </div>
                <div className="image-container w-75 overflow-hidden rounded-5 m-3 position-relative">
                    <LoginImage/>
                    <LoginImageContent/>
                </div>
            </div>
        </>
    )
}

export default Register