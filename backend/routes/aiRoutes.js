import express from "express";
import { extractClaim } from "../controllers/aiController.js";

const router = express.Router();

router.post("/extract", extractClaim);

export default router;