import * as yup from 'yup';

const email = yup
	.string()
	.email('Must be a valid email address')
	.required('Enter an email address')
	.label('Email');

const password = yup
	.string()
	.min(6, 'Password must be 6+ characters')
	.required('Enter a password')
	.label('Password');

const signUpSchema = yup.object().shape({
	givenName: yup.string().required('Enter first name').label('First name'),
	familyName: yup.string().required('Enter last name').label('Last name'),
	email,
	password,
});

const loginSchema = yup.object().shape({
	email,
	password,
});

const handleErrors = (err) =>
	err.inner.reduce((object, error) => {
		return { ...object, [error.path]: error.message };
	}, {});

const handleValidation = async (schema, body) => {
	try {
		await schema.validate(body, { abortEarly: false });
	} catch (err) {
		return handleErrors(err);
	}
	return null;
};

const validateSignup = (body) => handleValidation(signUpSchema, body);
const validateLogin = (body) => handleValidation(loginSchema, body);

export { validateSignup, validateLogin };
