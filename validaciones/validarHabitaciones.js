const validarHAbitaciones = [
    check("habitacion")
      .notEmpty()
      .withMessage("El nombre del producto es un dato obligatorio")
      ,
    check("imagen")
      .notEmpty()
      .withMessage("La url de la imagen es un dato obligatorio")
      .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
      .withMessage(
        "La imagen debe ser una url valida y debe terminar con uno de los siguientes formatos (jpg|jpeg|gif|png)"
      ),
    //luego de hacer todas las validaciones, invoco a resultado validacion
    (req, res, next) => resultadoValidacion(req, res, next),
  ];
  
  export default validarHAbitaciones;
  