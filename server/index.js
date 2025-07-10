import express from 'express';
import { connectDB } from './config/dbConfig.js';
import cors from 'cors';
import { appRouter } from './routes/appRouter.js';
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', appRouter);

app.get('/ping', (req, res) => {
    res.send('Pong');
});

app.listen(process.env.PORT || 5000, async() => {
    try {
        await connectDB();
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});