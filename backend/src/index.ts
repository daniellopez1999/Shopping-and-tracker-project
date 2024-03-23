import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './router';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', apiRouter);
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
