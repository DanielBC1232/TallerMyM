import "rsuite/dist/rsuite.min.css";
import "./styles/custom.css";
import "./styles/style.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";

//inventario
import Index from './components/Index.jsx'
import Detalles from "./features/inventario/pages/Detalles";
import IndexInventario from "./features/inventario/pages/index";
import Editar from "./features/inventario/pages/Editar";
import Agregar from "./features/inventario/pages/Agregar";
import Solicitudes from "./features/inventario/pages/Solicitudes";

//ventas
import IndexVentas from './features/ventas/pages/index.jsx'
import IndexCotizacion from "./features/ventas/pages/IndexCotizacion.jsx";
import Cotizar from "./features/ventas/pages/Cotizar.jsx";
import EditarCotizacion from "./features/ventas/pages/EditarCotizarcion.jsx";
import Venta from "./features/ventas/pages/Venta.jsx";

//Finanzas
import GastosOperativos from "./features/finanzas/pages/GastosOperativos.jsx";
import Dashboard from "./features/finanzas/pages/Dashboard.jsx";
import Reportes from "./features/finanzas/pages/Reportes.jsx";

//flujo
import IndexFlujo from "./features/flujo/pages/Index.jsx";
import AgregarOrden from './features/flujo/pages/Agregar.jsx';
import DetallesOrden from "./features/flujo/pages/Detalles.jsx";
import EditarOrden from "./features/flujo/pages/Editar.jsx";

//Trabajadores
import IndexTrabajadores from "./features/trabajadores/pages/IndexTrabajadores.jsx";
import AgregarTrabajador from "./features/trabajadores/pages/AgregarTrabajador.jsx";
import EditarTrabajador from "./features/trabajadores/pages/EditarTrabajador.jsx";

import AgregarAmonestacion from "./features/trabajadores/pages/AgregarAmonestacion.jsx";
import AgregarAusencia from "./features/trabajadores/pages/AgregarAusencia.jsx";

//imports clientes
import IndexClientes from "./features/clientes/pages/IndexClientes.jsx";
import AgregarCliente from "./features/clientes/pages/AgregarCliente.jsx";
import EditarCliente from "./features/clientes/pages/EditarCliente.jsx";

//imports vehiculos
import IndexVehiculos from "./features/vehiculos/pages/IndexVehiculos.jsx";
import AgregarVehiculo from "./features/vehiculos/pages/AgregarVehiculo.jsx";
import EditarVehiculo from "./features/vehiculos/pages/EditarVehiculo.jsx";

//Imports Modulo administrativo
import IndexUsuarios from "./features/admininstracion/pages/IndexUsuarios.jsx";
import AgregarUsuario from "./features/admininstracion/pages/AgregarUsuario.jsx";
import EditarUsuario from "./features/admininstracion/pages/EditarUsuario.jsx";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main style={{ minHeight: "95vh" }}>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Rutas para inventario */}
          <Route path="/inventario-agregar" element={<Agregar />} />
          <Route path="/inventario" element={<IndexInventario />} />
          <Route path="/inventario-detalles/:idProducto" element={<Detalles />} />{/* :id para esperar recibir un id */}
          <Route path="/inventario-editar/:idProducto" element={<Editar />} />{/* :id para esperar recibir un id */}
          <Route path="/solicitudes/" element={<Solicitudes />} />

          {/* FLUJO */}
          <Route path="/flujo" element={<IndexFlujo />} />
          <Route path="/flujo-agregar" element={<AgregarOrden />} />
          <Route path="/flujo-detalles/:idOrden" element={<DetallesOrden />} />
          <Route path="/flujo-editar/:idOrden" element={<EditarOrden />} />

          {/* Ventas */}
          <Route path="/ventas" element={<IndexVentas />} />
          <Route path="/cotizacion" element={<IndexCotizacion />} />
          <Route path="/cotizacion-cotizar" element={<Cotizar />} />
          <Route path="/cotizacion-editar/:idCotizacion" element={<EditarCotizacion />} />
          <Route path="/detalles/:idVenta" element={<Venta />} />

          {/* Finanzas */}
          <Route path="/gastos-operativos" element={<GastosOperativos />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Reportes" element={<Reportes />} />

          {/* Ruta para trabajadores*/}
          <Route path="/trabajadores" element={<IndexTrabajadores />} />
          <Route path="/trabajadores-agregar" element={<AgregarTrabajador />} />
          <Route path="/trabajadores-editar/:idTrabajador" element={<EditarTrabajador />} />
          
          <Route path="/trabajadores-agregar-amonestacion" element={<AgregarAmonestacion />} />
          <Route path="/trabajadores-registrar-ausencia" element={<AgregarAusencia />} />


















          {/* Rutas para clientes */}
          <Route path="/clientes" element={<IndexClientes />} />
          <Route path="/cliente-agregar" element={<AgregarCliente />} />
          <Route path="/cliente-editar/:cedula" element={<EditarCliente />} />

          {/* Rutas para Vehiculos */}
          <Route path="/vehiculos" element={<IndexVehiculos />} />
          <Route path="/vehiculo-agregar" element={<AgregarVehiculo />} />
          <Route path="/vehiculo-editar/:idVehiculo" element={<EditarVehiculo />} />

          {/* Rutas para Admin */}
          <Route path="/administracion" element={<IndexUsuarios />} />
          <Route path="/usuario-agregar" element={<AgregarUsuario/>} />
          <Route path="/usuario-editar/:idUsuario" element={<EditarUsuario />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
