import { Router, Request, Response } from 'express';

const router = Router();

// Define a simple route
router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// You can define more routes here
router.get('/about', (req: Request, res: Response) => {
    res.send('About us');
});

router.post('/data', (req: Request, res: Response) => {
    res.send(`You sent: ${JSON.stringify(req.body)}`);
});

export default router;
