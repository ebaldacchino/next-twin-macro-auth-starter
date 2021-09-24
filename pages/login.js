import Router from 'next/router';
import { useState } from 'react';
import Head from 'next/head'; 
import Link from 'next/link';
import fetcher from '../lib/fetcher';
import { validateLogin } from '../lib/client-form-validation';
import {
	Main,
	Form,
	Input,
	Button,
	LinkButton,
	A,
	Err,
} from '../styles/styles';

const Login = () => {
	const [values, setValues] = useState({
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
		const formErrors = await validateLogin(values);
		if (formErrors) return setErrors({ ...formErrors });
		const { res, data } = await fetcher('/api/auth/login', values);
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
				<Button type='submit'>Login</Button>
				<Link
					href='https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/api/auth/google&client_id=726118344896-2q2vruiuqvs5t1u1dr8f077o4rtq0urn.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email'
					passHref>
					<LinkButton>Login with Google</LinkButton>
				</Link>
				<Link href='/signup' passHref>
					<A>Not registered? Signup</A>
				</Link>
			</Form>
		</Main>
	);
};

export default Login;
