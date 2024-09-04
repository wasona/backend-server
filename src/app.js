"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes")); // Import the routes
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Use the routes
app.use('/', routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
