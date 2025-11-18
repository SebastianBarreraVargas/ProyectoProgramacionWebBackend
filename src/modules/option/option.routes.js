import { Router } from 'express';
import {
  createOptionController,
  getAllOptionsController,
  getOptionByIdController,
  updateOptionController,
  deleteOptionController
} from './option.controller.js';

const router = Router();

router.post('/', createOptionController);
router.get('/', getAllOptionsController);
router.get('/:id', getOptionByIdController);
router.put('/:id', updateOptionController);
router.delete('/:id', deleteOptionController);

export default router;
