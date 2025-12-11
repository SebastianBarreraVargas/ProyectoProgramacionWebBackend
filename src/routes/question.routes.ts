import { Router } from "express";
import * as Question from '../controllers/question.controller';

const router = Router();

router.post("/", Question.create);
router.get("/", Question.getAll);
router.get("/:id", Question.getById);
router.get("/type/:id_question_type", Question.getByType);
router.get("/status/:status", Question.getByStatus);
router.get("/difficulty/:difficulty", Question.getByDifficulty);
router.put("/:id", Question.update);
router.delete("/:id", Question.remove);

export default router;