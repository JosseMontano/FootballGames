import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to PDF Generator services!");
});



export default router;
