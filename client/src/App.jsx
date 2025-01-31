import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Detalles from "./features/inventario/pages/Detalles";
import IndexInventario from "./features/inventario/pages";
import Editar from "./features/inventario/pages/Editar";
import Agregar from "./features/inventario/pages/Agregar";

import "rsuite/dist/rsuite.min.css";

import "./styles/custom.css";
import "./styles/style.css";

const App = () => {
  return (
    
    <div className="app">
      <Header />
      <main style={{ minHeight: "95vh" }}>
        {/*
        <IndexInventario />
        <Detalles />
        <Agregar/>

        */}
        <Agregar/>


      </main>
      <Footer />
    </div>
  );
};

export default App;
