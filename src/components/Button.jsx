import React from 'react';
function Button(props) {
    return (<button onClick={props.onClick} className={`px-4 py-2 bg-primary text-white rounded-md select-none cursor-pointer ${props.className}`}>
			{props.placeholder}
		</button>);
}
export default Button;
