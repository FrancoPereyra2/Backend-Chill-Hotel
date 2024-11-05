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