const THead = ({ titles = [] }) => (
    <thead>
    <tr>
        {titles.map((title, index) => (
            <th key={index}>{title}</th>
        ))}
    </tr>
    </thead>
);

export default THead;