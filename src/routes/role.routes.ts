
import { Router } from "express";
import * as RoleController from "../controllers/role.controller";
import * as TokenController from "../controllers/token.controller";

const router = Router();

router.post('/create', RoleController.createRoleController);

router.get('/get_all', TokenController.verifyToken, RoleController.getAllRoles)

export default router;