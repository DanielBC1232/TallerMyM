import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BrowserRouter as Router, Link } from "react-router-dom";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListaTrabajadores = ({ formData, trigger }) => {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    const getTrabajadores = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/trabajadores/obtener-trabajadores/`
        );
        setDatos(data);
      } catch (error) {
        console.error("Error al obtener trabajadores:", error);
      }
    };
    getTrabajadores();
  }, [formData, trigger]);

 

  return (
    <div className="p-5">
      <h4 style={{ textAlign: "center" }}>Listado Trabajadores</h4>
      <br />
     
      <div className="mb-3 text-start">
        <Link to="/Lista-Amonest-Trab-List" className="btn btn-primary">
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
                    to={`/amonestaciones-agregar/${trabajador.idTrabajador}`}// implementar backend
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
    </div>
  );
};

export default ListaTrabajadores;
