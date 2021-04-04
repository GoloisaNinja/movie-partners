import React, { useState } from 'react';

const LoginForm = ({ loginUser }) => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const { email, password } = formData;
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser(email, password);
	};
	return (
		<form className='form' onSubmit={(e) => handleSubmit(e)}>
			<div className='form-group'>
				<input
					className='float-input'
					id='email'
					name='email'
					type='email'
					required
					autoComplete='email'
					value={email}
					onChange={(e) => onChange(e)}
				/>
				<label htmlFor='email' className='float-label'>
					Email
				</label>
			</div>
			<div className='form-group'>
				<input
					className='float-input'
					id='password'
					name='password'
					required
					type='password'
					minLength='7'
					value={password}
					onChange={(e) => onChange(e)}
				/>
				<label htmlFor='password' className='float-label'>
					Password
				</label>
			</div>

			<input type='submit' value='Login' className='btn btn-formsub' />
		</form>
	);
};

export default LoginForm;
