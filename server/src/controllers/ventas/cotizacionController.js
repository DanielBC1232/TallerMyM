import { CotizacionRepository } from '../../models/ventas/cotizacion.js';

// Crear una instancia de CotizacionRepository
const CotizacionRepo = new CotizacionRepository();

const insertCotizacion = async (req, res) => {
    try {
        // Requerir parámetros desde el cuerpo de la solicitud
        const { montoTotal, montoManoObra, tiempoEstimado, detalles, idCliente } = req.body;

        // Usar el método de inserción del repositorio
        const cotizacion = await CotizacionRepo.insertCotizacion(montoTotal, montoManoObra, tiempoEstimado, detalles, idCliente);

        // Enviar la respuesta
        res.status(200).json({ message: "Cotización insertada correctamente", rowsAffected: cotizacion });
    } catch (error) {
        console.error("Error al insertar cotización:", error);
        res.status(500).json({ error: "Error al insertar cotización" });
    }
};

const getCotizacion = async (_req, res) => {
    try {

        // Usar el método de listado del repositorio
        const cotizacion = await CotizacionRepo.getCotizacion();

        // Enviar la respuesta
        res.status(200).json(cotizacion);
    } catch (error) {
        console.error("Error al obtener cotización:", error);
        res.status(500).json({ error: "Error al obtener cotización" });
    }
};

const updateCotizacion = async (req, res) => {
    try {
        // Requerir parámetros desde el cuerpo de la solicitud
        const { idCotizacion, montoTotal, montoManoObra, tiempoEstimado, detalles } = req.body;

        // Usar el método de actualizar del repositorio
        const cotizacion = await CotizacionRepo.updateCotizacion(idCotizacion, montoTotal, montoManoObra, tiempoEstimado, detalles);

        // Enviar la respuesta
        res.status(200).json({ message: "Cotización actualizada correctamente", rowsAffected: cotizacion });
    } catch (error) {
        console.error("Error al actualizar cotización:", error);
        res.status(500).json({ error: "Error al actualizar cotización" });
    }
};

const deleteCotizacion = async (req, res) => {
    try {
        // Requerir parámetros desde el cuerpo de la solicitud
        const { idCotizacion } = req.body;

        // Usar el método de eliminar del repositorio
        const cotizacion = await CotizacionRepo.deleteCotizacion(idCotizacion);

        // Enviar la respuesta
        res.status(200).json({ message: "Cotización eliminada correctamente", rowsAffected: cotizacion });
    } catch (error) {
        console.error("Error al eliminar cotización:", error);
        res.status(500).json({ error: "Error al eliminar cotización" });
    }
};

export { insertCotizacion, getCotizacion, updateCotizacion, deleteCotizacion };
