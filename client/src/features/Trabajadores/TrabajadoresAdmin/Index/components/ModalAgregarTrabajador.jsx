import React, { useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Grid, Row, Col } from "rsuite";
import axios from "axios";
import { IoPersonAdd } from "react-icons/io5";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ModalAgregarTrabajador = () => {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    nombreCompleto: "",
    cedula: "",
    salario: "",
    seguroSocial: "",
  });

  // Validación de campos vacíos
  const validateForm = () => {
    const { nombreCompleto, cedula, salario, seguroSocial } = formValue;
    if (!nombreCompleto || !cedula || !salario || !seguroSocial) {
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
        `${BASE_URL}/trabajadores/agregar-trabajador`,
        formValue,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Si la inserción es exitosa (HTTP 200 o 201)
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Éxito",
          text: "Trabajador registrado exitosamente",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        });
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Si el error es 409, es porque la cédula ya existe
        Swal.fire("Advertencia", "La cédula ya está registrada", "warning");
      } else {
        // En caso de otros errores
        console.error(error);
        Swal.fire("Error", "Hubo un error al registrar el Trabajador", "error");
      }
    }
  };

  // Abre el modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        className="btn btn-primary text-white rounded-5 d-flex align-items-center justify-content-center gap-1"
        onClick={handleOpen}>
        <IoPersonAdd size={20} />
        Registrar-Trabajador
      </button>

      <Modal open={open} onClose={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Registrar Trabajador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="p-3">
            <Row gutter={16} className="d-flex justify-content-center">
              <Col xs={24} md={12}>
                <div className="mb-3">
                  <label className="form-label">Nombre Completo:</label>
                  <input
                    type="text"
                    name="nombreCompleto"
                    value={formValue.nombreCompleto}
                    onChange={handleChange}
                    className="form-control rounded-5"
                    required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cédula:</label>
                  <input
                    type="text"
                    name="cedula"
                    value={formValue.cedula}
                    onChange={handleChange}
                    className="form-control rounded-5"
                    required />
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div className="mb-3">
                  <label className="form-label">Salario:</label>
                  <input
                    type="number"
                    name="salario"
                    value={formValue.salario}
                    onChange={handleChange}
                    className="form-control rounded-5"
                    step="0.01"
                    min="0"
                    required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Seguro Social:</label>
                  <input
                    type="text"
                    name="seguroSocial"
                    value={formValue.seguroSocial}
                    onChange={handleChange}
                    className="form-control rounded-5"
                    required />
                </div>
              </Col>
            </Row>
              <div className="d-flex justify-content-center row px-5 mt-5">
                <Button className="btn btn-primary text-white rounded-5 d-flex align-items-center justify-content-center gap-1" type="submit">
                  Registrar Trabajador
                </Button>
              </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAgregarTrabajador;
