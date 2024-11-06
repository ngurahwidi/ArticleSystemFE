import logo from '../../assets/image/logo-vertical.svg'
import Label from "../../component/Label.jsx";
import Input from "../../component/Input.jsx";
import {BtnWarning} from "../../component/Button.jsx";
import AuthImage from "./component/AuthImage.jsx";
import AuthImageContent from "./component/AuthImageContent.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import useRegister from "./hook/useRegister.js";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [bio, setBio] = useState("");
    const [roleId, setRoleId] = useState("");
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {register} = useRegister()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile(file);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profile) {
            setError("Please select an image to upload.");
            return;
        }

        setLoading(true);

        const userData = {
            username,
            email,
            password,
            phone,
            bio,
            roleId,
            profile,
        }
        try {
            const response = await register(userData);

            console.log("User  registered successfully:", response.data);
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            setError("Failed to register user.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="d-flex justify-content-between align-items-center gap-5">
                <div className="auth-container d-flex flex-column justify-content-around ps-5">
                    <div className="mt-3 ms-5 mb-3">
                        <img src={logo} alt="logo"/>
                    </div>
                    <form className="w-100 d-flex flex-column gap-3 p-4" onSubmit={handleSubmit}>
                        <h1>Register</h1>
                        <div>
                            <Label>Username</Label>
                            <Input type="text" id="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input type="email" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <Label>Password</Label>
                            <Input type="password" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <Label>Phone</Label>
                            <Input type="text" id="phone" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                        <div>
                            <Label>Bio</Label>
                            <textarea className="form-control" placeholder="bio" value={bio} id='bio' onChange={(e) => setBio(e.target.value)} />
                        </div>
                        <div>
                            <Label>Profile</Label>
                            <Input type="file" id="profile" placeholder="profile" onChange={handleImageChange} accept="image/*" />
                        </div>
                        <div>
                            <Label>Role</Label>
                            <select className="form-control" id='roleId' value={roleId} onChange={(e) => setRoleId(e.target.value)} required>
                                <option value="">Select Role</option>
                                <option value="1">Admin</option>
                                <option value="2">Author</option>
                                <option value="3">Subscriber</option>
                            </select>
                        </div>
                        <div className="text-center mt-4 mb-3">
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                            <BtnWarning className="w-100 btn btn-warning px-4 py-2 rounded-3" type='submit'>{loading ? 'Registering..' : 'Register'}</BtnWarning>
                        </div>
                        <NavLink to={'/login'} className="text-decoration-none text-secondary text-center">Have an account?</NavLink>
                    </form>
                </div>
                <div className="image-container w-75 overflow-hidden rounded-5 m-3 position-relative">
                <AuthImage/>
                    <AuthImageContent/>
                </div>
            </div>
        </>
    )
}

export default Register