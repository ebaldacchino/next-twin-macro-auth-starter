import nextConnect from 'next-connect';
import fetcher from '../../../lib/fetcher';
import {
	createUser,
	findAndUpdateUser,
	findUser,
	genPassword,
} from '../../../lib/user';
import { setLoginSession } from '../../../lib/auth';
import crypto from 'crypto';

const handler = nextConnect();

const { GOOGLE_CLIENT_ID: client_id, GOOGLE_CLIENT_SECRET: client_secret } =
	process.env;

const redirect_uri = 'http://localhost:3000/api/auth/google';

const getTokens = async (code) => {
	const url = 'https://oauth2.googleapis.com/token';
	const values = {
		code,
		client_id,
		client_secret,
		redirect_uri,
		grant_type: 'authorization_code',
	};

	try {
		const { data } = await fetcher(url, values);
		return data;
	} catch (err) {
		console.log('Error : In get Google tokens catch block');
	}
};

const getGoogleAccount = async (access_token, id_token) => {
	try {
		const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
		const headers = {
			Authorization: `Bearer ${id_token}`,
		};
		const { data } = await fetcher(url, null, headers);
		return data;
	} catch (err) {
		console.log('Error : In get Google account catch block');
	}
};

handler.get(async (req, res) => {
	try {
		const { access_token, id_token } = await getTokens(req.query.code);

		const data = await getGoogleAccount(access_token, id_token);

		const { email, given_name, family_name, id: googleId } = data;
 
		let user = await findUser({ googleId });

		if (!user) user = await findAndUpdateUser({ email }, { googleId });

		if (!user) {
			user = await createUser({
				email,
				givenName: given_name,
				familyName: family_name,
				googleId,
				password: await genPassword(crypto.randomBytes(16).toString('hex')),
			});
		}

		await setLoginSession(res, user._doc);
		res.redirect(301, '/');
	} catch (err) {
		console.log(err.message);
		console.log('Error : In Google auth handler catch block');
	}
});

export default handler;

// https://github.com/tomanagle/google-oauth-tutorial
