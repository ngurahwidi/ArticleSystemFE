const TextArea = ({name, placeholder, row, className="form-control", ...props}) => {
    return (
        <textarea
            name={name}
            placeholder={placeholder}
            className={className}
            rows={row}
            {...props}
        ></textarea>
    )
}
export default TextArea;