import React from 'react';
import Navbar from './Navbar';
import BACKGROUND from '../assets/QT-ration-cards.jpg';
import Input from './Input';
import Button from './Button';
import Axios from '../controller/axios';
import { useNavigate } from 'react-router-dom';

enum Stage {
	OTP_SENT,
	INITIAL_STAGE,
	PROCESSING_STAGE,
}
interface Stock {
	name: string;
	qty: number;
}

function Login() {
	const navigate = useNavigate();
	const [stage, setStage] = React.useState(Stage.INITIAL_STAGE);
	const [stock, setStock] = React.useState<Stock[]>([]);
	const [details, setDetails] = React.useState({
		phone: '',
		code: '',
	});

	const fetchStock = React.useCallback(async () => {
		try {
			const { data } = await Axios.get('/stock');
			setStock(data);
		} catch (err: any) {}
	}, []);

	React.useEffect(() => {
		localStorage.removeItem('token');
		fetchStock();
	}, [fetchStock]);

	const handleSubmit = async () => {
		if (stage === Stage.INITIAL_STAGE) {
			if (!details.phone || details.phone.length !== 10) {
				alert('Invalid Phone Number.');
				return;
			}
			try {
				await Axios.post('/auth/login-user', details);
				setStage(Stage.OTP_SENT);
			} catch (err: any) {
				alert(err.response ? err.response.data : 'Unable to log in...Please try again.');
			}
		} else {
			if (!details.phone || details.phone.length !== 10) {
				alert('Invalid Phone Number.');
				return;
			} else if (!details.code || details.code.length !== 4) {
				alert('Invalid OTP.');
				return;
			}
			try {
				const { data } = await Axios.post('/auth/verify-login', details);
				localStorage.setItem('token', data);
				navigate(`/`);
			} catch (err: any) {
				alert(err.response ? err.response.data : 'Unable to log in...Please try again.');
			}
		}
	};
	const handleChange = (key: string, value: string | number) => {
		setDetails((prev) => {
			return { ...prev, [key]: value };
		});
	};

	return (
		<div>
			<Navbar />
			<div className='absolute -z-10'>
				<img src={BACKGROUND} alt='' className='full' />
			</div>
			<div className='full flex flex-col justify-center items-center'>
				<div className='bg-zinc-150  w-[350px]  rounded-md padding-element flex flex-col'>
					<p className='text-black font-semibold text-lg text-center'>Available Stock</p>
					<div>
						{stock.map((item, index) => (
							<div key={index}>
								<p className='text-black/80 font-medium text-center'>
									{item.name} : {item.qty}
								</p>
							</div>
						))}
					</div>
				</div>
				<div className='bg-zinc-150 w-[350px] rounded-md padding-element flex flex-col  mt-2'>
					<p className='text-black font-semibold text-lg text-center'>Login</p>
					<Input
						value={details.phone}
						handleChange={(text: string) => handleChange('phone', text)}
						placeholder='Phone Number'
						maxLength={10}
						type={'number'}
						className={'mt-4'}
					/>

					{stage === Stage.OTP_SENT && (
						<Input
							value={details.code}
							handleChange={(text: string) => handleChange('code', text)}
							placeholder='OTP'
							maxLength={4}
							type={'password'}
							className={'mt-2'}
						/>
					)}
					<Button
						placeholder={stage === Stage.PROCESSING_STAGE ? 'Please wait...' : 'Continue'}
						className={`mt-4 ${stage === Stage.PROCESSING_STAGE && 'opacity-60 cursor-wait'}`}
						onClick={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
