const express = require('express');
const bodyParser = require('body-parser');
const trabajadorRoutes = require('./routes/trabajador.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api', trabajadorRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

