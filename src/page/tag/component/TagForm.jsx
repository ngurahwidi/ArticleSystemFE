import Label from "../../../component/Label.jsx";
import Input from "../../../component/Input.jsx";

const TagForm = ({onSubmit, name, handleChange, handleIconChange, statusId, onCancel}) => {
    return (
        <form onSubmit={onSubmit}>
            <div className='mb-3'>
                <Label>Name</Label>
                <Input
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleChange}
                />
            </div>

            <div className='mb-3'>
                <Label>Icon</Label>
                <Input
                    type='file'
                    onChange={handleIconChange}
                />
            </div>

            <div className='mb-3'>
                <Label>Status</Label>
                <select
                    className='form-control'
                    name='statusId'
                    value={statusId}
                    onChange={handleChange}
                    required
                >
                    <option value='1'>Draft</option>
                    <option value='2'>Publish</option>
                    <option value='3'>Archived</option>
                </select>
            </div>

            <button
                className='btn btn-outline-warning'
                type='button'
                onClick={onCancel}
            >
                Cancel
            </button>
            <button type='submit' className='btn btn-warning ms-2'>
                Save Tag
            </button>
        </form>
    )
}

export default TagForm;