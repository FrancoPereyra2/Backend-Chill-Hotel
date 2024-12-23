import Usuario from "../database/model/usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export const crearUsuario = async (req, res) => {
  try {
    const { email, password, nombreUsuario } = req.body;
    const mailExistente = await Usuario.findOne({email});
    if (mailExistente) {
      return res
        .status(400)
        .json({ mensaje: "Este correo ya se encuentra registrado" });
    } 
    const usuarioExistente = await Usuario.findOne({nombreUsuario});
    if (usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: "Nombre de usuario en uso" });
    } 
    const nuevoUsuario = new Usuario(req.body)
    const saltos = bcrypt.genSaltSync(10);
    nuevoUsuario.password = bcrypt.hashSync(password, saltos);
    nuevoUsuario.save();
    res.status(201).json({
      id: nuevoUsuario._id,
      email: nuevoUsuario.email,
       mensaje: "El usuario se creo correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ mensaje: "Ocurrio un error al intentar crear un usuario" });
  }
};

export const leerUsuario = async(req, res)=>{
  try {
      const usuarios = await Usuario.find();
      
      res.status(200).json(usuarios)
  } catch (error) {
      console.error(error)
      res.status(500).json({mensaje: 'Ocurrio un Error, no pude agregar la habitacion'})
  }
}

export const obtenerUsuario = async (req, res)=>{
  try {  
     const UsuarioBuscado = await Usuario.findById(req.params.id)
     
     if(!UsuarioBuscado){
      console.info(UsuarioBuscado)
        return res.status(404).json({mensaje: 'Los datos del usuario no fueron encontrados'})
     }
    
     res.status(200).json(UsuarioBuscado)
  } catch (error) {
     console.error(error);
     res
       .status(500)
       .json({ mensaje: "Ocurrio un error, no se pudo obtener el usuario" });
  }
}

export const editarUsuario = async (req, res) => {
  try {
    const UsuarioBuscado = await Usuario.findById(req.params.id);
    console.info(UsuarioBuscado);
   
    if (!UsuarioBuscado) {
      return res
        .status(404)
        .json({ mensaje: "El usuario no existe" });
    }
 
    await Usuario.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({ mensaje: "El usuario fue editado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no se pudo editar el usuario" });
  }
};

export const borrarUsuario = async (req, res) => {
  try {
 
    const UsuarioBuscado = await Usuario.findById(req.params.id);

    if (!UsuarioBuscado) {
      return res.status(404).json({ mensaje: "Error al encontrar la cuenta, intente mas tarde" });
    }
    
  
    await Usuario.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ mensaje: "La Cuenta fue eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error, no se pudo eliminar la cuenta" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (!usuarioExistente) {
      return res
        .status(400)
        .json({ mensaje: "Correo o password incorrecto - email" });
    }
    const passwordValido = bcrypt.compareSync(password, usuarioExistente.password)
    if (!passwordValido) {
      return res
        .status(400)
        .json({ mensaje: "Correo o password incorrecto - password" });
    }
    const token = await generarJWT(usuarioExistente._id, usuarioExistente.email)
    const id = usuarioExistente._id
    res.status(200).json({
      mensaje: "Los datos del usuario son validos",
      email,
      token,
      id
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar loguear a un usuario" });
  }
};
