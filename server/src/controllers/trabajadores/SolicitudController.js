const { Solicitud, SolicitudRepository } = require("../../models/trabajadores/solicitud.js");

const solicitudRepo = new SolicitudRepository();

// Insertar un cliente
const insertSolicitudVacaciones = async (req, res) => {
  try {
    const { fechaInicio,fechaFin,idTrabajador } = req.body;
    const newSolicitud= new Solicitud(fechaInicio,fechaFin,idTrabajador);

    await solicitudRepo.insert(newSolicitud);
    res.status(201).json(newSolicitud);
  } catch (error) {
    console.error("Error al insertar solicitud controller:", error);
    res.status(500).json({ error: "Error al insertar solicitud controller" });
  }
};

const ObtenerVacacionesGest = async (req, res) => {
  try {
    // Usar el método getAll del repositorio
    const Vacaciones = await solicitudRepo.getVacacionesGest();

    res.status(200).json(Vacaciones);
  } catch (error) {
    console.error("Error al obtener todos las Vacaciones:", error);
    res.status(500).json({ error: "Error al obtener todos las Vacaciones" });
  }
};

module.exports = { 
 insertSolicitudVacaciones,ObtenerVacacionesGest,
};










