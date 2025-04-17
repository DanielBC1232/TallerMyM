import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Grid, Row, Col } from "rsuite";

export const BASE_URL = import.meta.env.VITE_API_URL;

const EditarAusencia = () => {
  const navigate = useNavigate();
  const { idAusencia, idTrabajador } = useParams();
  const [loading, setLoading] = useState(true);

  const [trabajadores, setTrabajadores] = useState([]);//
  const [formData, setFormData] = useState({
    idTrabajador: idTrabajador || "",
    fechaAusencia: "",
    justificada: false
  });

  // Cargar datos iniciales
 useEffect(() => {
  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      const authConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      };

      const [resTrabajadores, resAusencia] = await Promise.all([
        axios.get(`${BASE_URL}/trabajadores/obtener-trabajadores`, authConfig),
        idAusencia && axios.get(`${BASE_URL}/trabajadores/obtener-ausencia/${idAusencia}`, authConfig)
      ]);

      setTrabajadores(resTrabajadores.data);

      if (resAusencia?.data) {
        const ausencia = resAusencia.data;
        setFormData({
          idTrabajador: ausencia.idTrabajador.toString(),
          fechaAusencia: ausencia.fechaAusencia.split("T")[0],
          justificada: ausencia.justificada
        });
      }

    } catch (error) {
      console.error("Error al cargar datos:", error);
      
      if (error.response) {
        const { status } = error.response;
        
        if (status === 401) {
          Swal.fire("Advertencia", "Operación no autorizada", "warning");
          window.location.reload();
          return;
        } else if (status === 403) {
          Swal.fire("Autenticación", "Sesión expirada", "warning");
          localStorage.clear();
          window.location.href = "/login";
          return;
        }
      }
      
      showAlert("Error al cargar datos iniciales", "error");
      navigate("/Lista-Ausencias");
    } finally {
      setLoading(false);
    }
  };

  cargarDatos();
}, [idAusencia, idTrabajador, navigate]);
  //Fin UseEffect

  // Función unificada para alertas
  const showAlert = (text, icon = "error", timer = 2000) => {
    Swal.fire({
      text,
      icon,
      timer,
      showConfirmButton: icon === "error"
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validarFormulario = () => {
    if (!formData.fechaAusencia) {
      showAlert("Ingrese la fecha de ausencia", "error");
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
        justificada: formData.justificada
      };
  
      const response = await axios.put(
        `${BASE_URL}/trabajadores/update-ausencia/${idAusencia}`,
        datosActualizados,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
  
      showAlert("¡Ausencia actualizada correctamente!", "success");
      navigate("/Lista-Ausencias");
  
    } catch (error) {
      console.error("Error al actualizar ausencia:", error);
      
      if (error.response) {
        const { status } = error.response;
        
        if (status === 401) {
          showAlert("Operación no autorizada", "warning");
          window.location.reload();
          return;
        } else if (status === 403) {
          showAlert("Sesión expirada", "warning");
          localStorage.clear();
          window.location.href = "/login";
          return;
        }
      }
      
      const mensaje = error.response?.data?.message || "Error al actualizar la ausencia";
      showAlert(mensaje, "error");
      
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
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
                  {/* Selector de trabajador */}
                  <div className="mb-3">
                    <label htmlFor="idTrabajador" className="form-label">
                      Trabajador *
                    </label>
                    <select
                      className="form-select"
                      id="idTrabajador"
                      name="idTrabajador"
                      value={formData.idTrabajador}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    >
                      <option value="">Seleccione trabajador</option>
                      {trabajadores.map(t => (
                        <option key={t.idTrabajador} value={t.idTrabajador}>
                          {t.nombreCompleto}
                        </option>
                      ))}
                    </select>
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
                      disabled={loading}
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
                      disabled={loading}
                    />
                    <label className="form-check-label" htmlFor="justificada">
                      Justificada
                    </label>
                  </div>

                  {formData.justificada && (
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>
                      Esta ausencia está marcada como justificada
                    </div>
                  )}
                </Col>
              </Row>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/Lista-Ausencias")}
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