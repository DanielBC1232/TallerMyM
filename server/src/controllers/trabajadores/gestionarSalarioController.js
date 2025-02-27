const Trabajador = require('../../models/trabajadores/agregarModels');

// Actualizar el salario de un trabajador
const actualizarSalario = async (req, res) => {
    try {
        const { id } = req.params;
        const { salario } = req.body;

        // Validación del salario
        if (isNaN(salario) || salario < 0) {
            return res.status(400).json({ message: 'El salario debe ser un número mayor o igual a 0.' });
        }

        // Buscar y actualizar el salario del trabajador
        const trabajadorActualizado = await Trabajador.findByIdAndUpdate(
            id,
            { salario },
            { new: true }
        );

        if (!trabajadorActualizado) {
            return res.status(404).json({ message: 'Trabajador no encontrado.' });
        }

        res.status(200).json({ message: 'Salario actualizado exitosamente.', trabajador: trabajadorActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el salario del trabajador.' });
    }
};

module.exports = { actualizarSalario };
