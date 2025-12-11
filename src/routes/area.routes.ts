import { Router } from "express";
import * as Area from '../controllers/area.controller';
import * as TokenController from "../controllers/token.controller";

const router = Router();

router.post("/", TokenController.verifyTokenAdmin, Area.create);
router.get("/", Area.getAll);
router.get("/:id", Area.getById);
router.get("/materia/:id_materia", Area.getByMateria);
router.put("/:id", Area.update);
router.delete("/:id", Area.remove);

export default router;