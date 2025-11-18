import { Router } from 'express';
import {
  createTestQuestionController,
  getAllTestQuestionsController,
  getTestQuestionByIdController,
  updateTestQuestionController,
  deleteTestQuestionController
} from './testQuestions.controller.js';

const router = Router();

router.post('/', createTestQuestionController);
router.get('/', getAllTestQuestionsController);
router.get('/:id', getTestQuestionByIdController);
router.put('/:id', updateTestQuestionController);
router.delete('/:id', deleteTestQuestionController);

export default router;
