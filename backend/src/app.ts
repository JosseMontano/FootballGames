import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./app/auth/auth.controller"
import teamRouter from "./app/team/team.controller"
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
app.use(teamRouter)

export default app;
