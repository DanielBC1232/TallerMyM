const Trabajador = require('../../models/trabajadores/agregarModels');

// Obtener todos los trabajadores
const obtenerTrabajadores = async (req, res) => {
    try {
        const trabajadores = await Trabajador.find();
        if (trabajadores.length === 0) {
            return res.status(404).json({ message: 'No se encontraron trabajadores.' });
        }
        res.status(200).json(trabajadores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los trabajadores.' });
    }
};

module.exports = { obtenerTrabajadores };
