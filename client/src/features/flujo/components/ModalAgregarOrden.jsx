import React, { useState } from "react";
import { Modal, Button, Grid, Row, Col } from "rsuite";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SelectClientes from "../components/SelectClientes";
import SelectTrabajadores from "../components/SelectTrabajadores";
import SelectVehiculos from "../components/SelectVehiculos";

// URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const ModalAgregarOrden = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    tiempoEstimado: "",
    idTrabajador: "",
    idCliente: "",
    idVehiculo: "",
    descripcion: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validacion simplificada: se verifica que todos los campos obligatorios tengan valor
  const validarCampos = () => {
    const { tiempoEstimado, idTrabajador, idCliente, idVehiculo, descripcion } = formData;
    if (!tiempoEstimado || !idTrabajador || !idCliente || !idVehiculo || !descripcion.trim()) {
      Swal.fire({
        icon: "error",
        text: "Todos los campos son obligatorios.",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    try {
      const res = await axios.post(`${BASE_URL}/flujo/agregar-orden/`, formData);
      if (res.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "Orden agregada correctamente",
          showConfirmButton: false,
          timer: 1300,
        });
        setFormData({
          tiempoEstimado: "",
          idTrabajador: "",
          idCliente: "",
          idVehiculo: "",
          descripcion: ""
        });
        setOpen(false);
        window.location.reload();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Ocurrió un problema al procesar la solicitud",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error al agregar la orden:", error);
      let message = "Error al agregar la orden";
      if (error.response) {
        const { status } = error.response;
        if (status === 400) message = "Solicitud incorrecta, por favor verifique los datos ingresados";
        else if (status === 404) message = "No se encontró el recurso solicitado";
        else if (status === 500) message = "Error interno del servidor, por favor intente más tarde";
      } else {
        message = "Error desconocido, por favor intente más tarde";
      }
      Swal.fire({
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        style={{ minWidth: "80px", maxWidth: "350px" }}
        className="btn btn-primary btn-sm text-white"
        onClick={handleOpen}
      >
        Agregar Orden
      </Button>

      <Modal open={open} onClose={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Agregar Orden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Grid fluid>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label>Cliente:</label>
                    <SelectClientes
                      value={formData.idCliente}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, idCliente: e.target.value }))
                      }
                      className="form-select-sm"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Mecánico:</label>
                    <SelectTrabajadores
                      value={formData.idTrabajador}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, idTrabajador: e.target.value }))
                      }
                      className="form-select-sm"
                      required
                    />
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label>Vehículo:</label>
                    <SelectVehiculos
                      idCliente={formData.idCliente}
                      value={formData.idVehiculo}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, idVehiculo: e.target.value }))
                      }
                      className="form-select-sm"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Tiempo estimado:</label>
                    <input
                      type="date"
                      name="tiempoEstimado"
                      value={formData.tiempoEstimado}
                      onChange={handleChange}
                      className="form-control"
                      style={{ maxWidth: "355px" }}
                      required
                    />
                  </div>
                </Col>
              </Row>
              <div className="mb-3">
                <label>Descripción:</label>
                <textarea
                  name="descripcion"
                  rows={4}
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="form-control form-select-sm"
                  required
                />
              </div>
              <div className="d-flex justify-content-end">
                <Button appearance="primary" type="submit">
                  Agregar
                </Button>
              </div>
            </Grid>
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

export default ModalAgregarOrden;
