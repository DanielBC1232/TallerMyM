import React, { useState } from "react";
import Swal from "sweetalert2";
import SelectClientes from "../../clientes/components/SelectClientes";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Grid, Row, Col } from "rsuite";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ModalAgregarVehiculo = () => {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    placaVehiculo: "",
    modeloVehiculo: "",
    marcaVehiculo: "",
    annoVehiculo: "",
    tipoVehiculo: "",
    idCliente: "",
  });

  const navigate = useNavigate();

  // Validación de campos vacíos
  const validateForm = () => {
    const { placaVehiculo, modeloVehiculo, marcaVehiculo, annoVehiculo, tipoVehiculo, idCliente } = formValue;
    if (!placaVehiculo || !modeloVehiculo || !marcaVehiculo || !annoVehiculo || !tipoVehiculo || !idCliente) {
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
      const response = await axios.post(`${BASE_URL}/vehiculos/registrar`, formValue, {
        headers: { "Content-Type": "application/json" },
      });

      // Si la inserción es exitosa (HTTP 200 o 201)
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Éxito",
          text: "Vehículo registrado exitosamente",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        });
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire("Error", "La placa del vehículo ya está registrada", "warning");
      } else {
        console.error(error);
        Swal.fire("Error", "Hubo un error al registrar el Vehículo", "error");
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
        Registrar Vehículo
      </Button>

      <Modal open={open} onClose={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Registrar Vehículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Grid fluid>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label className="form-label">Placa Vehículo:</label>
                    <input
                      type="text"
                      name="placaVehiculo"
                      value={formValue.placaVehiculo}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Modelo del Vehículo:</label>
                    <input
                      type="text"
                      name="modeloVehiculo"
                      value={formValue.modeloVehiculo}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      required
                    />
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label className="form-label">Marca del Vehículo:</label>
                    <input
                      type="text"
                      name="marcaVehiculo"
                      value={formValue.marcaVehiculo}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Año del Vehículo:</label>
                    <input
                      type="text"
                      name="annoVehiculo"
                      value={formValue.annoVehiculo}
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
                    <label className="form-label">Tipo de Vehículo:</label>
                    <input
                      type="text"
                      name="tipoVehiculo"
                      value={formValue.tipoVehiculo}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      required
                    />
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label className="form-label">Cliente:</label>
                    <SelectClientes
                      value={formValue.idCliente}
                      onChange={handleChange}
                      className="form-select-sm"
                    />
                  </div>
                </Col>
              </Row>
            </Grid>

            <div className="d-flex justify-content-end mt-4">
              <Button appearance="primary" type="submit">
                Registrar Vehículo
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

export default ModalAgregarVehiculo;
