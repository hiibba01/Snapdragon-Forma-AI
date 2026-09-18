import express from "express";
import { submitClaim,getMyClaims } from "../controllers/claimController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my", protect, getMyClaims);

router.post("/",protect,  submitClaim);

export default router;