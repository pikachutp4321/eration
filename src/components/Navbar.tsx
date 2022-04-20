import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
	const isLoggedIn = localStorage.getItem('token') !== null;
	return (
		<>
			<nav className='w-full padding-app flex justify-between fixed top-0 bg-white'>
				<Link to='/' className='text-black font-semibold select-none'>
					e-Ration
				</Link>
				<Link
					to='/login'
					className='text-black font-medium select-none cursor-pointer hover:underline'
				>
					{isLoggedIn ? 'Logout' : 'Login'}
				</Link>
			</nav>
		</>
	);
};

export default Navbar;
