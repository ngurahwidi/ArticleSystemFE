import Label from "../../../component/Label.jsx";
import Select from "react-select";

const ArticleFilter = ({
                           search,
                           handleChange,
                           statusId,
                           selectedTags,
                           handleTagChange,
                           tags,
                           categories,
                           selectedCategory,
                           handleCategoryChange,
                           sortByDate,
                           sortByPopular,
                           fromDate,
                           toDate,
                           fetchArticles
}) => {
    return (
        <div className="mb-5">
            <div className="row mb-4">
                <div className="col">
                    <Label>Search</Label>
                    <input
                        className="form-control"
                        placeholder="Type to search..."
                        name="search"
                        value={search}
                        onChange={handleChange}
                    />
                </div>

                <div className="col">
                    <Label>Status</Label>
                    <select
                        className="form-control text-secondary"
                        value={statusId}
                        name='statusId'
                        onChange={handleChange}
                    >
                        <option value="">Select Status Option</option>
                        <option value="1">Draft</option>
                        <option value="2">Publish</option>
                        <option value="3">Archived</option>
                    </select>
                </div>

                <div className='col'>
                    <Label>Tag</Label>
                    <Select
                        value={selectedTags}
                        onChange={handleTagChange}
                        options={tags}
                        placeholder='Tag'
                        isMulti
                    />
                </div>

                <div className="col">
                    <Label>Category</Label>
                    <Select
                        options={categories}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        placeholder='Category'
                        isMulti
                    />
                </div>
            </div>
            <div className='row'>
                <div className="col">
                    <Label>Sort By Date</Label>
                    <select
                        className="form-control text-secondary"
                        name='sortByDate'
                        value={sortByDate}
                        onChange={handleChange}
                    >
                        <option value="">Select Sort Date Option</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <div className="col">
                    <Label>Sort By Popular</Label>
                    <select
                        className="form-control text-secondary"
                        name='sortByPopular'
                        value={sortByPopular}
                        onChange={handleChange}
                    >
                        <option value="">Select Popularity Option</option>
                        <option value="desc">Most Popular</option>
                        <option value="asc">Least Popular</option>
                    </select>
                </div>

                <div className="col">
                    <Label>From Date</Label>
                    <input
                        type="date"
                        name='fromDate'
                        className="form-control text-secondary"
                        value={fromDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="col">
                    <Label>To Date</Label>
                    <input
                        type="date"
                        name='toDate'
                        className="form-control text-secondary"
                        value={toDate}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button type='button' onClick={fetchArticles}
                    className='btn btn-sm btn-outline-warning px-4 py-1 mt-3'>Search
            </button>
        </div>
    )
}

export default ArticleFilter;