import { Router } from 'express';
import AgeClassificationRoutes from '../routes/ageClassification.routes';
import QuestionAgeClassificationRoutes from '../routes/questionAgeClassification.routes';
import QuestionTypeRoutes from '../routes/questionType.routes';
import AreaRoutes from '../routes/area.routes';
import SubjectRoutes from '../routes/subject.routes';
import QuestionRoutes from '../routes/question.routes';
import HealthRoutes from '../routes/health.routes';
import TokenRoutes from '../routes/token.routes'

const router = Router();

router.use('/api/age_classification', AgeClassificationRoutes);
router.use('/api/question_age_classification', QuestionAgeClassificationRoutes);
router.use('/api/area', AreaRoutes);
router.use('/api/question_type', QuestionTypeRoutes);
router.use('/api/subject', SubjectRoutes);
router.use('/api/question', QuestionRoutes);
router.use('/api/health', HealthRoutes);
router.use('api/token', TokenRoutes);

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;