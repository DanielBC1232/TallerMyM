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
    <div className="bg-darkest p-4 rounded-4" style={{minHeight: "88vh"}}>

       <div className="mb-3 d-flex gap-4">

          <Link to="/AddSolicitudVacacion" className="btn btn-primary text-white rounded-5 d-flex align-items-center justify-content-center gap-1">
            <FaPlane size={24} style={{ color: "#fc8c03",margin:"5px" }} />
            Solicitar Vacaciones
          </Link>
          </div>
        
          <h2  style={{ color: 'white' }}> Lista Trabajadores Activos</h2>
          <ListaTrabajadores />
       
    </div>
  );
};

export default IndexTrabajadores;
