import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Grid, Row, Col } from "rsuite";

export const BASE_URL = import.meta.env.VITE_API_URL;

const EditarAusencia = () => {
  const navigate = useNavigate();
  const { idAusencia, idTrabajador } = useParams();
  const [loading, setLoading] = useState(true);
  const [trabajadorInfo, setTrabajadorInfo] = useState(null);

  const [formData, setFormData] = useState({
    idTrabajador: idTrabajador || "",
    fechaAusencia: "",
    justificada: false,
  });

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        setLoading(true);

        // 1. Cargar datos del trabajador
        if (idTrabajador) {
          const resTrabajador = await axios.get(
            `${BASE_URL}/trabajadores/obtener-trabajador/${idTrabajador}`
          );
          setTrabajadorInfo(resTrabajador.data);
        }

        // 2. Cargar datos de la ausencia
        if (idAusencia) {
          const resAusencia = await axios.get(
            `${BASE_URL}/trabajadores/obtener-ausencia/${idAusencia}`
          );

          if (resAusencia.data) {
            const ausencia = resAusencia.data;
            setFormData({
              idTrabajador: ausencia.idTrabajador.toString(),
              fechaAusencia: ausencia.fechaAusencia.split("T")[0],
              justificada: ausencia.justificada,
            });
          }
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        mostrarError("Error al cargar los datos iniciales");
        navigate("/Lista-Ausencia-Trab-List");
      } finally {
        setLoading(false);
      }
    };

    cargarDatosIniciales();
  }, [idAusencia, idTrabajador, navigate]);

  const mostrarError = (mensaje) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: mensaje,
      confirmButtonText: "OK",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validarFormulario = () => {
    if (!formData.fechaAusencia) {
      mostrarError("Ingrese la fecha de ausencia");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      setLoading(true);

      const datosActualizados = {
        idTrabajador: parseInt(formData.idTrabajador, 10),
        fechaAusencia: new Date(formData.fechaAusencia).toISOString(),
        justificada: formData.justificada,
      };

      await axios.put(
        `${BASE_URL}/trabajadores/update-ausencia/${idAusencia}`,
        datosActualizados,
        { headers: { "Content-Type": "application/json" } }
      );

      Swal.fire({
        icon: "success",
        title: "¡Actualizado!",
        text: "La ausencia se actualizó correctamente",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/Lista-Ausencia-Trab-List");
      });
    } catch (error) {
      console.error("Error al actualizar:", error);
      const mensajeError =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Error al actualizar la ausencia";
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
          <h2 className="mb-0">Editar Ausencia</h2>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <Grid fluid>
              <Row>
                <Col xs={24} md={12}>
                  {/* Campo de trabajador (solo lectura) */}
                  <div className="mb-3">
                    <label className="form-label">Trabajador</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      value={
                        trabajadorInfo
                          ? `${trabajadorInfo.nombreCompleto} `  : `ID: ${formData.idTrabajador}`
                      }
                      readOnly
                    />
                    <input
                      type="hidden"
                      name="idTrabajador"
                      value={formData.idTrabajador}
                    />
                  </div>

                  {/* Campo de fecha */}
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
                      disabled={loading}
                    />
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  {/* Checkbox de justificación */}
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="justificada"
                      name="justificada"
                      checked={formData.justificada}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label className="form-check-label" htmlFor="justificada">
                      Justificada
                    </label>
                  </div>

                  {formData.justificada && (
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      Esta ausencia está marcada como justificada.
                      <br />
                      <Link
                        to={`/justificacion/${idAusencia}`}
                        className="alert-link"
                      >
                        Ver detalles de la justificación
                      </Link>
                    </div>
                  )}
                </Col>
              </Row>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/Lista-Ausencia-Trab-List")}
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

export default EditarAusencia;
