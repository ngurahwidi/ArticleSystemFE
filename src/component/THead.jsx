const THead = ({ titles = [] }) => (
    <thead className='table-light'>
    <tr>
        {titles.map((title, index) => (
            <th key={index}>{title}</th>
        ))}
    </tr>
    </thead>
);

export default THead;