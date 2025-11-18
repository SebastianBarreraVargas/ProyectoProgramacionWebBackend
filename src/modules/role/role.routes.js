import { Router } from "express";
import { createRoleController } from "./role.controller.js";

const router = Router();

router.post('/create', createRoleController);

export default router;
