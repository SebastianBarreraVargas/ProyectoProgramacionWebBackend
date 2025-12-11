import { Router } from 'express';
import * as QuestionType from '../controllers/questionType.controller';

const router = Router();

router.post('/', QuestionType.createQuestionTypeController);
router.get('/',  QuestionType.getAllQuestionTypesController);
router.get('/:id', QuestionType.getQuestionTypeByIdController);
router.put('/:id', QuestionType.updateQuestionTypeController);
router.delete('/:id', QuestionType.deleteQuestionTypeController);

export default router;
