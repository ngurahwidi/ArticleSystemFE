import image from "../../../assets/image/login-image.svg";

const AuthImage = () => {
    return (
        <img src={image} alt="image" className="w-100 h-100 object-fit-cover position-absolute" />
    )
}

export default AuthImage;