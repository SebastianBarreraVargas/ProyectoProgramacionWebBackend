import { Router } from 'express';
import {
  createQuestionTypeController,
  getAllQuestionTypesController,
  getQuestionTypeByIdController,
  updateQuestionTypeController,
  deleteQuestionTypeController
} from './questionType.controller.js';

const router = Router();

router.post('/', createQuestionTypeController);
router.get('/', getAllQuestionTypesController);
router.get('/:id', getQuestionTypeByIdController);
router.put('/:id', updateQuestionTypeController);
router.delete('/:id', deleteQuestionTypeController);

export default router;
