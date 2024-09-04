"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Define a simple route
router.get('/', (req, res) => {
    res.send('Hello, World!');
});
// You can define more routes here
router.get('/about', (req, res) => {
    res.send('About us');
});
router.post('/data', (req, res) => {
    res.send(`You sent: ${JSON.stringify(req.body)}`);
});
exports.default = router;
