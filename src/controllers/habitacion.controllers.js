import Reserva from "../database/model/habitacion.js"


export const agregarHabitacion = async(req, res)=>{
    try {
        const nuevaHabitacion = new Reserva(req.body)
        
        await nuevaHabitacion.save()
        
        res.status(201).json({mensaje: '¡La habitacion fue agregada con Exito!'})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: 'Ocurrio un Error, no pude agregar la habitacion'})
    }
}

export const listaHabitaciones = async(req, res)=>{
    try {
        const habitaciones = await Reserva.find()
        
        res.status(200).json(habitaciones)
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: 'Ocurrio un Error, no pude agregar la habitacion'})
    }
}