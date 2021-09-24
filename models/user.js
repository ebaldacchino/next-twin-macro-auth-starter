import mongoose, { Schema } from 'mongoose';

const prop = (type, required, unique) => ({
	type,
	required,
	unique,
});

const userSchema = new Schema({
	email: prop(String, true, true),
	googleId: String,
	facebookId: String,
	password: prop(String, true),
	givenName: prop(String, true),
	familyName: prop(String, true),
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
