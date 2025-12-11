import { Router } from "express";
import * as UserController from "../controllers/user.controller";

const router = Router();

router.post('/create', UserController.createUserController);

router.get('/get_by_id', UserController.getUserById);

export default router;