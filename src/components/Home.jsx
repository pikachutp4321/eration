import React from 'react';
import Navbar from './Navbar';
import BACKGROUND from '../assets/QT-ration-cards.jpg';
import Axios from '../controller/axios';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const fetchDetails = React.useCallback(async () => {
        try {
            const { data } = await Axios.get('/details');
            setDetails(data);
        }
        catch (err) {
            alert(err.response ? err.response.data : 'Unable to fetch details');
        }
    }, []);
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        else {
            fetchDetails();
        }
    }, [fetchDetails, navigate]);
    const [details, setDetails] = React.useState({
        name: '',
        phone: '',
        email: '',
        aadhaar: '',
        address: '',
        state: '',
        district: '',
        membersCount: '',
        lastMessage: '',
        allotedQuantity: '',
    });
    return (<>
			<Navbar />
			<div className='absolute -z-10'>
				<img src={BACKGROUND} alt='' className='full'/>
			</div>
			<div className='full flex justify-center items-center'>
				<div>
					<div className='bg-zinc-150 rounded-md padding-element flex flex-col w-[400px]'>
						<p className='text-black font-medium text-base px-2 mt-1 text-center'>{details.name}</p>
						<p className='text-black font-medium text-base px-2 mt-1 '>Phone No. {details.phone}</p>
						<p className='text-black font-medium text-base px-2 mt-1 '>Email : {details.email}</p>
						<p className='text-black font-medium text-base px-2 mt-1 '>
							Aadhaar : {details.aadhaar}
						</p>
						<p className='text-black font-medium text-base px-2 mt-1 '>
							Address : {details.address}
						</p>
						<p className='text-black font-medium text-base px-2 mt-1 '>
							District : {details.district}
						</p>
						<p className='text-black font-medium text-base px-2 mt-1 '>State : {details.state}</p>
						<p className='text-black font-medium text-base px-2 mt-1 '>
							Total members : {details.membersCount}
						</p>
					</div>
					<div className='bg-zinc-150 rounded-md padding-element flex flex-col w-[400px] mt-2'>
						<p className='text-black font-medium text-base px-2 mt-2'>
							Last collected: {details.lastMessage}
						</p>
						<p className='text-black font-medium text-base px-2 mt-2'>
							Alloted Quantity: {details.allotedQuantity}
						</p>
					</div>
				</div>
			</div>
		</>);
};
export default Home;
