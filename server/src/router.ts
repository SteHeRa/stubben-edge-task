import express from "express";
import capitalsController from "./controllers/capitalsController";

const router = express.Router();

router.get("/capitals", capitalsController.getCapitals);

export default router;
