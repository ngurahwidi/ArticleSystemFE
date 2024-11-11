import Label from "../../../component/Label.jsx";
import Input from "../../../component/Input.jsx";
import Select from "react-select";

const ArticleForm = ({
                         title,
                         setTitle,
                         description,
                         setDescription,
                         content,
                         setContent,
                         handleImageChange,
                         handleGalleryChange,
                         statusId,
                         setStatusId,
                         categories,
                         selectedCategory,
                         handleCategoryChange,
                         tags,
                         selectedTag,
                         handleTagChange,
                         onSubmit,
                         onCancel,
                     }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className='mb-3'>
                <Label>Title</Label>
                <Input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className='mb-3'>
                <Label>Description</Label>
                <Input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className='mb-3'>
                <Label>Content</Label>
                <Input
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div className='mb-3'>
                <Label>Feature Image</Label>
                <Input type='file' onChange={handleImageChange} />
            </div>
            <div className='mb-3'>
                <Label>Gallery</Label>
                <input
                    type='file'
                    className='form-control'
                    onChange={handleGalleryChange}
                    multiple
                />
            </div>
            <div className='mb-3'>
                <Label>Status</Label>
                <select
                    className='form-control'
                    value={statusId}
                    onChange={(e) => setStatusId(e.target.value)}
                    required
                >
                    <option value='1'>Draft</option>
                    <option value='2'>Publish</option>
                    <option value='3'>Archived</option>
                </select>
            </div>
            <div className='mb-3'>
                <Label>Category</Label>
                <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    options={categories}
                    placeholder='Select Category'
                    isMulti
                />
            </div>
            <div className='mb-3'>
                <Label>Tag</Label>
                <Select
                    value={selectedTag}
                    onChange={handleTagChange}
                    options={tags}
                    placeholder='Select Tag'
                    isMulti
                />
            </div>
            <button
                className='btn btn-outline-warning'
                type='button'
                onClick={onCancel}
            >
                Cancel
            </button>
            <button type='submit' className='btn btn-warning ms-2'>
                Save Article
            </button>
        </form>
    );
};

export default ArticleForm;