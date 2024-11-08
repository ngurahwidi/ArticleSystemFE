import {Trash} from "iconsax-react";

const BtnDelete = ({onClick}) => {
    return (
        <button className='btn btn-danger btn-sm mx-1' onClick={onClick}>
            <Trash color="#d9e3f0" variant="Outline" />
        </button>
    )
}
export default BtnDelete