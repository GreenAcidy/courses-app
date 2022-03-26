import React from 'react';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './Header.css';

import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

const Header = ({ userName, onLogout, isLoggedIn }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		onLogout();
		navigate('/login');
	};

	return (
		<div className='main-header'>
			<div className='logo'>
				<Logo />
			</div>
			{isLoggedIn && (
				<>
					<div className='logout-button'>
						<Button buttonText='Logout' onClick={handleLogout} />
					</div>
					<div className='username'>{userName}</div>
				</>
			)}
		</div>
	);
};

Header.propTypes = {
	userName: PropTypes.string,
	onLogout: PropTypes.func,
	isLoggedIn: PropTypes.bool,
};

export default Header;
