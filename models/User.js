import mongoose from 'mongoose';
import gravatar from 'gravatar';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			required: true,
			unique: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Please enter a valid email address');
				}
			},
		},
		password: {
			type: String,
			required: true,
			minlength: [7, 'Password must be at least 7 characters'],
			validate(value) {
				if (validator.contains(value.toLowerCase(), 'password')) {
					throw new Error(
						'Password cannot contain any variation of the word "password"'
					);
				}
			},
		},
		discoverable: {
			type: Boolean,
			required: true,
			default: false,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		avatar: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

UserSchema.methods.getAvatar = async function () {
	const user = this;
	const avatar = gravatar.url(user.email, {
		s: '200',
		r: 'pg',
		d: 'mm',
	});

	user.avatar = avatar;
	await user.save();
	return user;
};

UserSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('Unable to login');
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Unable to login');
	}
	return user;
};

// HASH THE PLAIN TEXT PASSWORD BEFORE SAVING
UserSchema.pre('save', async function (next) {
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = mongoose.model('User', UserSchema);
export default User;
