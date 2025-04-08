import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Row, Col } from "rsuite";
import "../styles/gtr.css";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;
const AgregarAmonestacion = () => {
  const navigate = useNavigate();
  const { idTrabajador } = useParams(); // Obtener el ID del trabajador desde los parámetros de la URL
  
  const [formData, setFormData] = useState({
    idTrabajador: idTrabajador,
    fechaAmonestacion: "",
    tipoAmonestacion: "",
    motivo: "",
    accionTomada: "",
  });

  const errorNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      axios
        .post(`${BASE_URL}/trabajadores/Insert-Amonestacion`, formData)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Trabajador actualizado correctamente",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/Gestionar-Amonest-Trab-List");
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error al actualizar trabajador",
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
  };

  const validarFormulario = () => {
    if (!formData.idTrabajador) {
      errorNotification('El ID del trabajador es requerido');
      return false;
    }
    if (!formData.fechaAmonestacion) {
      errorNotification('La fecha de amonestación es requerida');
      return false;
    }
    if (!formData.tipoAmonestacion) {
      errorNotification('El tipo de amonestación es requerido');
      return false;
    }
    if (!formData.motivo.trim()) {
      errorNotification('El motivo es requerido');
      return false;
    }
    return true;
  };
  

  const tiposAmonestacion = [
    "Verbal",
    "Escrita",
    "Suspensión",
    "Despido"
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="container main mx-auto p-5">
        <Grid fluid>
          <Row className="show-grid" gutter={16}>
            <Col
              xs={16}
              className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3"
            >
              <Row className="show-grid" gutter={16}>
                <Col xs={12} className="column">
                  <div className="mb-3">
                    <label htmlFor="idTrabajador" className="form-label">
                      idTrabajador *
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="idTrabajador"
                      name="idTrabajador"
                      value={formData.idTrabajador}
                      onChange={handleChange}
                      required
                      
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="fechaAmonestacion" className="form-label">
                      Fecha de Amonestación *
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="fechaAmonestacion"
                      name="fechaAmonestacion"
                      value={formData.fechaAmonestacion}
                      onChange={handleChange}
                      required
                     
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tipoAmonestacion" className="form-label">
                      Tipo de Amonestación *
                    </label>
                    <select
                      className="form-select"
                      id="tipoAmonestacion"
                      name="tipoAmonestacion"
                      value={formData.tipoAmonestacion}
                      onChange={handleChange}
                      required
                      
                    >
                      <option value="">Seleccione un tipo</option>
                      {tiposAmonestacion.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label htmlFor="motivo" className="form-label">
                      Motivo *
                    </label>
                    <textarea
                      className="form-control"
                      id="motivo"
                      name="motivo"
                      rows="3"
                      value={formData.motivo}
                      onChange={handleChange}
                      required
                     
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="accionTomada" className="form-label">
                      Acción Tomada
                    </label>
                    <textarea
                      className="form-control"
                      id="accionTomada"
                      name="accionTomada"
                      rows="3"
                      value={formData.accionTomada}
                      onChange={handleChange}
                      
                    />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      GUARDAR Amonestacion
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    </form>
  );
};

export default AgregarAmonestacion;
