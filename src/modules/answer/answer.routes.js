import { Router } from "express";
import {
  createAnswer,
  getAnswers,
  getAnswer,
  updateAnswer,
  deleteAnswer
} from "./answer.controller.js"; 
const router = Router();

router.post("/", createAnswer);
router.get("/", getAnswers);
router.get("/:id", getAnswer);
router.put("/:id", updateAnswer);
router.delete("/:id", deleteAnswer);

export default router;
