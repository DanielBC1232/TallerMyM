import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Row, Col } from "rsuite";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const EditarJustificacion = () => {
  const navigate = useNavigate();
  const { idJustificacion } = useParams();
  const [loading, setLoading] = useState(true);
  const [ausenciaInfo, setAusenciaInfo] = useState(null);

  // Estado del formulario
  const [formData, setFormData] = useState({
    idAusencia: "",
    motivo: "",
    estado: "Pendiente",
  });

  // Estados posibles para la justificación
  const estadosJustificacion = ["Pendiente", "Aprobada", "Rechazada"];

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        setLoading(true);

        // 1. Cargar datos de la justificación
        if (idJustificacion) {
          const resJustificacion = await axios.get(
            `${BASE_URL}/trabajadores/obtener-justificacion/${idJustificacion}`
          );

          if (resJustificacion.data) {
            const justificacion = resJustificacion.data;
            setFormData({
              idAusencia: justificacion.idAusencia.toString(),
              motivo: justificacion.motivo,
              estado: justificacion.estado,
            });

            // 2. Cargar información de la ausencia relacionada
            const resAusencia = await axios.get(
              `${BASE_URL}/trabajadores/obtener-ausencia/${justificacion.idAusencia}`
            );
            setAusenciaInfo(resAusencia.data);
          }
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        mostrarError("Error al cargar los datos de la justificación");
        navigate("/lista-justificaciones");
      } finally {
        setLoading(false);
      }
    };

    cargarDatosIniciales();
  }, [idJustificacion, navigate]);

  // Mostrar error
  const mostrarError = (mensaje) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: mensaje,
      confirmButtonText: "OK",
    });
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validar formulario
  const validarFormulario = () => {
    if (!formData.idAusencia) {
      mostrarError("El ID de ausencia es requerido");
      return false;
    }
    if (!formData.motivo.trim()) {
      mostrarError("Ingrese el motivo de la justificación");
      return false;
    }
    if (formData.motivo.length > 255) {
      mostrarError("El motivo no puede exceder 255 caracteres");
      return false;
    }
    return true;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      setLoading(true);

      // Preparar datos para enviar
      const datosActualizados = {
        idAusencia: parseInt(formData.idAusencia, 10),
        motivo: formData.motivo,
        estado: formData.estado,
      };

      // Enviar actualización
      const response = await axios.put(
        `${BASE_URL}/trabajadores/delete-justificacion/${idJustificacion}`,
        datosActualizados,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Mostrar éxito
      Swal.fire({
        icon: "success",
        title: "¡Actualizado!",
        text: "La justificación se actualizó correctamente",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/lista-justificaciones");
      });
    } catch (error) {
      console.error("Error al actualizar:", error);

      let mensajeError = "Error al actualizar la justificación";
      if (error.response) {
        if (error.response.data?.error) {
          mensajeError = error.response.data.error;
        } else if (error.response.data?.message) {
          mensajeError = error.response.data.message;
        }
      }

      mostrarError(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Editar Justificación</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <Grid fluid>
              <Row>
                <Col xs={24} md={12}>
                  {/* Información de la ausencia relacionada */}
                  <div className="mb-3">
                    <label className="form-label">Ausencia relacionada</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      value={
                        ausenciaInfo
                          ? `ID: ${ausenciaInfo.idAusencia} - ${new Date(
                              ausenciaInfo.fechaAusencia
                            ).toLocaleDateString()}`
                          : `ID: ${formData.idAusencia}`
                      }
                      readOnly
                    />
                    <input
                      type="hidden"
                      name="idAusencia"
                      value={formData.idAusencia}
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
                      disabled={loading}
                    >
                      {estadosJustificacion.map((estado) => (
                        <option key={estado} value={estado}>
                          {estado}
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
                      rows="5"
                      value={formData.motivo}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      maxLength="255"
                    />
                    <small className="text-muted">Máximo 255 caracteres</small>
                  </div>
                </Col>
              </Row>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/lista-justificaciones")}
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
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
                  )}
                </button>
              </div>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarJustificacion;
