const { connectToDB, sql } = require('../config/db.config');

// Obtener todos los trabajadores
const getTrabajadores = async (req, res) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM TRABAJADOR');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los trabajadores' });
  }
};

// Agregar un trabajador
const addTrabajador = async (req, res) => {
  const { nombreCompleto, cedula, salario, seguroSocial } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('nombreCompleto', sql.VarChar, nombreCompleto)
      .input('cedula', sql.VarChar, cedula)
      .input('salario', sql.Decimal(10, 2), salario)
      .input('seguroSocial', sql.VarChar, seguroSocial)
      .query(`INSERT INTO TRABAJADOR (nombreCompleto, cedula, salario, seguroSocial)
              VALUES (@nombreCompleto, @cedula, @salario, @seguroSocial)`);
    res.status(201).json({ message: 'Trabajador agregado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar el trabajador' });
  }
};

module.exports = { getTrabajadores, addTrabajador };
