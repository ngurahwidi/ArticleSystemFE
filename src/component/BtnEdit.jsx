import {Edit} from "iconsax-react";

const BtnEdit = ({onClick}) => {
    return (
        <button className="btn bg-white btn-sm" onClick={onClick}>
            <Edit color="#ebdb34" variant="Outline" size='20'/>
        </button>
    )
}

export default BtnEdit