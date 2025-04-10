import React, { useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Grid, Row, Col } from "rsuite";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ModalAgregarCliente = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    nombre: "",
    cedula: "",
    apellido: "",
    correo: "",
    telefono: "",
  });

  // Validación de campos vacíos
  const validateForm = () => {
    const { nombre, cedula, apellido, correo, telefono } = formValue;
    if (!nombre || !cedula || !apellido || !correo || !telefono) {
      Swal.fire("Advertencia", "Todos los campos son obligatorios", "warning");
      return false;
    }
    return true;
  };

  // Manejar cambios de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/clientes/registrar`,
        formValue,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Añadir JWT en el header
          },
        }
      );
    
      // Si la inserción es exitosa (HTTP 200 o 201)
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Éxito",
          text: "Cliente registrado exitosamente",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        });
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Operación no Autorizada",
            showConfirmButton: false,
          });
          window.location.reload(); // Recarga la página si no está autorizado
        } else if (error.response.status === 403) {
          Swal.fire({
            icon: "warning",
            title: "Autenticación",
            text: "Sesión expirada",
            showConfirmButton: false,
          });
          localStorage.clear();
          window.location.href = "/login"; // Redirige al login si la sesión ha expirado
        } else if (error.response.status === 409) {
          // Si el error es 409, es porque la cédula ya está registrada
          Swal.fire("Advertencia", "La cédula ya está registrada", "warning");
        } else {
          // En caso de otros errores
          console.error(error);
          Swal.fire("Error", "Hubo un error al registrar el Cliente", "error");
        }
      } else {
        // En caso de no recibir respuesta (error de red, etc.)
        console.error(error);
        Swal.fire("Error", "Hubo un problema con la conexión", "error");
      }
    }
    
  };

  // Abre el modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        style={{ minWidth: "80px", maxWidth: "350px" }}
        className="btn btn-secondary btn-sm text-white"
        onClick={handleOpen}
      >
        Registrar Cliente
      </Button>

      <Modal open={open} onClose={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Registrar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Grid fluid>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formValue.nombre}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cédula:</label>
                    <input
                      type="text"
                      name="cedula"
                      value={formValue.cedula}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      required
                    />
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label className="form-label">Apellido:</label>
                    <input
                      type="text"
                      name="apellido"
                      value={formValue.apellido}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo:</label>
                    <input
                      type="email"
                      name="correo"
                      value={formValue.correo}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      required
                    />
                  </div>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label className="form-label">Teléfono:</label>
                    <input
                      type="text"
                      name="telefono"
                      value={formValue.telefono}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      required
                    />
                  </div>
                </Col>
              </Row>
            </Grid>

            <div className="d-flex justify-content-end mt-4">
              <Button appearance="primary" type="submit">
                Registrar Cliente
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="default">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAgregarCliente;
