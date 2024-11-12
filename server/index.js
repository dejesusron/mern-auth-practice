import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoute.js';
import connectDB from './src/configs/db.js';
import errorHandler from './src/middlewares/errorMiddleware.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/users', userRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
