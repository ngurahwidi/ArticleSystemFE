export const BtnPrimary = ({children, className = 'btn btn-primary btn-sm rounded'}) => {
    return <button className={className}>{children}</button>
}

export const BtnInfo = ({children, className = 'btn btn-info btn-sm rounded'}) => {
    return <button className={className}>{children}</button>
}

export const BtnDanger = ({children, className = 'btn btn-danger btn-sm rounded'}) => {
    return <button className={className}>{children}</button>
}

export const BtnWarning = ({children, className}) => {
    return <button className={className}>{children}</button>
}

export const BtnWarningOutline = ({children, className="btn btn-outline-warning w-100 rounded-3 px-4 py-2 text-black"}) => {
    return <button className={className}>{children}</button>
}