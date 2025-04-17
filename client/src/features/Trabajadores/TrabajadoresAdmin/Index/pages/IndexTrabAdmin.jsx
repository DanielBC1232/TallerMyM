import React, { useState, useEffect } from "react";
import ListaTrabajadores from "../components/ListaTrabajadores"
import axios from "axios";
import { Button, Grid, Row, Col, FlexboxGrid, Divider } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import "../styles/gtr.css";
import { HiDocumentAdd } from "react-icons/hi";
import { LuListTodo } from "react-icons/lu";
import { FaPlane } from "react-icons/fa";
import ModalAgregarTrabajador from "../components/ModalAgregarTrabajador";
//import ModalAgregarAmonestacion from "../../TrabajadoresAdmin/components/ModalAgregarAmonestacion";

export const BASE_URL = import.meta.env.VITE_API_URL;

const IndexTrabajadores = () => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes("salario") ? Number(value) : value,
    });
  };

  const [trigger, setTrigger] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTrigger((prev) => !prev);
  };

  return (
    <div className="grid-container">
      <nav
        className="sidebar p-4 rounded-3 shadow-sm" style={{
          Width: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
        }}>
          
        <ModalAgregarTrabajador/>

        <Button
          className="btn btn-sm btn-secondary text-white"
          style={{
            width: "300px",
            height: "100px",
            margin: "5px",
          }}>
          <Link to="/index-amonestaciones" className="btn-link">
            <HiDocumentAdd size={24} style={{ color: "#fc8c03" }} />
            Generar Amonestación
          </Link>
        </Button>

        <Button
          className="btn btn-sm btn-secondary text-white"
          style={{
            width: "300px",
            height: "100px",
            margin: "5px",
          }}>
          <Link to="/Ausencias-Index" className="btn-link">
            <LuListTodo size={24} style={{ color: "#62fc03",margin:"5px" }} />
            Registrar Ausencias
          </Link>
        </Button>

        <Button
          className="btn btn-sm btn-secondary text-white"
          style={{
            width: "300px",
            height: "100px",
            margin: "5px",
          }}>
          <Link to="/Vacaciones-Index" className="btn-link">
            <FaPlane size={24} style={{ color: "#7db5fa",margin:"5px" }} />
            Vacaciones
          </Link>
        </Button>


      </nav>

          {/*--Lista Trabajadores Activos--*/}
      <div className="main rounded-3">
        <div className="article-scroll">
          <h2>Lista Trabajadores Activos</h2>
          <ListaTrabajadores />
        </div>
      </div>

    </div>
  );
};

export default IndexTrabajadores;
