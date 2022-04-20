type Props = {
	className?: string;
	type?: string;
	placeholder?: string;
	maxLength?: number;
	value: string;
	handleChange: (text: string) => void;
};
const DEFAULT_PROPS = {
	type: 'text',
	placeholder: '',
	maxLength: 5000,
	value: '',
	handleChange: (text: string) => {},
};

const Input = (props: Props = DEFAULT_PROPS) => {
	return (
		<input
			value={props.value}
			onChange={(e) => {
				props.handleChange(e.target.value);
			}}
			placeholder={props.placeholder}
			type={props.type}
			className={`w-full outline-none border border-black rounded-md px-3 ${props.className}`}
			maxLength={props.maxLength}
		/>
	);
};

export default Input;
