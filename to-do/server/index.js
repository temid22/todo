import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import tasksRoute from './routes/tasks.js';
import authRoute from './routes/auths.js';

import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = 8001;

const app = express();

// connect to mongodb database
mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Server Running and Db connected! `))
  )
  .catch((err) => console.log(err));

//  use cors origin and allow requests from anywhere or a specific port
app.use(
  cors({
    origin: '*',
  })
);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

//        User

// Email: user@gmail.com,
// Password : 123

// api route

app.use('/api/auth', authRoute);
app.use('/api/tasks', tasksRoute);

// api homepage
app.get('/api', (req, res) => res.send('Homepage'));
