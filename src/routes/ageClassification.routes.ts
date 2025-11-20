import { Router } from "express";
import * as AgeClassification from '../controllers/ageClassification.controller';

const router = Router();

router.post("/", AgeClassification.create);
router.get("/", AgeClassification.getAll);
router.get("/:id", AgeClassification.getById);
router.put("/:id", AgeClassification.update);
router.delete("/:id", AgeClassification.remove);

export default router;