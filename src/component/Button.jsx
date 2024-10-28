export const BtnPrimary = ({children, className = 'btn btn-primary btn-sm rounded'}) => {
    return <button className={className}>{children}</button>
}

export const BtnWarning = ({children, className="btn btn-warning btn-sm w-100 rounded px-4 py-2"}) => {
    return <button className={className}>{children}</button>
}

export const BtnWarningOutline = ({children, className="btn btn-outline-warning w-100 rounded px-4 py-2 text-black"}) => {
    return <button className={className}>{children}</button>
}