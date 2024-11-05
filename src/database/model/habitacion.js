import mongoose, { Schema } from "mongoose";

const reservasSchema = new Schema({
    numHabitacion: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength:1000
    },
    tipoHabitacion: {
        type: String,
        required: true,
        minLength: 2,
        maxLength:50,
        unique:true
    },
    disponibilidad: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    precio: {
        type: Number,
        required: true,
        min: 50,
        max: 2000000
    },
    imagen: {
        type: String,
        required: true,
        validate: {
            validator: (url) =>{
                return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(url)
            }
        }
    },
    descripcion_breve: {
        type: String,
        required: true,
        minLength: 3,
        maxLength:200
    }
});

const Reserva = mongoose.model('reserva', reservasSchema)

export default Reserva