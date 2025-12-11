import { Router } from "express";
import * as TokenController from '../controllers/token.controller';

const router = Router();

router.post('/send', TokenController.sendToken);

router.get('/private', TokenController.privateToken);

export default router;