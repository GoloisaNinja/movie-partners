import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const db = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected...');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

export default connectDB;
