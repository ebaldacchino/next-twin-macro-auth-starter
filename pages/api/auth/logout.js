import { removeTokenCookie } from '../../../lib/auth-cookies';

const Logout = async (req, res) => {
	removeTokenCookie(res);
	res.writeHead(302, { Location: '/' });
	res.end();
};

export default Logout;
