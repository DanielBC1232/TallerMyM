
import { Amonestacion, AmonestacionRepository } from "../../models/trabajadores/amonestaciones.js";
const amonestacionRepo = new AmonestacionRepository();

// Operaciones CRUD
const InsertAmonestacion = async (req, res) => {
  try {
    const { idTrabajador, fechaAmonestacion, tipoAmonestacion, motivo, accionTomada } = req.body;
    const newAmonestacion = new Amonestacion(idTrabajador, fechaAmonestacion, tipoAmonestacion, motivo, accionTomada);

    await amonestacionRepo.InsertAmonestacion(newAmonestacion);
    res.status(201).json(newAmonestacion);
  } catch (error) {
    console.error("Error al insertar amonestación:", error);
    res.status(500).json({ error: "Error al insertar amonestación" });
  }
};

const UpdateAmonestacion = async (req, res) => {
  try {
    const idAmonestacion = req.params.idAmonestacion;
    const datosActualizados = req.body;
    const actualizacionExitosa = await amonestacionRepo.UpdateAmonestacion(idAmonestacion, datosActualizados);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: "Amonestación no encontrada o no se pudo actualizar" });
    } else {
      res.status(200).json({ message: "Amonestación actualizada exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar amonestación:", error);
    res.status(500).json({ error: "Error al actualizar amonestación" });
  }
};

const DeleteAmonestacion = async (req, res) => {
  try {
    const idAmonestacion = req.params.idAmonestacion;
    const actualizacionExitosa = await amonestacionRepo.DeleteAmonestacion(idAmonestacion);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: "Amonestación no encontrada o no se pudo eliminar" });
    } else {
      res.status(200).json({ message: "Amonestación eliminada exitosamente" });
    }
  } catch (error) {
    console.error("Error al eliminar amonestación:", error);
    res.status(500).json({ error: "Error al eliminar amonestación" });
  }
};

// Métodos Get
const ObtenerAmonestaciones = async (req, res) => {
  try {
    const amonestaciones = await amonestacionRepo.getAmonestaciones();
    res.status(200).json(amonestaciones);
  } catch (error) {
    console.error("Error al obtener amonestaciones:", error);
    res.status(500).json({ error: "Error al obtener amonestaciones" });
  }
};

const ObtenerAmonestacionxID = async (req, res) => {
  try {
    const { idAmonestacion } = req.params;

    if (!idAmonestacion) {
      return res.status(400).json({ error: "El ID de amonestación es requerido" });
    }

    const amonestacion = await amonestacionRepo.getAmonestacionPorId(idAmonestacion);

    if (!amonestacion || amonestacion.length === 0) {
      res.status(404).json({ error: "Amonestación no encontrada" });
    } else {
      res.status(200).json(amonestacion[0]);
    }
  } catch (error) {
    console.error("Error al obtener amonestación por ID:", error);
    res.status(500).json({ error: "Error al obtener amonestación por ID" });
  }
};

export {
  InsertAmonestacion,
  UpdateAmonestacion,
  DeleteAmonestacion,
  ObtenerAmonestaciones,
  ObtenerAmonestacionxID
};
