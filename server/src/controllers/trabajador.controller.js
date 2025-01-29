const { connectToDB, sql } = require('../config/db.config');

// Obtener todos los trabajadores
const getTrabajadores = async (req, res) => {
  /*
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM TRABAJADOR');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los trabajadores' });
  }
};
*/
  // Simulando una respuesta de trabajadores
  const trabajadores = [
    { idTrabajador: 1, nombreCompleto: 'Juan Pérez', cedula: '123456', salario: '5000', seguroSocial: 'SS12345' },
    { idTrabajador: 2, nombreCompleto: 'Ana Gómez', cedula: '987654', salario: '6000', seguroSocial: 'SS67890' }
  ];
  res.json(trabajadores);  // Devuelve la lista de trabajadores en formato JSON
};

module.exports = { getTrabajadores };
