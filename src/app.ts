import express, { Request, Response } from 'express';
import routes from './routes'; // Import the routes
import cors from 'cors';

const app = express();
const port = 30737;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}))

// Use the routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
