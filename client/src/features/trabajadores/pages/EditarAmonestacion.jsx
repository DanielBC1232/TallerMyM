import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Row, Col } from 'rsuite';

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const EditarAmonestacion = () => {
  const navigate = useNavigate();
  const { idAmonestacion } = useParams();
  const [loading, setLoading] = useState(true);
  const [trabajadores, setTrabajadores] = useState([]);
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    idTrabajador: '',
    fechaAmonestacion: '',
    tipoAmonestacion: '',
    motivo: '',
    accionTomada: ''
  });

  // Tipos de amonestación
  const tiposAmonestacion = [
    "Verbal",
    "Escrita",
    "Suspensión",
    "Despido"
  ];

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        setLoading(true);
        
      
        
        // 2. Cargar datos de la amonestación
        if (idAmonestacion) {
          const resAmonestacion = await axios.get(`${BASE_URL}/trabajadores/obtenerAmonestacion/${idAmonestacion}`
          );
          
          if (resAmonestacion.data) {
            const amonestacion = resAmonestacion.data;
            setFormData({
                idTrabajador: amonestacion.idTrabajador.toString(),
                fechaAmonestacion: amonestacion.fechaAmonestacion.split('T')[0],
                tipoAmonestacion: amonestacion.tipoAmonestacion,
                motivo: amonestacion.motivo,
                accionTomada: amonestacion.accionTomada || ''
            });
          }
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        mostrarError('Error al cargar los datos iniciales');
        navigate('/amonestaciones');
      } finally {
        setLoading(false);
      }
    };

    cargarDatosIniciales();
  }, [idAmonestacion, navigate]);

  // Mostrar error
  const mostrarError = (mensaje) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonText: 'OK'
    });
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validar formulario
  const validarFormulario = () => {
    if (!formData.idTrabajador) {
      mostrarError('Seleccione un trabajador');
      return false;
    }
    if (!formData.fechaAmonestacion) {
      mostrarError('Ingrese la fecha de amonestación');
      return false;
    }
    if (!formData.tipoAmonestacion) {
      mostrarError('Seleccione el tipo de amonestación');
      return false;
    }
    if (!formData.motivo.trim()) {
      mostrarError('Ingrese el motivo de la amonestación');
      return false;
    }
    return true;
  };

  // Enviar formulario-------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;
    
    try {
      setLoading(true);
      
      // Preparar datos para enviar
      const datosActualizados = {
        idTrabajador: parseInt(formData.idTrabajador, 10),
        fechaAmonestacion: new Date(formData.fechaAmonestacion).toISOString(),
        tipoAmonestacion: formData.tipoAmonestacion,
        motivo: formData.motivo,
        accionTomada: formData.accionTomada || null
      };

      // Enviar actualización
      const response = await axios.put(
        `${BASE_URL}/trabajadores/Edit-Amonestacion/${idAmonestacion}`,
        datosActualizados,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Mostrar éxito
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'La amonestación se actualizó correctamente',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/Lista-Amonest-Trab-List');
      });
      
    } catch (error) {
      console.error('Error al actualizar:', error);
      
      let mensajeError = 'Error al actualizar la amonestación';
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
// Enviar formulario-------------

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
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
          <h2 className="mb-0">Editar Amonestación</h2>
        </div>
        
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <Grid fluid>
              <Row>
                <Col xs={24} md={12}>
                  
                <div className="mb-3">
                    <label htmlFor="idTrabajador" className="form-label">
                    idTrabajador  *
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="idTrabajador"
                      name="idTrabajador"
                      value={formData.idTrabajador}
                      onChange={handleChange}
                      required
                      disabled={loading}
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
                      disabled={loading}
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
                      disabled={loading}
                    >
                      <option value="">Seleccione un tipo</option>
                      {tiposAmonestacion.map(tipo => (
                        <option key={tipo} value={tipo}>{tipo}</option>
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
                      disabled={loading}
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
                      disabled={loading}
                    />
                  </div>
                </Col>
              </Row>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/Lista-Amonest-Trab-List')}
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
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      Guardando...
                    </>
                  ) : 'Guardar Cambios'}
                </button>
              </div>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarAmonestacion;