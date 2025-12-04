import { Router } from "express";
import * as TokenController from '../controllers/token.controller';

const router = Router();

router.post('/token', TokenController.sendToken);

router.get('/public', TokenController.publicToken);

router.get('/private', TokenController.privateToken);

export default router;