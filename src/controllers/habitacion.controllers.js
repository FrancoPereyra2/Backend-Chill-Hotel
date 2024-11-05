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

export const editarHabitacion = async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.params.id);
      
      const HabitacionBuscada = await Reserva.findById(req.params.id);
      console.log(HabitacionBuscada);
     
      if (!HabitacionBuscada) {
        return res
          .status(404)
          .json({ mensaje: "La Habitacion solicitada no existe" });
      }
   
      await Reserva.findByIdAndUpdate(req.params.id, req.body);

      res.status(200).json({ mensaje: "La Habitacion fue editada correctamente" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Ocurrio un error, no se pudo editar la Habitacion" });
    }
  };
  

  export const borrarHabitacion = async (req, res) => {
    try {
   
      const HabitacionBuscada = await Reserva.findById(req.params.id);
  
      if (!HabitacionBuscada) {
        return res.status(404).json({ mensaje: "La Habitacion no fue encontrada" });
      }
      
    
      await Reserva.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ mensaje: "La Habitacion fue eliminada correctamente" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ mensaje: "Ocurrio un error, no se pudo eliminar la Habitacion" });
    }
  };

  
export const obtenerHabitacion = async (req, res)=>{
    try {
       
       const HabitacionBuscada = await Reserva.findById(req.params.id)
       
       if(!HabitacionBuscada){
          return res.status(404).json({mensaje: 'La Habitacion no fue encontrada'})
       }
      
       res.status(200).json(HabitacionBuscada)
    } catch (error) {
       console.error(error);
       res
         .status(500)
         .json({ mensaje: "Ocurrio un error, no se pudo obtener la habitacion" });
    }
 }