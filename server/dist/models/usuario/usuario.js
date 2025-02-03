const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Asegúrate de que esté correctamente importado

// Definir el modelo Usuario
const usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreUsuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  cedula: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  contrasenaHash: {
    type: DataTypes.BLOB('tiny'),
    allowNull: false,
  },
  estadoCuenta: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  fechaRegistro: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  fechaUltimaSesion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'USUARIO',  // Asegúrate de que el nombre de la tabla sea correcto
  timestamps: false,     // Desactivar los timestamps automáticos si no se utilizan
});

module.exports = usuario;