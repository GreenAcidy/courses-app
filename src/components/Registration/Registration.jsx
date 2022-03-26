import React, { useState } from 'react';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';

import usePost from '../../helpers/usePost';

import './Registration.css';

const Registration = () => {
	const navigate = useNavigate();
	const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

	const register = usePost('register');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const registerResponse = await register(newUser);

		if (registerResponse.successful) {
			navigate('/login');
		} else {
			alert(registerResponse.errors);
		}
	};

	const handleChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	return (
		<div className='registration'>
			<div className='form'>
				<h2>Registration</h2>
				<form onSubmit={handleSubmit}>
					<Input
						name='name'
						labelText='Enter name'
						onChange={handleChange}
						value={newUser.name}
					/>
					<Input
						name='email'
						labelText='Enter email'
						onChange={handleChange}
						value={newUser.email}
					/>
					<Input
						name='password'
						labelText='Enter password'
						onChange={handleChange}
						value={newUser.password}
						type='password'
					/>
					<Button buttonText='Registartion' type='submit' />
				</form>
				<div>
					If you have an account you can {<Link to='/login'>Login</Link>}
				</div>
			</div>
		</div>
	);
};

export default Registration;
