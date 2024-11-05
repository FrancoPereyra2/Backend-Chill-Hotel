import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    require: true,
    unique:true,
    validate: {
        validator: (value)=>{
            return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value)
        }
    }
  },
  nombreUsuario: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50
    },
    nombre: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    apellido: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    nacionalidad: {
        type: String,
        required: true,
        enum: ["Argentina", "Chile", "US", "Brasil", "México"],
    },
    imagen: {
        type: String,
        required: true,
        validate: {
            validator: (valor) => {
                return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(valor);
            },
    },
  },
  password: {
    type: String,
    trim: true,
    require: true,
    validate:{
        validator: (value)=>{
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)
        }
    }
  },  
});

 const Usuario = mongoose.model('usuario', usuarioSchema);
 export default Usuario;