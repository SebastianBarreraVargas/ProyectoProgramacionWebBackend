import { Router } from 'express';
import {
  createInteractiveOwnAnswerController,
  getAllInteractiveOwnAnswerController,
  getInteractiveOwnAnswerByIdController,
  updateInteractiveOwnAnswerController,
  deleteInteractiveOwnAnswerController
} from './interactiveOwnAnswer.controller.js';

const router = Router();

router.post('/', createInteractiveOwnAnswerController);
router.get('/', getAllInteractiveOwnAnswerController);
router.get('/:id', getInteractiveOwnAnswerByIdController);
router.put('/:id', updateInteractiveOwnAnswerController);
router.delete('/:id', deleteInteractiveOwnAnswerController);

export default router;
