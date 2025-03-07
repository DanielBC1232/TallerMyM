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
        res.json({ message: "Cotización insertada correctamente", rowsAffected: cotizacion });
    } catch (error) {
        console.error("Error al insertar cotización:", error);
        res.status(500).json({ error: "Error al insertar cotización" });
    }
};

export { insertCotizacion };
