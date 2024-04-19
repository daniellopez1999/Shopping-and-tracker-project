import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './router';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'PATCH'],
    origin: ['http://localhost:5173', 'http://localhost:4000'],
  })
);
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use('/api', apiRouter);
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
