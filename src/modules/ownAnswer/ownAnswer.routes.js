import { Router } from 'express';
import {
  createOwnAnswerController,
  getAllOwnAnswersController,
  getOwnAnswerByIdController,
  updateOwnAnswerController,
  deleteOwnAnswerController
} from './ownAnswer.controller.js';

const router = Router();

router.post('/', createOwnAnswerController);
router.get('/', getAllOwnAnswersController);
router.get('/:id', getOwnAnswerByIdController);
router.put('/:id', updateOwnAnswerController);
router.delete('/:id', deleteOwnAnswerController);

export default router;
