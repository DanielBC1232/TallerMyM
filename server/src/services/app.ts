import express from 'express';
import categoriaRoutes from './routes/inventario/categoriaRoutes';

const app = express();

// Middleware
app.use(express.json());  // Para manejar cuerpos JSON en las solicitudes

// Enlazar las rutas de categorías
app.use('/api/categorias', categoriaRoutes);

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
