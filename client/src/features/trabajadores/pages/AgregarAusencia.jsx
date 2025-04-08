import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Row, Col } from "rsuite";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const AgregarAusencia = () => {
  const navigate = useNavigate();
  const { idTrabajador } = useParams();

  const [formData, setFormData] = useState({
    idTrabajador: idTrabajador || "",
    fechaAusencia: "",
    justificada: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const errorNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const validarFormulario = () => {
    if (!formData.idTrabajador) {
      errorNotification("El ID del trabajador es requerido");
      return false;
    }
    if (!formData.fechaAusencia) {
      errorNotification("La fecha de ausencia es requerida");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      axios
        .post(`${BASE_URL}/trabajadores/Insert-Ausencia`, formData)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Ausencia registrada correctamente",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/Gestionar-Ausencias-Trab-List");
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error al registrar ausencia",
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container main mx-auto p-5">
        <Grid fluid>
          <Row className="show-grid" gutter={16}>
            <Col
              xs={16}
              className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3"
            >
              <h3>Registrar Nueva Ausencia</h3>

              <Row className="show-grid" gutter={16}>
                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label htmlFor="idTrabajador" className="form-label">
                      ID Trabajador *
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
                    <label htmlFor="fechaAusencia" className="form-label">
                      Fecha de Ausencia *
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="fechaAusencia"
                      name="fechaAusencia"
                      value={formData.fechaAusencia}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="justificada"
                      name="justificada"
                      checked={formData.justificada}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="justificada">
                      Justificada
                    </label>
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      GUARDAR Ausencia
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

export default AgregarAusencia;
