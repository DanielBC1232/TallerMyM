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
        const { data, status } = await axios.get(
          `${BASE_URL}/trabajadores/obtener-trabajadores/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (status === 200) {
          setDatos(data);
        } else {
          Swal.fire({
            icon: "error",
            title: "No se pudo obtener la lista de trabajadores",
            showConfirmButton: true,
          });
        }
      } catch (error) {
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
            console.error("Error al obtener trabajadores:", error);
            Swal.fire("Error", "Hubo un error al obtener los trabajadores", "error");
          }
        } else {
          console.error("Error de red:", error);
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
        <Link to="/amonestaciones-lista" className="btn btn-primary">
          + Listado Amonestaciones
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
                    to={`/amonestaciones-agregar/${trabajador.idTrabajador}`} // implementar backend
                    className="btn-link"
                  >
                    Generar Amonestacion
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
