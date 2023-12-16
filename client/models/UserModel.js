import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
