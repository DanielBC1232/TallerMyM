import {OrdenRepository} from '../../models/flujo/orden.js';

// Crear una instancia de ordenRepository
const OrdenRepo = new OrdenRepository();

const insertOrden = async (req, res) => {
    try {
        // Requerir parámetros desde el cuerpo de la solicitud
        const { tiempoEstimado, idVehiculo, idTrabajador, idCliente,descripcion } = req.body;

        // Usar el método de inserción del repositorio
        const orden = await OrdenRepo.insertOrden(tiempoEstimado, idVehiculo, idTrabajador, idCliente,descripcion);

        // Enviar la respuesta
        res.status(201).json({ message: "Orden insertado correctamente", rowsAffected: orden });
    } catch (error) {
        console.error("Error al insertar orden:", error);
        res.status(500).json({ error: "Error al insertar orden" });
    }
};

const getOrdenesByStatus = async (req, res) => {
    try {

        const id = parseInt(req.params.id);

        // Usar el método de listado del repositorio
        const orden = await OrdenRepo.getOrdenesByStatus(id);

        // Enviar la respuesta
        res.status(200).json(orden);
    } catch (error) {
        console.error("Error al obtener orden:", error);
        res.status(500).json({ error: "Error al obtener orden" });
    }
};

const getOrdenById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Usar el método de obtener orden por ID
        const orden = await OrdenRepo.getOrdenById(id);

        // Enviar la respuesta
        res.status(200).json(orden);
    } catch (error) {
        console.error("Error al obtener orden", error);
        res.status(500).json({ error: "Error al obtener orden" });
    }
};

const updateOrden = async (req, res) => {
    try {
        // Requerir parámetros desde el cuerpo de la solicitud
        const { idOrden, nombreCompleto, cedula, salario, seguroSocial } = req.body;

        // Usar el método de actualizar del repositorio
        const trabajador = await ordenRepo.updateOrden(idOrden, nombreCompleto, cedula, salario, seguroSocial);

        // Enviar la respuesta
        res.status(200).json({ message: "Orden actualizado correctamente", rowsAffected: trabajador });
    } catch (error) {
        console.error("Error al actualizar trabajador:", error);
        res.status(500).json({ error: "Error al actualizar trabajador" });
    }
};

const deleteOrden = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (!id) {
            return res.status(400).json({ error: "ID de trabajador no proporcionado" });
        }

        const rowsAffected = await ordenRepo.deleteOrden(id);
        if (rowsAffected > 0) {
            res.status(200).json({ message: "Orden eliminado correctamente" });
        } else {
            res.status(404).json({ error: "Orden no encontrado" });
        }
    } catch (error) {
        console.error("Error eliminando trabajador:", error);
        res.status(500).json({ error: "Error eliminando trabajador" });
    }
};

export { insertOrden, getOrdenesByStatus, getOrdenById, updateOrden, deleteOrden };
