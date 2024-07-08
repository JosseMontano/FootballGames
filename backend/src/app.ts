import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "../src/auth/auth.controller"

// Express configuration
const app = express(); // New express instance
const port = 8000; // Port number

app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan("dev")); // Enable Morgan
app.use(bodyParser.json());

// Start Express server
app.listen(port, () => {
  console.log(`Generate your pdf's http://localhost:${port} 🚀🚀🚀`);
});

app.use(authRouter);

export default app;
