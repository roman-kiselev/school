import express from "express";
import { lessonRouter } from "./lessons/index.js";
const router = express.Router();

router.use("/lessons", lessonRouter);

export default router;
