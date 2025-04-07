import { SolicitudRepository } from "../../models/inventario/solicitudProducto.js";

const SolicitudRepo = new SolicitudRepository();

// Obtener todas las solicitudes
export const getAllSolicituds = async (_req, res) => {
    try {
        const solicitud = await SolicitudRepo.getAllSolicitud(); // Get
        //validaciones
        res.json(solicitud);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener la solicitud" });
    }
};

// Registrar una nueva solicitud
export const addSolicitud = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { titulo, cuerpo, usuario } = req.body;
        // Llamar al método insertSolicitud para insertar la nueva solicitud en la base de datos
        const nuevaSolicitud = await SolicitudRepo.insertSolicitud(titulo, cuerpo, usuario);
        // Respuesta exitosa con la solicitud insertada
        res.status(201).json({
            message: "Solicitud insertada exitosamente",
            solicitud: nuevaSolicitud,
        });
        // Manejo de errores
    }
    catch (error) {
        console.error("Error al insertar la solicitud:", error);
        res.status(500).json({ error: "Error al insertar la solicitud" });
    }
};

// Actualizar una solicitud
export const updateSolicitud = async (req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { idSolicitud, aprobado } = req.body;
        // Llamar al método updateSolicitud para actualizar la solicitud
        const procesarSolicitud = await SolicitudRepo.updateSolicitud(idSolicitud, aprobado);
        // Respuesta exitosa
        res.status(200).json({
            message: "Solicitud procesada exitosamente",
            Res: procesarSolicitud,
        });
    }
    catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
};

// Eliminar una solicitud (se agregó esta función, aunque no estaba en el código original)
export const deleteSolicitud = async (req, res) => {
    try {
        const idSolicitud = parseInt(req.params.id);
        const resultadoEliminacion = await SolicitudRepo.deleteSolicitud(idSolicitud);
        if (resultadoEliminacion > 0) {
            res.status(200).json({ message: "Solicitud eliminada exitosamente" });
        } else {
            res.status(404).json({ error: "Solicitud no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar la solicitud:", error);
        res.status(500).json({ error: "Error al eliminar la solicitud" });
    }
};

// Se corrigió el nombre de la exportación para ser consistente con el nombre de la función
export { getAllSolicituds as getAllSolicitud };