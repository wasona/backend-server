import { Router, Request, Response } from 'express';

const initOptions = {/* initialization options */};
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
