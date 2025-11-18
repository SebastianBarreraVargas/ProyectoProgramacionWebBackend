import { Router } from 'express';
import {
  createQuestionController,
  getAllQuestionsController,
  getQuestionByIdController,
  updateQuestionController,
  deleteQuestionController
} from './question.controller.js';

const router = Router();

router.post('/', createQuestionController);
router.get('/', getAllQuestionsController);
router.get('/:id', getQuestionByIdController);
router.put('/:id', updateQuestionController);
router.delete('/:id', deleteQuestionController);

export default router;
