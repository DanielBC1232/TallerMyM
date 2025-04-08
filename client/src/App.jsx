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
import TrabajadoresIndex from "./features/trabajadores/pages/Index.jsx";
import AgregarTrabajador from "./features/trabajadores/pages/Agregar.jsx";
import EditarTrabajador from "./features/trabajadores/pages/Editar.jsx";
//---Seccion de solicitud de vacaciones
import AgregarSolicitudVacaciones from "./features/trabajadores/pages/AgregarSolicitud.jsx"
import GestionarSolicitudVacaciones from "./features/trabajadores/pages/GestionarSolicitud.jsx";
//--seccion gestion de salarios
// import GestionarSalarios from "./features/trabajadores/pages/ListaGestSalariosPage.jsx";
// import EditarTrabajadorSalario from "./features/trabajadores/pages/EditarSalario.jsx";

// import AprobarVacaciones from "./features/trabajadores/pages/AprobarVacaciones.jsx";


//administracion
import CrearPerfil from "./features/perfil/pages/CrearPerfil";

//imports clientes
import IndexClientes from "./features/clientes/pages/IndexClientes.jsx";
import AgregarCliente from "./features/clientes/pages/AgregarCliente.jsx";
import EditarCliente from "./features/clientes/pages/EditarCliente.jsx";

//imports vehiculos
import IndexVehi from "./features/vehiculos/pages/IndexVehi.jsx";
import ListarVehiculosPage from "./features/vehiculos/pages/ListarVehiculosPage.jsx";
import ListarEditVehiculosPage from "./features/vehiculos/pages/ListarEditVehiculosPage.jsx";
import ListarElimVehiculosPage from "./features/vehiculos/pages/ListarElimVehiculosPage.jsx";

import AgregarVehiculo from "./features/vehiculos/pages/AgregarVehiculo.jsx";
import EditarVehiculo from "./features/vehiculos/pages/EditarVehiculo.jsx";
import EliminarVehiculo from "./features/vehiculos/pages/EliminarVehiculo.jsx";

//Imports Modulo administrativo
import ListarUsuariosPage from "./features/adminn/pages/ListarUsuariosPage.jsx";
import ListarEditUsuariosPage from "./features/adminn/pages/ListarEditUsuariosPage.jsx";
import ListarElimUsuariosPage from "./features/adminn/pages/ListarElimUsuariosPage.jsx"


import IndexAdmin from "./features/adminn/pages/IndexAdm.jsx";
import AgregarUsuario from "./features/adminn/pages/AgregarUser.jsx";
import EditarUsuario from "./features/adminn/pages/EditarUser.jsx"
import EliminarUsuario from "./features/adminn/pages/EliminarUser.jsx"

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
          {/* <Route path="/trabajadores" element={<TrabajadoresIndex />} />
          <Route path="/trabajadores-agregar" element={<AgregarTrabajador />} />
          <Route path="/trabajadores-editar/:idTrabajador" element={<EditarTrabajador />} />

          <Route path="/AgregarSolicitud-Vacaciones" element={<AgregarSolicitudVacaciones />} />
          <Route path="/GestionarSolicitud-Vacaciones" element={<GestionarSolicitudVacaciones />} />

          <Route path="/Gestionar-Salarios" element={<GestionarSalarios />} />
          <Route path="/trabajadores-editar-salario/:idTrabajador" element={<EditarTrabajadorSalario />} />
          */}

          {/* Ruta para perfil */}
          <Route path="/perfil-crear" element={<CrearPerfil />} />

          {/* Rutas para clientes */}
          <Route path="/clientes" element={<IndexClientes />} />
          <Route path="/cliente-agregar" element={<AgregarCliente />} />
          <Route path="/cliente-editar/:cedula" element={<EditarCliente />} />

          {/* Rutas para Vehiculos */}
          <Route path="/vehiculos/Index" element={<IndexVehi />} />

          <Route path="/vehiculos/listarVehiculos" element={<ListarVehiculosPage />} />
          <Route path="/vehiculos/ListEditVehi" element={<ListarEditVehiculosPage />} />
          <Route path="/vehiculos/ListElimVehi" element={<ListarElimVehiculosPage />} />


          <Route path="/vehiculos/registrar" element={<AgregarVehiculo />} />
          <Route path="/vehiculos/editar/:idVehiculo" element={<EditarVehiculo />} />
          <Route path="/vehiculos/eliminar/:idVehiculo" element={<EliminarVehiculo />} />

          {/* Rutas para Admin */}
          <Route path="/admin/listarUsuarios" element={<ListarUsuariosPage/>} />
          <Route path="/admin/listarEditUsuarios" element={<ListarEditUsuariosPage/>} />
          <Route path="/admin/listarElimUsuarios" element={<ListarElimUsuariosPage/>} />


          <Route path="/admin/Index" element={<IndexAdmin />} />
          <Route path="/admin/registrar" element={<AgregarUsuario />} />
          <Route path="/admin/editar/:idUsuario" element={<EditarUsuario />} />
          <Route path="/admin/eliminar/:idUsuario" element={<EliminarUsuario />} />



        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
