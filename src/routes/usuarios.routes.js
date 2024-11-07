import { Router } from "express";
import { crearUsuario, leerUsuario, login } from "../controllers/usuario.controllers.js";


const router = Router();

router.route('/usuario').post(crearUsuario).get(leerUsuario);
// router.route('/usuario').post(login)

export default router;