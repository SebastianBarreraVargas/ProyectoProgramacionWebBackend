import { Router } from "express";
import * as Subject from '../controllers/subject.controller';

const router = Router();

router.post("/", Subject.create);
router.get("/", Subject.getAll);
router.get("/:id", Subject.getById);
router.put("/:id", Subject.update);
router.delete("/:id", Subject.remove);

export default router;