import React from 'react';
const DEFAULT_PROPS = {
    type: 'text',
    placeholder: '',
    maxLength: 5000,
    value: '',
    handleChange: () => { },
};
const Input = (props = DEFAULT_PROPS) => {
    return (<input value={props.value} onChange={(e) => {
            props.handleChange(e.target.value);
        }} placeholder={props.placeholder} type={props.type} className={`w-full outline-none border border-black rounded-md px-3 ${props.className}`} maxLength={props.maxLength}/>);
};
export default Input;
