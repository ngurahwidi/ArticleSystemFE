const Label = ({children, className="form-label fw-light", ...props}) => {
    return <label className={className} {...props}>{children}</label>
}

export default Label;