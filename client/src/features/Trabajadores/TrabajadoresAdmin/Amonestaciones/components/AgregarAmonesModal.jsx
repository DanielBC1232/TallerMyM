import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";

export const BASE_URL = import.meta.env.VITE_API_URL;

const ModalAmonestacion = ({ isOpen, onClose, idTrabajador, onSuccess }) => {
  const [nombreTrabajador, setNombreTrabajador] = useState("");
  const [formData, setFormData] = useState({
    idTrabajador: idTrabajador,
    fechaAmonestacion: "",
    tipoAmonestacion: "",
    motivo: "",
    accionTomada: "",
  });

  // Resetear formulario cuando se abre/cierra el modal
  useEffect(() => {
    if (isOpen) {
      if (idTrabajador) {
        axios
          .get(`${BASE_URL}/trabajadores/obtener-trabajador/${idTrabajador}`)
          .then((res) => {
            setNombreTrabajador(res.data.nombreCompleto);
            setFormData(prev => ({ ...prev, idTrabajador }));
          })
          .catch((err) => console.error("Error cargando trabajador", err));
      }
    } else {
      // Limpiar el formulario al cerrar
      setFormData({
        idTrabajador: idTrabajador,
        fechaAmonestacion: "",
        tipoAmonestacion: "",
        motivo: "",
        accionTomada: "",
      });
    }
  }, [isOpen, idTrabajador]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validarFormulario = () => {
    if (!formData.fechaAmonestacion || !formData.tipoAmonestacion || !formData.motivo.trim()) {
      Swal.fire("Error", "Por favor, completa todos los campos requeridos", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      await axios.post(`${BASE_URL}/trabajadores/Insert-Amonestacion`, formData);
      Swal.fire("Éxito", "Amonestación guardada correctamente", "success");
      onSuccess(); // Refrescar lista
      onClose(); // Cerrar modal
    } catch (error) {
      console.error("Error al guardar amonestación:", error);
      Swal.fire("Error", "No se pudo guardar la amonestación", "error");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Agregar Amonestación</Modal.Title>
      </Modal.Header>
      
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Trabajador</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={nombreTrabajador} 
                  disabled 
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Fecha *</label>
                <input
                  type="date"
                  className="form-control"
                  name="fechaAmonestacion"
                  value={formData.fechaAmonestacion}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Tipo *</label>
                <select
                  className="form-select"
                  name="tipoAmonestacion"
                  value={formData.tipoAmonestacion}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione</option>
                  {["Verbal", "Escrita", "Suspensión", "Despido"].map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Motivo *</label>
                <textarea
                  className="form-control"
                  name="motivo"
                  rows={3}
                  value={formData.motivo}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Acción Tomada</label>
                <textarea
                  className="form-control"
                  name="accionTomada"
                  rows={3}
                  value={formData.accionTomada}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAmonestacion;