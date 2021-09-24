import Router from 'next/router';
import { useState } from 'react';
import Head from 'next/head'; 
import Link from 'next/link';
import fetcher from '../lib/fetcher';
import { validateSignup } from '../lib/client-form-validation';
import {
	Main,
	Form,
	Input,
	Button,
	LinkButton,
	A,
	Err,
} from '../styles/styles';

const Signup = () => {
	const [values, setValues] = useState({
		givenName: '',
		familyName: '',
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formErrors = await validateSignup(values);
		if (formErrors) return setErrors(formErrors);
		const { res, data } = await fetcher('/api/auth/signup', values);
		if (res.ok) {
			setErrors({});
			Router.push('/');
		} else {
			setErrors(data);
		}
	};
	return (
		<Main>
			<Head></Head>
			<Form onSubmit={handleSubmit}>
				<Input
					type='givenName'
					placeholder='Given Name'
					name='givenName'
					value={values.givenName}
					onChange={handleChange}
				/>
				{errors.givenName && <Err>{errors.givenName}</Err>}
				<Input
					type='familyName'
					placeholder='Family Name'
					name='familyName'
					value={values.familyName}
					onChange={handleChange}
				/>
				{errors.familyName && <Err>{errors.familyName}</Err>}
				<Input
					type='email'
					name='email'
					placeholder='Email'
					value={values.email}
					onChange={handleChange}
				/>
				{errors.email && <Err>{errors.email}</Err>}
				<Input
					type='password'
					name='password'
					placeholder='Password'
					value={values.password}
					onChange={handleChange}
				/>
				{errors.password && <Err>{errors.password}</Err>}
				<Button type='submit'>Create Account</Button>
				<Link
					href='https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/api/auth/google&client_id=726118344896-2q2vruiuqvs5t1u1dr8f077o4rtq0urn.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email'
					passHref>
					<LinkButton>Signup with Google</LinkButton>
				</Link>
				<Link href='/login' passHref>
					<A>Already signed up? Login</A>
				</Link>
			</Form>
		</Main>
	);
};

export default Signup;
