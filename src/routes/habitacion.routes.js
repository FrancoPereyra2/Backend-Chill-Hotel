import { Router } from "express";
import { agregarHabitacion, listaHabitaciones } from "../controllers/habitacion.controllers.js";


const routerHabitacion = Router()
routerHabitacion.route('/habitaciones').post(agregarHabitacion).get(listaHabitaciones)

export default routerHabitacion