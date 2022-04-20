type Props = {
	placeholder: string;
	className?: string;
	onClick: () => void;
};

function Button(props: Props) {
	return (
		<button
			onClick={props.onClick}
			className={`px-4 py-2 bg-primary text-white rounded-md select-none cursor-pointer ${props.className}`}
		>
			{props.placeholder}
		</button>
	);
}

export default Button;
