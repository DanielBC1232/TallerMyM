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
          <Route path="/" element={<IndexInventario />} />

          {/* Rutas para inventario */}
          <Route path="/inventario-agregar" element={<Agregar />} />
          <Route path="/inventario" element={<IndexInventario />} />

          {/* Ruta para perfil */}
          <Route path="/perfil-crear" element={<CrearPerfil />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
