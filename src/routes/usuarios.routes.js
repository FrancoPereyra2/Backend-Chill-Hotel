import { Router } from "express";
import { crearUsuario, login } from "../controllers/usuario.controllers.js";


const router = Router();

router.route('/usuario').post(crearUsuario);
router.route('/usuario').post(login)

export default router;