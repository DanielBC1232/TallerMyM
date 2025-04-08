import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Row, Col } from "rsuite";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const AgregarJustificacion = () => {
  const navigate = useNavigate();
  const { idAusencia } = useParams(); // Obtenemos el idAusencia de la URL
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    idAusencia: parseInt(idAusencia, 10),
    motivo: "",
    estado: "Pendiente", // Valor por defecto
  });
 

  // Estados posibles para la justificación


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


  const estadosJustificacion = ["Pendiente", "Aprobada", "Rechazada"];
  const validarFormulario = () => {
    if (!formData.idAusencia) {
      errorNotification("El ID de ausencia es requerido");
      return false;
    }
    if (!formData.motivo.trim()) {
      errorNotification("El motivo es requerido");
      return false;
    }
    if (formData.motivo.length > 255) {
      errorNotification("El motivo no puede exceder 255 caracteres");
      return false;
    }
    return true;
  };

  //------------Envio formulario
  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();

    if (validarFormulario()) {
      axios
        
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Trabajador actualizado correctamente",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/List-Ausencias-Justificaciones");
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
  //----------------Envio formulario

  return (
    <form onSubmit={handleSubmit}>
      <div className="container main mx-auto p-5">
        <Grid fluid>
          <Row className="show-grid" gutter={16}>
            <Col
              xs={16}
              className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3"
            >
              <h3>Agregar Justificación de Ausencia</h3>

              <Row className="show-grid" gutter={16}>
                <Col xs={24}>
                  <div className="mb-3">
                    <label htmlFor="idAusencia" className="form-label">
                      ID de Ausencia *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="idAusencia"
                      name="idAusencia"
                      value={formData.idAusencia}
                      readOnly
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="estado" className="form-label">
                      Estado *
                    </label>
                    <select
                      className="form-select"
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleChange}
                      required
                    >
                      {estadosJustificacion.map((estado) => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="motivo" className="form-label">
                      Motivo *
                    </label>
                    <textarea
                      className="form-control"
                      id="motivo"
                      name="motivo"
                      rows="5"
                      value={formData.motivo}
                      onChange={handleChange}
                      required
                      placeholder="Describa el motivo de la ausencia..."
                      maxLength="255"
                    />
                    <small className="text-muted">Máximo 255 caracteres</small>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate(-1)}
                      disabled={loading}
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Guardando...
                        </>
                      ) : (
                        "Guardar Justificación"
                      )}
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

export default AgregarJustificacion;
