"use strict";
const express = require('express');
const usuarioRoutes = require('../routes/perfil/usuarioRoutes');
const emailRoutes = require("../routes/perfil/emailRoutes");

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import categoriaRoutes from './routes/inventario/categoriaRoutes';
require("../config/database");
const app = (0, express_1.default)();
const cors = require('cors');
app.use(cors());
// Middleware
app.use(express_1.default.json());
const PORT = 3000;
app.get('/ping', (_req, res) => {
    console.log("Ping");
    res.send("respuesta ping Awa");
});
//Ruta API
app.use('/api/usuarios', usuarioRoutes); 
app.use('/api/email', emailRoutes);
//app.use('/api/categorias', categoriaRoutes);
// Iniciar servidor
app.listen(3000, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
