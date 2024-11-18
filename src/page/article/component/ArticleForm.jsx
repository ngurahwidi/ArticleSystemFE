import Label from "../../../component/Label.jsx";
import Input from "../../../component/Input.jsx";
import TextArea from "../../../component/TextArea.jsx";
import Select from "react-select";
import { Editor } from "@tinymce/tinymce-react";
import InputRef from "../../../component/InputRef.jsx";
import { Gallery } from "iconsax-react";

const ArticleForm = ({
                            title,
                            handleChange,
                            handleContentChange,
                            description,
                            content,
                            featuredImage,
                            handleImageChange,
                            statusId,
                            selectedCategory,
                            handleCategoryChange,
                            categories,
                            selectedTag,
                            handleTagChange,
                            tags,
                            handleGalleryChange,
                            fileInputRef,
                            handleButtonClick,
                            onSubmit,
                            onCancel,
                          }) => {
    return (
        <form className='row' onSubmit={onSubmit}>
            <div className='col-md-8 mb-3 card card-body'>
                <h1 className='mb-4 fs-4'>Article</h1>
                <div className='form-group'>
                    <Label className="fw-bold mb-2">Title<span className="required">*</span></Label>
                    <Input
                        type='text'
                        name='title'
                        className="form-control fw-normal"
                        placeholder='Article Title'
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
                    <Editor
                        apiKey={import.meta.env.VITE_TINY_API_KEY}
                        value={content}
                        onEditorChange={handleContentChange}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                            "undo redo | styles | fontsize | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor"
                        }}
                    />
                </div>
            </div>

            <div className="col-md-4">
                <div className="form-group mb-4 card card-body">
                    <h1 className="fs-4">Featured Image<span className="required">*</span></h1>
                    <button type="button" className="btn btn-link text-decoration-none text-start p-0 gap-2" onClick={handleButtonClick}><span className="pe-1"><Gallery size="20" color="#0d6efd"/></span>Set Featured Image
                    </button>
                    <InputRef type="file" onChange={handleImageChange} style={{display: 'none'}} ref={fileInputRef}/>
                    {featuredImage && (
                        <div className="mt-3">
                            <img src={featuredImage} alt="Featured"
                                 style={{width: '100%', maxHeight: '300px', objectFit: 'cover'}}/>
                        </div>
                    )}
                </div>

                <div className="form-group mb-4 card card-body">
                    <h1 className="fs-4">Article Properties</h1>
                    <div className='mb-2'>
                        <Label className="fw-normal mb-2">Status<span className="required">*</span></Label>
                        <div className="form-check">
                            <input type="radio" name="statusId" value="1" className="form-check-input" checked={statusId === "1"} onChange={handleChange} />
                            <Label>Draft</Label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="statusId" value="2" className="form-check-input" checked={statusId === "2"} onChange={handleChange} />
                            <Label>Publish</Label>
                        </div>
                        <div className="form-check">
                            <input type="radio" name="statusId" value="3" className="form-check-input" checked={statusId === "3"} onChange={handleChange} />
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
                        required
                        isMulti
                    />

                    <Label className="fw-normal mb-2">Tag<span className="required">*</span></Label>
                    <Select
                        value={selectedTag}
                        onChange={handleTagChange}
                        options={tags}
                        placeholder='Select Tag'
                        className='mb-2'
                        required
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
                <button type="submit" className="btn btn-warning">Save Article</button>
            </div>
        </form>
    )
}
export default ArticleForm