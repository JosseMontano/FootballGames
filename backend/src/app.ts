import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./app/auth/auth.controller"
import teamRouter from "./app/team/team.controller"
import divisionRouter from "./app/teamDivisiones/teamDivisiones.controller"
import champeonshipRouter from "./app/champeonship/champeonship.controller"
import playerRouter from "./app/player/player.controller"
// Express configuration
const app = express(); // New express instance
const port = 8000; // Port number

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
)); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan("dev")); // Enable Morgan
app.use(bodyParser.json());

//routes
app.use(authRouter);
app.use(teamRouter)
app.use(divisionRouter)
app.use(champeonshipRouter)
app.use(playerRouter)


// Start Express server
app.listen(port, () => {
  console.log(`Generate your pdf's http://localhost:${port} 🚀🚀🚀`);
});


export default app;
