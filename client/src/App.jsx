import "rsuite/dist/rsuite.min.css";
import "./styles/custom.css";
import "./styles/style.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";

import Detalles from "./features/inventario/pages/Detalles";
import IndexInventario from "./features/inventario/pages/Index";
import Editar from "./features/inventario/pages/Editar";
import Agregar from "./features/inventario/pages/Agregar";
import CrearPerfil from "./features/perfil/pages/CrearPerfil";

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
          <Route path="/" element={<CrearPerfil />} />

          {/* Rutas para inventario */}
          <Route path="/inventario-agregar" element={<Agregar />} />
          <Route path="/inventario" element={<IndexInventario />} />
          <Route path="/inventario-detalles/:idProducto" element={<Detalles />} />{/* :id para esperar recibir un id */}

          <Route path="/" element={<App />} />
          <Route path="/agregar" element={<Agregar />} />
          <Route path="/inventario" element={<IndexInventario />} />
          <Route path="/cliente/registrar" element={<AgregarCliente />} />
          <Route path="/cliente/consulta" element={<ConsultarCliente />} />
          <Route path="/cliente/editar" element={<EditarCliente />} />
          <Route path="/cliente/eliminar" element={<EliminarCliente />} />
          <Route path="/cliente/agregar-vehiculo" element={<AgregarVehiculoCliente />} />
          <Route path="/cliente/eliminar-vehiculo" element={<EliminarVehiculoCliente />} />

          {/* Ruta para perfil */}
          <Route path="/perfil-crear" element={<CrearPerfil />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
