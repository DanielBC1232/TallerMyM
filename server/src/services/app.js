import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import imgRoutes from '../routes/inventario/imgRoutes.js';
import categoriaRoutes from '../routes/inventario/categoriaRoutes.js';
import marcaRoutes from '../routes/inventario/marcaRoutes.js';
import proveedorRoute from '../routes/inventario/proveedorRoute.js';
import vehiculosCompatiblesRoutes from '../routes/inventario/vehiculosCompatiblesRoutes.js';
import productoRoutes from '../routes/inventario/productoRoutes.js';
import solicitudRoutes from '../routes/inventario/solicitudRoutes.js';
import usuarioRoutes from '../routes/perfil/usuarioRoutes.js';
import ordenRoutes from '../routes/flujo/ordenRoutes.js';
import cotizacionRoutes from '../routes/ventas/cotizacionRoutes.js';
import trabajadoresRoutes from '../routes/trabajadores/trabajadoresRoutes.js';
import ventasRoutes from '../routes/ventas/ventasRoutes.js';
import notificacionesRoutes from '../routes/notificaciones/notificacionesRoutes.js';
import ClienteRoutes from '../routes/clientes/clienteRoutes.js';
import VehiculoRoute from '../routes/vehiculos/vehiculosRoutes.js';
import pagoClienteRoutes from '../routes/finanzas/pagoClienteRoutes.js';
import devolucionRoutes from '../routes/finanzas/devolucionRoutes.js';
import AdministrativoRoute from '../routes/administrativo/AdminRoutes.js';
import { connectDB } from '../config/database.js';
import gastoOperativoRoutes from '../routes/finanzas/gastoOperativoRoutes.js';
import reportesRoutes from '../routes/reportes/reportesRoutes.js';
import dashboardRoutes from '../routes/finanzas/dashboardRoutes.js';

const app = express();
app.use(express.json()); // Middleware
const PORT = 3000; // Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
app.use(cors({
    origin: "http://localhost:5173",
    methods: 'GET, POST, PUT, PATCH, DELETE',
}));
connectDB() // conexion BD
    .then(() => console.log("Conectado a la base de datos"))
    .catch((err) => {
        if (err instanceof Error) {
            console.error("Error en la conexión:", err.message);
        }
        else {
            console.error("Error en la conexión:", err);
        }
    });
//* Rutas Inventario
app.use("/categorias", categoriaRoutes);
app.use("/marcas", marcaRoutes);
app.use("/proveedor", proveedorRoute);
app.use("/vehiculos-compatibles", vehiculosCompatiblesRoutes);
app.use("/productos", productoRoutes);
app.use("/img", imgRoutes);
app.use("/inventario", solicitudRoutes);

//Rutas notificaciones
app.use("/notificaciones", notificacionesRoutes);

//Rutas Ventas
app.use("/cotizacion", cotizacionRoutes);
app.use("/ventas", ventasRoutes);

//Finanzas
app.use("/finanzas", pagoClienteRoutes);
app.use("/finanzas", devolucionRoutes);
app.use("/finanzas", gastoOperativoRoutes);
app.use("/finanzas", dashboardRoutes);
//trabajadores
app.use("/trabajadores", trabajadoresRoutes);

//* Rutas Perfil

// Ruta de Usuario Api
app.use("/api/usuario", usuarioRoutes);

//Ruta modulo de clientes
app.use("/clientes", ClienteRoutes);
//Ruta modulo Vehiculos
app.use("/vehiculos", VehiculoRoute);
//Ruta modulo Administrativo
app.use("/admin", AdministrativoRoute);
//Ruta flujo-ordenes
app.use("/flujo", ordenRoutes);

//reportes
app.use("/reportes", reportesRoutes);



//pruebas de enviar correo al arrancar app
/*
import { cambioEstadoOrden } from '../models/mailer/mailerBD.js';

try {
    cambioEstadoOrden();
  } catch (err) {
    console.error('Error al ejecutar cambioEstadoOrden:', err);
  }
    */