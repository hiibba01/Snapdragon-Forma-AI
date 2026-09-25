import express from "express";

import {
    submitClaim,
    getMyClaims
} from "../controllers/claimController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get(
    "/my",
    protect,
    getMyClaims
);

router.post(
    "/",
    protect,
    upload.array("evidence", 10),
    submitClaim
);

export default router;