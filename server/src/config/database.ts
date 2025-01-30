const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('MYM_DB', 'MYM_User', 'T4ll3RMyM-', {
  host: 'DAN',
  dialect: 'mssql',
  logging: false,
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully MYM-DB.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();