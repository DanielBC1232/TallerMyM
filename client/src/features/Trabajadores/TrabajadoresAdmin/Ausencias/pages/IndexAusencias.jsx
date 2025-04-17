//Agregar solcitud de vacaciones
//import React from "react";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "../styles/agregar.css";
// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListaTrabajadores = ({ formData, trigger }) => {
  const [datos, setDatos] = useState([]);
  
  useEffect(() => {
    const getTrabajadores = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/trabajadores/obtener-trabajadores/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDatos(data);
      } catch (error) {
        console.error("Error al obtener trabajadores:", error);
        
        if (error.response) {
          const { status } = error.response;
  
          if (status === 401) {
            Swal.fire("Advertencia", "Operación no autorizada", "warning");
            window.location.reload();
          } else if (status === 403) {
            Swal.fire("Autenticación", "Sesión expirada", "warning");
            localStorage.clear();
            window.location.href = "/login";
          } else {
            Swal.fire("Error", "Error al cargar los trabajadores", "error");
          }
        } else {
          Swal.fire("Error", "Problema de conexión con el servidor", "error");
        }
      }
    };
    
    getTrabajadores();
  }, [formData, trigger]);

  return (
    <div className="p-5">
      <h4 style={{ textAlign: "center" }}>Listado Trabajadores</h4>
      <br />

      <div className="mb-3 text-start">
        <Link to="/Lista-Ausencias" className="btn btn-primary">
          + Listado de Ausencias
        </Link>
      </div>
      <table className="table table-hover table-striped shadow-sm">
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Cédula</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((trabajador, index) => (
            <tr key={index}>
              <td>{trabajador.nombreCompleto}</td>
              <td>{trabajador.cedula}</td>

              <td>
                <button className="btn btn-secondary btn-sm text-white">
                  <Link
                    to={`/Ausencias-Agregar/${trabajador.idTrabajador}`} // implementar backend
                    className="btn-link"
                  >
                    Registrar Ausencia
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="btn btn-secondary btn-sm text-white"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          borderColor: "#d1d5db",
          padding: "9px 10px",
          fontSize: "18px",
          margin: 10,
        }}
      >
        <Link
          to={`/trabajadores-admin`}
          className="text-white text-decoration-none"
        >
          Regresar
        </Link>
      </button>
    </div>
  );
};

export default ListaTrabajadores;
