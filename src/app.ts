import express, { Request, Response } from "express";
import routes from "./routes"; // Import the routes
// import cors from "cors";

const app = express();
const port = 30737;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200,
// };
// // Use the CORS middleware
// app.use(cors(corsOptions));

// Use the routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
