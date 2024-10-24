// TODO : kurang onchange dan value di dalam props
const Input = ({type, id, placeholder, onChange, value, className="form-control fw-lighter"}) => {
    return <input type={type} className={className} id={id} placeholder={placeholder} onChange={onChange} value={value}/>
}

export default Input;