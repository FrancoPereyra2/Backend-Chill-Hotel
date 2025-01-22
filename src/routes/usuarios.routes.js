import { Router } from "express";
import { borrarUsuario, crearUsuario, editarUsuario, leerUsuario, login, obtenerUsuario } from "../controllers/usuario.controllers.js";


const router = Router();

router.route('/usuario').post(crearUsuario).get(leerUsuario);
router.route("/usuario/:id").put(editarUsuario).get(obtenerUsuario).delete(borrarUsuario);
router.route('/ingreso').post(login)

export default router;