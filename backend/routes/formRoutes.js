import express from "express";

import { getForm } from "../controllers/formController.js";

const router = express.Router();

router.get("/:formId", getForm);

export default router;