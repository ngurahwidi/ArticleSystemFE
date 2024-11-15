const FormContoh = () => {
    return (
        <div className="form-container">
            <form className='row'>
                <div className='col-md-8 mb-3 card card-body'>
                    <h2 className='mb-4 fs-3'>New Blog</h2>
                    <div className='form-group'>
                        <label>Title <span className='required'>Required</span></label>
                        <input
                            type='text'
                            name='title'
                            placeholder='Enter Title'
                            className='form-control'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description <span className='required'>Required</span></label>
                        <textarea
                            name="shortDescription"
                            placeholder="Write down the short description here"
                            className="form-control"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Content <span className='required'>Required</span></label>
                        <textarea
                            name="content"
                            placeholder="Content here"
                            className="form-control"
                            rows="6"
                            required
                        ></textarea>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="form-group mb-4 card card-body">
                        <h5>Featured Image</h5>
                        <button type="button" className='btn btn-link featuredImageBtn'>Set Featured Image
                        </button>
                    </div>

                    <div className="form-group mb-4 card card-body">
                        <h5>Blog Properties</h5>
                        <label>Status</label>
                        <select
                            name="status"
                            className="form-control mb-3"
                        >
                            <option value="">Select Status</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>

                        <label>Category</label>
                        <select
                            name="category"
                            className="form-control mb-3"
                        >
                            <option value="">Select Option Here</option>
                            <option value="tech">Tech</option>
                            <option value="lifestyle">Lifestyle</option>
                        </select>

                        <label>Tags</label>
                        <input
                            type="text"
                            name="tags"
                            placeholder="ex: Jose Hernandez"
                            className="form-control mb-3"
                        />
                    </div>

                    <div className="form-group card card-body">
                        <h5>Page Attributes</h5>
                        <label>Gallery</label>
                        <select
                            name="gallery"
                            className="form-control mb-3"
                        >
                            <option value="">Select Gallery Type</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
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