import { Route, Routes } from "react-router-dom";
import React from "react";
import { Card, Text, Button, TagGroup, Tag } from "rsuite";
import { Link } from "react-router-dom";

import "../styles/style.css";

import { FaInbox } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaCarRear } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";

const Index = () => {
  return (
    <header className="masthead">
      <div className="container px-4 px-lg-5 h-100">
        <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-8 align-self-end">
            <h1 className="text-white font-weight-bolder">Confianza y precisión para tu vehículo</h1>
            <hr className="divider" />
          </div>
          <div className="col-lg-8 align-self-baseline">
            <p className="text-white-75 mb-5">Donde cada vehículo recibe el cuidado y la atención que necesita para seguir rodando con repuestos originales y de alta calidad, para asegurar que tu vehículo siempre funcione al máximo rendimiento, sin comprometer tu confianza.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Index;



/* Index viejo
const Index = () => {
  return (
    <div className="container mt-5 p-3">
      <div className="row gap-5 justify-content-center">

        <div className="col-sm-3 align-self-center">
          <Link to="/inventario" className="btn-link text-decoration-none">
            <Card width={300} direction="row" className="p-2">
              <Card.Header><FaInbox size={55} color="#005ba5" className="d-flex align-self-baseline" /></Card.Header>
              <Card.Body as="h4" className="d-flex align-self-baseline">Módulo Inventario</Card.Body>
            </Card>
          </Link>
        </div>

        <div className="col-sm-3 align-self-center">
          <Link to="/ventas" className="btn-link text-decoration-none">
            <Card width={300} direction="row" className="p-2">
              <Card.Header><FaShoppingCart size={55} color="#005ba5" className="d-flex align-self-baseline" /></Card.Header>
              <Card.Body as="h4" className="d-flex align-self-baseline">Módulo Ventas</Card.Body>
            </Card>
          </Link>
        </div>

        <div className="col-sm-3 align-self-center">
          <Link to="/perfil-crear" className="btn-link text-decoration-none">
            <Card width={300} direction="row" className="p-2">
              <Card.Header><MdAccountCircle size={55} color="#005ba5" className="d-flex align-self-baseline" /></Card.Header>
              <Card.Body as="h4" className="d-flex align-self-baseline">Módulo Administrativo</Card.Body>
            </Card>
          </Link>
        </div>

        <div className="col-sm-3 align-self-center">
          <Link to="/clientes/Index" className="btn-link text-decoration-none">
            <Card width={300} direction="row" className="p-2">
              <Card.Header><FaUserFriends size={55} color="#005ba5" className="d-flex align-self-baseline" /></Card.Header>
              <Card.Body as="h4" className="d-flex align-self-baseline">Módulo Clientes</Card.Body>
            </Card>
          </Link>
        </div>

        <div className="col-sm-3 align-self-center">
          <Link to="/trabajadores"
            className="btn-link text-decoration-none">
            <Card width={300} direction="row" className="p-2">
              <Card.Header><FaUserTie size={55} color="#005ba5" className="d-flex align-self-baseline" /></Card.Header>
              <Card.Body as="h4" className="d-flex align-self-baseline">Módulo Trabajadores</Card.Body>
            </Card>
          </Link>
        </div>

        <div className="col-sm-3 align-self-center">
          <Link className="btn-link text-decoration-none">
            <Card width={300} direction="row" className="p-2">
              <Card.Header><FaMoneyCheckDollar size={55} color="#005ba5" className="d-flex align-self-baseline" /></Card.Header>
              <Card.Body as="h4" className="d-flex align-self-baseline">Módulo Finanzas</Card.Body>
            </Card>
          </Link>
        </div>

        <div className="col-sm-3 align-self-center">
          <Link to="/vehiculos/Index" className="btn-link text-decoration-none">
            <Card width={300} direction="row" className="p-2">
              <Card.Header><FaMoneyCheckDollar size={55} color="#005ba5" className="d-flex align-self-baseline" /></Card.Header>
              <Card.Body as="h4" className="d-flex align-self-baseline">Vehiculos-Cliente</Card.Body>
            </Card>
          </Link>
        </div>

        <div className="col-sm-3 align-self-center">
          <Link to="/flujo" className="btn-link text-decoration-none">
            <Card width={300} direction="row" className="p-2">
              <Card.Header><FaCarRear size={55} color="#005ba5" className="d-flex align-self-baseline" /></Card.Header>
              <Card.Body as="h4" className="d-flex align-self-baseline">Control de Flujo</Card.Body>
            </Card>
          </Link>
        </div>

        <div className="col-sm-3 align-self-center">
          <Link className="btn-link text-decoration-none">
            <Card width={300} direction="row" className="p-2">
              <Card.Header><TbReport size={55} color="#005ba5" className="d-flex align-self-baseline" /></Card.Header>
              <Card.Body as="h4" className="d-flex align-self-baseline">Módulo Reportería</Card.Body>
            </Card>
          </Link>
        </div>

      </div>
    </div>
  );
};
export default Index;
*/