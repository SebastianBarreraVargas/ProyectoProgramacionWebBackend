import { Router } from "express";
import * as AgeClassification from '../controllers/ageClassification.controller';
import * as TokenController from "../controllers/token.controller";

const router = Router();

router.post("/", AgeClassification.create);
router.get("/", TokenController.verifyToken, AgeClassification.getAll);
router.get("/:id", AgeClassification.getById);
router.put("/:id", AgeClassification.update);
router.delete("/:id", AgeClassification.remove);

export default router;