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
