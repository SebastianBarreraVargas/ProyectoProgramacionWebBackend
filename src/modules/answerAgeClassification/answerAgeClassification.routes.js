import { Router } from "express";
import {
    createAACController,
    getAllAACController,
    getAACByIdController,
    updateAACController,
    deleteAACController
} from "./answerAgeClassification.controller.js";

const router = Router();

router.post("/", createAACController);
router.get("/", getAllAACController);
router.get("/:id", getAACByIdController);
router.put("/:id", updateAACController);
router.delete("/:id", deleteAACController);

export default router;
