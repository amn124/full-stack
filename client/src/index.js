import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use('/users', userRoutes);

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
