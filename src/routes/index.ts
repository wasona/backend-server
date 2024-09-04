import { Router, Request, Response } from 'express';

// app.ts
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file
const dbPword = process.env.DB_PWORD;  // Retrieve the environment variable

const initOptions = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'backend_db',
    user: 'postgres',
    password: dbPword,

    // to auto-exit on idle, without having to shut down the pool;
    // see https://github.com/vitaly-t/pg-promise#library-de-initialization
    allowExitOnIdle: true
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(connection);

const router = Router();

// Define a simple route
router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Test db connection
router.get('/db', (req: Request, res: Response) => {
    db.any('SELECT VERSION();', [true])
    .then(function(data) {
        res.send(data);
    })
    .catch(function(error) {
        console.log('ERROR:', error)
    });
});

// You can define more routes here
router.get('/about', (req: Request, res: Response) => {
    res.send('About us');
});

router.post('/data', (req: Request, res: Response) => {
    res.send(`You sent: ${JSON.stringify(req.body)}`);
});

export default router;
