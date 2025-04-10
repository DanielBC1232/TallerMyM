import "rsuite/dist/rsuite.min.css";
import "./styles/custom.css";
import "./styles/style.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Rutas para Inventario
import Index from './components/Index.jsx';
import Detalles from "./features/inventario/pages/Detalles";
import IndexInventario from "./features/inventario/pages/index";
import Editar from "./features/inventario/pages/Editar";
import Agregar from "./features/inventario/pages/Agregar";
import Solicitudes from "./features/inventario/pages/Solicitudes";

// Rutas para Ventas
import IndexVentas from './features/ventas/pages/index.jsx';
import IndexCotizacion from "./features/ventas/pages/IndexCotizacion.jsx";
import EditarCotizacion from "./features/ventas/pages/EditarCotizarcion.jsx";
import Venta from "./features/ventas/pages/Venta.jsx";

// Rutas para Finanzas
import GastosOperativos from "./features/finanzas/pages/GastosOperativos.jsx";
import Dashboard from "./features/finanzas/pages/Dashboard.jsx";
import Reportes from "./features/finanzas/pages/Reportes.jsx";

// Rutas para Flujo
import IndexFlujo from "./features/flujo/pages/Index.jsx";
import DetallesOrden from "./features/flujo/pages/Detalles.jsx";
import EditarOrden from "./features/flujo/pages/Editar.jsx";

// Rutas para Trabajadores
import IndexTrabajadores from "./features/trabajadores/pages/IndexTrabajadores.jsx";
import AgregarTrabajador from "./features/trabajadores/pages/AgregarTrabajador.jsx";
import EditarTrabajador from "./features/trabajadores/pages/EditarTrabajador.jsx";
import AgregarAmonestacion from "./features/trabajadores/pages/AgregarAmonestacion.jsx";
import AgregarAusencia from "./features/trabajadores/pages/AgregarAusencia.jsx";

// Rutas para Clientes
import IndexClientes from "./features/clientes/pages/IndexClientes.jsx";
import EditarCliente from "./features/clientes/pages/EditarCliente.jsx";

// Rutas para Vehículos
import IndexVehiculos from "./features/vehiculos/pages/IndexVehiculos.jsx";
import EditarVehiculo from "./features/vehiculos/pages/EditarVehiculo.jsx";

// Rutas Módulo Administrativo
import IndexUsuarios from "./features/admininstracion/pages/IndexUsuarios.jsx";
import EditarUsuario from "./features/admininstracion/pages/EditarUsuario.jsx";
import Login from "./components/Login.jsx";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main style={{ minHeight: "95vh" }}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />

          {/* Inventario */}
          <Route path="/inventario-agregar" element={<Agregar />} />
          <Route path="/inventario" element={<IndexInventario />} />
          <Route path="/inventario-detalles/:idProducto" element={<Detalles />} />
          <Route path="/inventario-editar/:idProducto" element={<Editar />} />
          <Route path="/solicitudes" element={<Solicitudes />} />

          {/* Flujo */}
          <Route path="/flujo" element={<IndexFlujo />} />
          <Route path="/flujo-detalles/:idOrden" element={<DetallesOrden />} />
          <Route path="/flujo-editar/:idOrden" element={<EditarOrden />} />

          {/* Ventas */}
          <Route path="/ventas" element={<IndexVentas />} />
          <Route path="/cotizacion" element={<IndexCotizacion />} />
          <Route path="/cotizacion-editar/:idCotizacion" element={<EditarCotizacion />} />
          <Route path="/detalles/:idVenta" element={<Venta />} />

          {/* Finanzas (Rutas protegidas) */}
          <Route path="/gastos-operativos" element={<PrivateRoute element={<GastosOperativos />} />} />
          <Route path="/Dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/Reportes" element={<PrivateRoute element={<Reportes />} />} />

          {/* Trabajadores */}
          <Route path="/trabajadores" element={<IndexTrabajadores />} />
          <Route path="/trabajadores-agregar" element={<AgregarTrabajador />} />
          <Route path="/trabajadores-editar/:idTrabajador" element={<EditarTrabajador />} />
          <Route path="/trabajadores-agregar-amonestacion" element={<AgregarAmonestacion />} />
          <Route path="/trabajadores-registrar-ausencia" element={<AgregarAusencia />} />

          {/* Clientes */}
          <Route path="/clientes" element={<IndexClientes />} />
          <Route path="/cliente-editar/:cedula" element={<EditarCliente />} />

          {/* Vehículos */}
          <Route path="/vehiculos" element={<IndexVehiculos />} />
          <Route path="/vehiculo-editar/:idVehiculo" element={<EditarVehiculo />} />

          {/* Rutas protegidas para Administración */}
          <Route
            path="/administracion"
            element={<PrivateRoute element={<IndexUsuarios />} />}
          />
          <Route
            path="/usuario-editar/:idUsuario"
            element={<PrivateRoute element={<EditarUsuario />} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
