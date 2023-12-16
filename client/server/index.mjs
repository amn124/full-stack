
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, '../client/build')));

// API routes
app.get('/api/users', (req, res) => {
  // Your API logic for getting users
});

// Handle other API routes as needed

// For any other routes, serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/my_fullstack_app_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

