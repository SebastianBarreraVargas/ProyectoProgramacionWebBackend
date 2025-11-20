import { Router } from "express";
import * as QuestionAgeClassificationController from "../controllers/questionAgeClassification.controller";

const router = Router();

router.post("/", QuestionAgeClassificationController.createAACController);
router.get("/", QuestionAgeClassificationController.getAllAACController);
router.get("/:id", QuestionAgeClassificationController.getAACByIdController);
router.put("/:id", QuestionAgeClassificationController.updateAACController);
router.delete("/:id", QuestionAgeClassificationController.deleteAACController);

export default router;
