import express from "express";
import { extractClaim, generateSummary, checkConsistency } from "../controllers/aiController.js";

const router = express.Router();

router.post("/extract", extractClaim);

router.post("/summarize", generateSummary);

router.post("/consistency", checkConsistency);

export default router;