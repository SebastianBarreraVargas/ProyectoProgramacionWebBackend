
import { Router } from "express";
import * as RoleController from "../controllers/role.controller";

const router = Router();

router.post('/create', RoleController.createRoleController);

export default router;