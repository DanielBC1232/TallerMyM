// controllers/trabajadores/ausenciaController.js
import { Ausencia, AusenciaRepository } from '../../models/trabajadores/ausencia.js';

const ausenciaRepo = new AusenciaRepository();

// Operaciones CRUD
export const insertAusencia = async (req, res) => {
  try {
    const { idTrabajador, fechaAusencia, justificada } = req.body;
    const nuevaAusencia = new Ausencia(idTrabajador, fechaAusencia, justificada);

    await ausenciaRepo.insertAusencia(nuevaAusencia);
    res.status(201).json(nuevaAusencia);
  } catch (error) {
    console.error('Error al insertar ausencia:', error);
    res.status(500).json({ error: 'Error al insertar ausencia' });
  }
};

export const updateAusencia = async (req, res) => {
  try {
    const { idAusencia } = req.params;
    const datosActualizados = req.body;
    const actualizacionExitosa = await ausenciaRepo.updateAusencia(idAusencia, datosActualizados);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: 'Ausencia no encontrada o no se pudo actualizar' });
    } else {
      res.status(200).json({ message: 'Ausencia actualizada exitosamente' });
    }
  } catch (error) {
    console.error('Error al actualizar ausencia:', error);
    res.status(500).json({ error: 'Error al actualizar ausencia' });
  }
};

export const deleteAusencia = async (req, res) => {
  try {
    const { idAusencia } = req.params;
    const eliminacionExitosa = await ausenciaRepo.deleteAusencia(idAusencia);

    if (!eliminacionExitosa) {
      res.status(404).json({ error: 'Ausencia no encontrada o no se pudo eliminar' });
    } else {
      res.status(200).json({ message: 'Ausencia eliminada exitosamente' });
    }
  } catch (error) {
    console.error('Error al eliminar ausencia:', error);
    res.status(500).json({ error: 'Error al eliminar ausencia' });
  }
};

// Métodos GET
export const obtenerAusencias = async (req, res) => {
  try {
    const ausencias = await ausenciaRepo.getAusencias();
    res.status(200).json(ausencias);
  } catch (error) {
    console.error('Error al obtener ausencias:', error);
    res.status(500).json({ error: 'Error al obtener ausencias' });
  }
};

export const obtenerAusenciaPorId = async (req, res) => {
  try {
    const { idAusencia } = req.params;

    if (!idAusencia) {
      return res.status(400).json({ error: 'El ID de ausencia es requerido' });
    }

    const ausencia = await ausenciaRepo.getAusenciaPorId(idAusencia);

    if (!ausencia || ausencia.length === 0) {
      res.status(404).json({ error: 'Ausencia no encontrada' });
    } else {
      res.status(200).json(ausencia[0]);
    }
  } catch (error) {
    console.error('Error al obtener ausencia por ID:', error);
    res.status(500).json({ error: 'Error al obtener ausencia por ID' });
  }
};

export const obtenerAusenciasPorTrabajador = async (req, res) => {
  try {
    const { idTrabajador } = req.params;

    if (!idTrabajador) {
      return res.status(400).json({ error: 'El ID de trabajador es requerido' });
    }

    const ausencias = await ausenciaRepo.getAusenciasPorTrabajador(idTrabajador);
    res.status(200).json(ausencias);
  } catch (error) {
    console.error('Error al obtener ausencias por trabajador:', error);
    res.status(500).json({ error: 'Error al obtener ausencias por trabajador' });
  }
};
