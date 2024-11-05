import { Router } from "express";
import { agregarHabitacion, listaHabitaciones,borrarHabitacion,editarHabitacion,obtenerHabitacion} from "../controllers/habitacion.controllers.js";


const routerHabitacion = Router()
routerHabitacion.route('/habitaciones').post(agregarHabitacion).get(listaHabitaciones)
routerHabitacion.route("/habitaciones/:id").put(editarHabitacion).delete(borrarHabitacion).get(obtenerHabitacion);
export default routerHabitacion