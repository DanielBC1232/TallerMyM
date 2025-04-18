import React, { useState, useEffect } from "react";
import ListaTrabajadores from "../components/ListaTrabajadores.jsx";
import axios from "axios";
import { FaPlane } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { Button, Grid, Row, Col, FlexboxGrid, Divider } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import "../styles/gtr.css";

export const BASE_URL = import.meta.env.VITE_API_URL;

const idUsuario = localStorage.getItem("idUsuario");

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
    setTrigger(prev => !prev);
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
          

        <Button
          className="btn btn-sm btn-secondary text-white"
          style={{
            width: "300px",
            height: "100px",
            margin: "5px",
          }}>
          <Link to="/AddSolicitudVacacion" className="btn-link">
            <FaPlane size={24} style={{ color: "#fc8c03",margin:"5px" }} />
            Solicitar Vacaciones
          </Link>
        </Button>

     

    


      </nav>

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
