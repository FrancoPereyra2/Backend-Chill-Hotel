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

    const nuevoUsuario = new Usuario(req.body);
    //hashea el password
    const saltos = bcrypt.genSaltSync(10);
    nuevoUsuario.password = bcrypt.hashSync(password, saltos);
    nuevoUsuario.save();
    res.status(201).json({ mensaje: "El usuario se creo correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ mensaje: "Ocurrio un error al intentar crear un usuario" });
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
    res.status(200).json({
      mensaje: "Los datos del usuario son validos",
      email,
      token
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrio un error al intentar loguear a un usuario" });
  }
};
