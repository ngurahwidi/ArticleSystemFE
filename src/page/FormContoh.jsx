import Label from "../component/Label.jsx";
import Input from "../component/Input.jsx";
import TextArea from "../component/TextArea.jsx";

const FormContoh = () => {
    return (
        <div className="form-container">
            <form className='row'>
                <div className='col-md-8 mb-3 card card-body'>
                    <h1 className='mb-4 fs-4'>New Blog</h1>
                    <div className='form-group'>
                        <Label className="fw-bold mb-2">Title<span className="required">*</span></Label>
                        <Input
                            type='text'
                            name='title'
                            placeholder='Write down the title here'
                            className='form-control'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <Label className="fw-bold mb-2">Description<span className="required">*</span></Label>
                        <TextArea name="description" row="3" placeholder="Write down the description here" required></TextArea>
                    </div>

                    <div className="form-group">
                        <Label className="fw-bold mb-2">Content<span className="required">*</span></Label>
                        <TextArea name="content" row="6" placeholder="Content here" required></TextArea>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group mb-4 card card-body">
                        <h1 className="fs-4">Featured Image<span className="required">*</span></h1>
                        <button type="button" className='btn btn-link featuredImageBtn'>Set Featured Image
                        </button>
                    </div>

                    <div className="form-group mb-4 card card-body">
                        <h1 className="fs-4">Blog Properties</h1>
                        <div className='mb-2'>
                            <Label className="fw-normal mb-2">Status<span className="required">*</span></Label>
                            <div className="form-check">
                                <input type="radio" name="status" id="status" value="1" className="form-check-input"/>
                                <Label>Draft</Label>
                            </div>
                            <div className="form-check">
                                <input type="radio" name="status" id="status" value="2" className="form-check-input"/>
                                <Label>Publish</Label>
                            </div>
                            <div className="form-check">
                                <input type="radio" name="status" id="status" value="3" className="form-check-input"/>
                                <Label>Archived</Label>
                            </div>
                        </div>

                        <Label className="fw-normal mb-2">Category<span className="required">*</span></Label>
                        <select name="category" className="form-control mb-3" required>
                            <option value="">Select Option Here</option>
                            <option value="tech">Tech</option>
                            <option value="lifestyle">Lifestyle</option>
                        </select>

                        <Label className="fw-normal mb-2">Tag</Label>
                        <select name="tag" className='form-control' required>
                            <option value="">Select Option Here</option>
                            <option value="tech">Tech</option>
                            <option value="lifestyle">Lifestyle</option>
                        </select>
                    </div>

                    <div className="form-group card card-body">
                        <h1 className="fs-4">Page Attributes</h1>
                        <Label className="fw-normal mb-2">Gallery</Label>
                        <input type="file" className="form-control" multiple/>
                    </div>
                </div>

                <div className="col-12 mt-4 d-flex justify-content-end gap-3">
                    <button type="button" className="btn btn-outline-warning">Cancel</button>
                    <button type="submit" className="btn btn-warning">Create Blog</button>
                </div>
            </form>
        </div>
    )
}

export default FormContoh