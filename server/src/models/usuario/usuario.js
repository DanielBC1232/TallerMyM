const mongoose = require('mongoose');

// Definir el esquema de usuario
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

// Crear el modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportar el modelo
module.exports = Usuario;