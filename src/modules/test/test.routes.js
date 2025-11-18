import { Router } from 'express';
import {
  createTestController,
  getAllTestsController,
  getTestByIdController,
  updateTestController,
  deleteTestController
} from './test.controller.js';

const router = Router();

router.post('/', createTestController);
router.get('/', getAllTestsController);
router.get('/:id', getTestByIdController);
router.put('/:id', updateTestController);
router.delete('/:id', deleteTestController);

export default router;
