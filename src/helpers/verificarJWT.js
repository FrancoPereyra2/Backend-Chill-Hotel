import jwt from "jsonwebtoken";

const validarJWT = (req, res, next) => {
  console.log(req.header);
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      mensaje: "No hay token en la peticion",
    });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    req._id = payload.uid;
    req.email = payload.email;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error.message);
    switch (error.name) {
      case "JsonWebTokenError":
        return res.status(401).json({ mensaje: "Token invalido" });
      case "TokenExpiredError":
        return res.status(401).json({ mensaje: "el token expiro" });
      case "UnauthorizedError":
        return res
          .status(403)
          .json({
            mensaje:
              "No tiene los permisos suficientes para acceder al recurso",
          });
      default:
        return res.status(500).json({ mensaje: "Error al verificar el token" });
    }
  }
};

export default validarJWT;


