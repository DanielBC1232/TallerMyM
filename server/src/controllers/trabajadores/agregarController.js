const Trabajador = require('../../models/trabajadores/agregarModels');


// Crear un nuevo trabajador
const agregarTrabajador = async (req, res) => {
    try {
        const { nombreCompleto, cedula, salario, seguroSocial } = req.body;

        // Validación de campos requeridos
        if (!nombreCompleto || !cedula || !salario || !seguroSocial) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        // Crear un nuevo trabajador
        const nuevoTrabajador = new Trabajador({
            nombreCompleto,
            cedula,
            salario,
            seguroSocial
        });

        await nuevoTrabajador.save();
        res.status(201).json({ message: 'Trabajador agregado exitosamente.', trabajador: nuevoTrabajador });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el trabajador.' });
    }
};

module.exports = { agregarTrabajador };
