import React, { useState } from 'react';

const RegistrationForm = ({ registerUser }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirm_password: '',
	});
	const { name, email, password, confirm_password } = formData;
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirm_password) {
			registerUser(name, email, password);
		} else {
			alert('Passwords do not match');
		}
	};
	return (
		<form className='form' onSubmit={(e) => handleSubmit(e)}>
			<div className='form-group'>
				<input
					className='float-input'
					id='name'
					name='name'
					type='text'
					required
					value={name}
					onChange={(e) => onChange(e)}
				/>
				<label htmlFor='name' className='float-label'>
					Username
				</label>
			</div>
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
			<div className='form-group'>
				<input
					className='float-input'
					id='confirm_password'
					name='confirm_password'
					required
					type='password'
					minLength='7'
					value={confirm_password}
					onChange={(e) => onChange(e)}
				/>
				<label htmlFor='confirm_password' className='float-label'>
					Confirm Password
				</label>
			</div>

			<input type='submit' value='Register' className='btn btn-formsub' />
		</form>
	);
};

export default RegistrationForm;
