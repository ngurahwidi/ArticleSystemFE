import logo from '../../assets/image/avatar.svg'
import {BtnDanger, BtnInfo, BtnWarning} from "../../component/Button.jsx";

const THead = ({titles = []}) => {
    return (
        <thead>
        <tr>
            {titles.map((title, index) => (
                <th key={index}>{title}</th>
            ))}
        </tr>
        </thead>
    )
}

const Article = () => {
    return (
        <>
            <div>
                <h1>Hello Widi</h1>
                <p>This is article page</p>
                <div className="w-25 mb-3">
                    <label htmlFor="search" className="form-label">Search</label>
                    <input className="form-control"
                           placeholder="Type to search..."/>
                </div>
                <table className="table table-bordered">
                    {/*<thead>*/}
                    {/*<tr>*/}
                    {/*    <th>No</th>*/}
                    {/*    <th>Feature Image</th>*/}
                    {/*    <th>Title</th>*/}
                    {/*    <th>Description</th>*/}
                    {/*    <th>Action</th>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    <THead titles={["No", "Feature Image", "Title", "Description", "Action"]} />

                    <tbody>
                    <tr>
                        <td>1</td>
                        <td><img src={logo}/></td>
                        <td>Blog Pemrograman Javascript</td>
                        <td>Blog yang membahas tentang dasar-dasar pemrograman dengan menggunakan bahasa javascript</td>
                        <td className="d-flex gap-1">
                            <BtnInfo>Detail</BtnInfo>
                            <BtnWarning className="btn btn-warning btn-sm rounded">Edit</BtnWarning>
                            <BtnDanger>Delete</BtnDanger>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Article