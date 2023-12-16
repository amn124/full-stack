import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './models/User.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const id=req.params.id
  const user =User.findById(id)
  try {
    const deletedUser = await user.deleteOne();
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});

mongoose.connect('mongodb+srv://bouchibaamna:EyRFIF35gAHI1mV0@cluster0.pe7vz3i.mongodb.net/my_fullstack_app_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
