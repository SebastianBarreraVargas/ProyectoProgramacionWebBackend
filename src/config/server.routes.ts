import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes.js';
// @ts-ignore: missing declaration file for JS module
import UserRoutes from '../modules/user/user.routes';

const router = Router();

router.use('/api', HealthRoutes);
router.use('/api/users', UserRoutes);

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
