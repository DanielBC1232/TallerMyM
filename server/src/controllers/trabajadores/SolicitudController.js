const { Solicitud, SolicitudRepository } = require("../../models/trabajadores/solicitud");

const solicitudRepo = new SolicitudRepository();

//Operaciones CRUD
// Insertar un cliente
const InsertSolicitudVacaciones = async (req, res) => {
  try {
    const { fechaInicio,fechaFin,idTrabajador } = req.body;
    const newSolicitud= new Solicitud(fechaInicio,fechaFin,idTrabajador);

    await solicitudRepo.InsertSolicitud(newSolicitud);
    res.status(201).json(newSolicitud);
  } catch (error) {
    console.error("Error al insertar solicitud controller:", error);
    res.status(500).json({ error: "Error al insertar solicitud controller" });
  }
};

const UpdateSolicitudVacaciones = async (req, res) => {
  try {
    
    const idVacaciones = req.params.idVacaciones;
    const datosActualizados = req.body;
    const actualizacionExitosa = await solicitudRepo.UpdateSolicitud(idVacaciones, datosActualizados);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: "Vehiculo no encontrado o no se pudo actualizar" });
    } else {
      res.status(200).json({ message: "Datos del cliente actualizados exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar los datos del cliente" });
  }
};

const DeleteSolicitudVacaciones = async (req, res) => {
  try {
    
    const idVacaciones = req.params.idVacaciones;
  //  const datosActualizados = req.body;datosActualizados
    const actualizacionExitosa = await solicitudRepo.DeleteSolicitud(idVacaciones);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: "Vehiculo no encontrado o no se pudo actualizar" });
    } else {
      res.status(200).json({ message: "Datos del cliente actualizados exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar los datos del cliente" });
  }
};
//---------
//Aprobar y Rechar---
const AprobarSolicitudVacaciones = async (req, res) => {
  try {
    
    const idVacaciones = req.params.idVacaciones;
  //  const datosActualizados = req.body;datosActualizados
    const actualizacionExitosa = await solicitudRepo.AprobarSolicitud(idVacaciones);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: "Vehiculo no encontrado o no se pudo actualizar" });
    } else {
      res.status(200).json({ message: "Datos del cliente actualizados exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar los datos del cliente" });
  }
};

const RechazarSolicitudVacaciones = async (req, res) => {
  try {
    
    const idVacaciones = req.params.idVacaciones;
   const datosActualizados = req.body;
    const actualizacionExitosa = await solicitudRepo.RechazarSolicitud(idVacaciones,datosActualizados);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: "Vehiculo no encontrado o no se pudo actualizar" });
    } else {
      res.status(200).json({ message: "Datos del cliente actualizados exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar los datos del cliente" });
  }
};

//Metodos Get

//Obtener Vacaciones listado Vacaciones solicitadas (aprobar vacaciones index)
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


const ObtenerVacacionxID = async (req, res) => {
  try {
    const { idVacaciones } = req.params; // Obtener la cédula del query string

    if (!idVacaciones) {
      return res.status(400).json({ error: "El Id es requerido" });
    }

    const vacacion = await solicitudRepo.getVacionPorIdVacacion(idVacaciones);

    if (!vacacion || vacacion.length === 0) {
      res.status(404).json({ error: "vehiculo no encontrado" });
    } else {
      res.status(200).json(vacacion[0]); // Devuelve el primer vehiculo encontrado
    }
  } catch (error) {
    console.error("Error al obtener vacacion por idVacacion:", error);
    res.status(500).json({ error: "Error al obtener vacacion por idVacacion" });
  }
};

module.exports = { 
 InsertSolicitudVacaciones,UpdateSolicitudVacaciones,DeleteSolicitudVacaciones,
 AprobarSolicitudVacaciones,RechazarSolicitudVacaciones,
 ObtenerVacacionesGest,ObtenerVacacionxID
};










