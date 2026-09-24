import express from "express";
import { extractClaim, generateSummary } from "../controllers/aiController.js";

const router = express.Router();

router.post("/extract", extractClaim);

router.post("/summarize", generateSummary);

export default router;