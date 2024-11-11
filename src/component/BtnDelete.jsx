import {Trash} from "iconsax-react";

const BtnDelete = ({onClick}) => {
    return (
        <button className='btn bg-white btn-sm' onClick={onClick}>
            <Trash color="#f47373" variant="Outline" size='20'/>
        </button>
    )
}
export default BtnDelete