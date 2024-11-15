import Label from "../../../component/Label.jsx";
import Input from "../../../component/Input.jsx";
import TextArea from "../../../component/TextArea.jsx";
import Select from "react-select";

const ArticleFormClone = ({
                            title,
                            handleChange,
                            description,
                            content,
                            handleImageChange,
                            statusId,
                            selectedCategory,
                            handleCategoryChange,
                            categories,
                            selectedTag,
                            handleTagChange,
                            tags,
                            handleGalleryChange,
                            onSubmit,
                            onCancel,
                          }) => {
    return (
        <form className='row' onSubmit={onSubmit}>
            <div className='col-md-8 mb-3 card card-body'>
                <h1 className='mb-4 fs-4'>New Blog</h1>
                <div className='form-group'>
                    <Label className="fw-bold mb-2">Title<span className="required">*</span></Label>
                    <Input
                        type='text'
                        name='title'
                        placeholder='Write down the title here'
                        value={title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <Label className="fw-bold mb-2">Description<span className="required">*</span></Label>
                    <TextArea
                        name="description"
                        row="3"
                        placeholder="Write down the description here"
                        value={description}
                        onChange={handleChange}
                        required></TextArea>
                </div>

                <div className="form-group">
                    <Label className="fw-bold mb-2">Content<span className="required">*</span></Label>
                    <TextArea
                        name="content"
                        row="6"
                        placeholder="Content here"
                        value={content}
                        onChange={handleChange}
                        required></TextArea>
                </div>
            </div>

            <div className="col-md-4">
                <div className="form-group mb-4 card card-body">
                    <h1 className="fs-4">Featured Image<span className="required">*</span></h1>
                    <Input type="file" onChange={handleImageChange} />
                </div>

                <div className="form-group mb-4 card card-body">
                    <h1 className="fs-4">Blog Properties</h1>
                    <div className='mb-2'>
                        <Label className="fw-normal mb-2">Status<span className="required">*</span></Label>
                        <div className="form-check">
                            <input type="radio" name="statusId" value="1" className="form-check-input" checked={statusId === "1"} onChange={handleChange} />
                            <Label>Draft</Label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="status" id="status" value="2" className="form-check-input" checked={statusId === "2"} onChange={handleChange} />
                            <Label>Publish</Label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="status" id="status" value="3" className="form-check-input" checked={statusId === "3"} onChange={handleChange} />
                            <Label>Archived</Label>
                        </div>
                    </div>

                    <Label className="fw-normal mb-2">Category<span className="required">*</span></Label>
                    <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        options={categories}
                        placeholder='Select Category'
                        className='mb-2'
                        isMulti
                    />

                    <Label className="fw-normal mb-2">Tag</Label>
                    <Select
                        value={selectedTag}
                        onChange={handleTagChange}
                        options={tags}
                        placeholder='Select Tag'
                        className='mb-2'
                        isMulti
                    />
                </div>

                <div className="form-group card card-body">
                    <h1 className="fs-4">Page Attributes</h1>
                    <Label className="fw-normal mb-2">Gallery</Label>
                    <Input type="file" onChange={handleGalleryChange} multiple/>
                </div>
            </div>

            <div className="col-12 mt-4 d-flex justify-content-end gap-3">
                <button type="button" className="btn btn-outline-warning" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn btn-warning">Create Article</button>
            </div>
        </form>
    )
}
export default ArticleFormClone