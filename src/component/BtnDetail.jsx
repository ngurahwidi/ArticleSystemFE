import {Eye} from "iconsax-react";

const BtnDetail = ({onClick}) => {
    return (
        <button className='btn bg-white btn-sm rounded' onClick={onClick}>
            <Eye
                color="#555555"
                size='20'
            />
        </button>
    )
}

export default BtnDetail