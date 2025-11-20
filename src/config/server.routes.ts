import { Router } from 'express';
import AgeClassificationRoutes from '../routes/ageClassification.routes';
import QuestionAgeClassificationRoutes from '../routes/questionAgeClassification.routes';
import QuestionTypeRoutes from '../routes/questionType.routes';

const router = Router();

router.use('/age_classification', AgeClassificationRoutes);
router.use('/question_age_classification', QuestionAgeClassificationRoutes);
router.use('question_type', QuestionTypeRoutes);

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;