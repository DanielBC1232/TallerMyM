/*
import sql from 'mssql';

const sql = require('mssql');

const dbConfig = {
  user: 'MYM_User',
  password: 'T4ll3RMyM-',
  server: 'DAN',  // cambiar dependiendo de cada maquina
  database: 'MYM_DB',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connectToDatabase() {
  try {
    await sql.connect(dbConfig);
    console.log('Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('Error de conexion a la base de datos: ', err);
  }
}

module.exports = { sql, connectToDatabase };
*/

const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('MYM_DB', 'MYM_User', 'T4ll3RMyM-', {
  host: 'localhost',
  dialect: 'mssql'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}