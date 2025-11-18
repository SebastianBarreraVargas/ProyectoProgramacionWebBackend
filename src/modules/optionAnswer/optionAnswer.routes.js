import { Router } from 'express';
import {
  createOptionAnswerController,
  getAllOptionAnswersController,
  getOptionAnswerByIdController,
  updateOptionAnswerController,
  deleteOptionAnswerController
} from './optionAnswer.controller.js';

const router = Router();

router.post('/', createOptionAnswerController);
router.get('/', getAllOptionAnswersController);
router.get('/:id', getOptionAnswerByIdController);
router.put('/:id', updateOptionAnswerController);
router.delete('/:id', deleteOptionAnswerController);

export default router;
