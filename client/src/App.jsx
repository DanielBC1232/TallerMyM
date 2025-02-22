import "rsuite/dist/rsuite.min.css";
import "./styles/custom.css";
import "./styles/style.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";

import Index from './components/Index.jsx'
import Detalles from "./features/inventario/pages/Detalles";
import IndexInventario from "./features/inventario/pages/index";
import Editar from "./features/inventario/pages/Editar";
import Agregar from "./features/inventario/pages/Agregar";
import Solicitudes from "./features/inventario/pages/Solicitudes";

import CrearPerfil from "./features/perfil/pages/CrearPerfil";

//imports clientes

import AgregarCliente from "./features/clientes/pages/Agregar";
import ConsultarCliente from "./features/clientes/pages/Consulta";
import EditarCliente from "./features/clientes/pages/Editar";
import EliminarCliente from "./features/clientes/pages/Eliminar";
import AgregarVehiculoCliente from "./features/clientes/pages/AgregarVehiculo";
import EliminarVehiculoCliente from "./features/clientes/pages/EliminarVehiculo";

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

          {/* Ruta para perfil */}
          <Route path="/perfil-crear" element={<CrearPerfil />} />
          
          {/* Rutas para clientes */}
          <Route path="/clientes/registrar" element={<AgregarCliente />} />
          <Route path="/clientes/consulta" element={<ConsultarCliente />} />
          <Route path="/clientes/editar" element={<EditarCliente />} />
          <Route path="/clientes/eliminar" element={<EliminarCliente />} />
          <Route path="/clientes/agregar-vehiculo" element={<AgregarVehiculoCliente />} />
          <Route path="/clientes/eliminar-vehiculo" element={<EliminarVehiculoCliente />} />


        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
