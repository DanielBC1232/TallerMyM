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
      <Button
        style={{
          width:"300px",
          height: "100px",
          margin: "5px"
        }}
        className="btn btn-secondary btn-sm text-white"
        onClick={handleOpen}
      >
        <IoPersonAdd size={24} />
        Registrar-Trabajador
      </Button>

      <Modal open={open} onClose={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Registrar Trabajador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Grid fluid>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label className="form-label">Nombre Completo:</label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      value={formValue.nombreCompleto}
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
                    <label className="form-label">Salario:</label>
                    <input
                      type="number"
                      name="salario"
                      value={formValue.salario}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Seguro Social:</label>
                    <input
                      type="text"
                      name="seguroSocial"
                      value={formValue.seguroSocial}
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
                Registrar Trabajador
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

export default ModalAgregarTrabajador;
