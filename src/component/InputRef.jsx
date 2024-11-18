import {forwardRef} from "react";

const InputRef = forwardRef((props, ref) => {
    return <input {...props} ref={ref} />
})

export default InputRef;