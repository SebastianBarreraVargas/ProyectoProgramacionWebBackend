import { Router } from 'express';
import {
  createAnswerController,
  getAllAnswersController,
  getAnswerByIdController,
  updateAnswerController,
  deleteAnswerController
} from './answer.controller.js';

const router = Router();

router.post('/', createAnswerController);
router.get('/', getAllAnswersController);
router.get('/:id', getAnswerByIdController);
router.put('/:id', updateAnswerController);
router.delete('/:id', deleteAnswerController);

export default router;
