import logo from '../assets/image/avatar.svg'
import {BtnPrimary} from "../component/Button.jsx";

const Article = () => {
    return (
        <>
            <div>
                <h1>Hello Widi</h1>
                <p>This is article page</p>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Feature Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>1</td>
                        <td><img src={logo}/></td>
                        <td>Blog Pemrograman Javascript</td>
                        <td>Blog yang membahas tentang dasar-dasar pemrograman dengan menggunakan bahasa javascript</td>
                        <td>
                            <BtnPrimary>Tambah</BtnPrimary>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Article