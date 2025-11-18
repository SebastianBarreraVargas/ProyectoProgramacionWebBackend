import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes.js';
// @ts-ignore: missing declaration file for JS module
import UserRoutes from '../modules/user/user.routes';
// @ts-ignore: missing declaration file for JS module
import RoleRoutes from '../modules/role/role.routes.js';
// @ts-ignore: missing declaration file for JS module
import TestRoutes from '../modules/test/test.routes.js';

const router = Router();

router.use('/api', HealthRoutes);
router.use('/api/user', UserRoutes);
router.use('/api/role', RoleRoutes);
router.use('/api/test', TestRoutes);

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
