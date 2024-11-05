import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";
export const crearUsuario = async (req, res) => {
    try {
      const { email, password, } = req.body; 
const usuarioExistente = await Usuario.findOne({ email });
if (usuarioExistente) {
    return res
      .status(400)
      .json({ mensaje: "Este correo ya se encuentra registrado" });
  }const nuevoUsuario = new Usuario(req.body);
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
