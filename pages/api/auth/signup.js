import nextConnect from 'next-connect';
import connectDB from '../../../middleware/mongodb';
import { validate_signup } from '../../../middleware/server-form-validation';
import { createUser } from '../../../lib/user';
import { setLoginSession } from '../../../lib/auth';

const handler = nextConnect();

handler.post(async (req, res) => {
	try {
		const errors = await validate_signup(req);
		console.log(errors);
		if (errors) return res.status(404).json(errors);
		const user = await createUser(req.body);
		await setLoginSession(res, user._doc);

		res.status(200).json({ msg: 'Logged in successfully' });
	} catch (err) {
		res.status(400).json({ email: 'This email is taken' });
	}
});

export default connectDB(handler);
