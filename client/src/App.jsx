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

//vemtas
import IndexVentas from './features/ventas/pages/index.jsx'
import Cotizar from "./features/ventas/pages/cotizar.jsx";

//flujo
import IndexFlujo from "./features/flujo/pages/Index.jsx";
import AgregarOrden from './features/flujo/pages/Agregar.jsx';

import CrearPerfil from "./features/perfil/pages/CrearPerfil";

//imports clientes
import IndexCli from "./features/clientes/pages/IndexCli.jsx";
import ListarClientesPage from "./features/clientes/pages/ListarClientesPage.jsx";
import ListarEditClientesPage from "./features/clientes/pages/ListarEditClientePage.jsx";
import ListarElimClientesPage from "./features/clientes/pages/ListarElimClientePage.jsx";

import AgregarCliente from "./features/clientes/pages/AgregarCli.jsx";
import EditarCliente from "./features/clientes/pages/EditarCli.jsx";
import EliminarCliente from "./features/clientes/pages/Eliminar.jsx";



const App = () => {
  return (
    <div className="app">
      <Header />

      <main style={{ minHeight: "95vh" }}>

        {/* ******************
          
          Usar el url:
          /[modulo]-acción 

          ****************** */}

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

          {/* Ventas */}
          <Route path="/ventas" element={<IndexVentas />} />
          <Route path="/ventas-cotizar" element={<Cotizar />} />

          {/* Ruta para perfil */}
          <Route path="/perfil-crear" element={<CrearPerfil />} />

          {/* Rutas para clientes */}
          <Route path="/clientes/Index" element={<IndexCli />} />
          <Route path="/clientes/obtenerclientes" element={<ListarClientesPage />} />
          <Route path="/clientes/list-edit" element={<ListarEditClientesPage />} />
          <Route path="/clientes/list-elim" element={<ListarElimClientesPage />} />

          <Route path="/clientes/registrar" element={<AgregarCliente />} />
          <Route path="/clientes/editar/:cedula" element={<EditarCliente />} />
          <Route path="/clientes/eliminar/:cedula" element={<EliminarCliente />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
