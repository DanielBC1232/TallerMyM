import React, { useState } from "react";
import { Modal, Button, Grid, Row, Col } from "rsuite";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectClientes from "../../clientes/components/SelectClientes";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ModalAgregarCotizacion = ({ onClose, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    montoTotal: "",
    montoManoObra: "",
    tiempoEstimado: "",
    detalles: "",
    idCliente: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { montoTotal, montoManoObra, tiempoEstimado, detalles, idCliente } = formData;

    if (!montoTotal || !montoManoObra || !tiempoEstimado.trim() || !detalles.trim() || !idCliente) {
      Swal.fire({
        icon: "error",
        text: "Todos los campos son obligatorios.",
        showConfirmButton: false,
      });
      return;
    }

    try {
      await axios.post(`${BASE_URL}/cotizacion/agregar-cotizacion/`, formData);
      Swal.fire({
        icon: "success",
        title: "Cotización generada correctamente",
        showConfirmButton: false,
        timer: 1500,
      })
      window.location.reload();//recargar pagina
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Hubo un error al generar la cotización.",
        showConfirmButton: false,
      });
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        style={{ minWidth: "80px", maxWidth: "350px" }}
        className="btn btn-secondary btn-sm text-white"
        onClick={handleOpen}
      >
        Nueva Cotización
      </Button>

      <Modal open={open} onClose={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>Generar Cotización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Grid fluid>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label>Monto Total:</label>
                    <input
                      name="montoTotal"
                      type="number"
                      min="0"
                      value={formData.montoTotal}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      placeholder="CRC"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Monto Mano de Obra:</label>
                    <input
                      name="montoManoObra"
                      type="number"
                      min="0"
                      value={formData.montoManoObra}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      placeholder="CRC"
                      required
                    />
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div className="mb-3">
                    <label>Tiempo Estimado:</label>
                    <input
                      name="tiempoEstimado"
                      value={formData.tiempoEstimado}
                      onChange={handleChange}
                      className="form-control form-select-sm"
                      placeholder="Ejemplo: Finalizado en 3 días"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Cliente:</label>
                    <SelectClientes
                      value={formData.idCliente}
                      onChange={handleChange}
                      className="form-select-sm"
                    />
                  </div>
                </Col>
              </Row>

              <div className="mb-3">
                <label>Detalles:</label>
                <textarea
                  name="detalles"
                  rows={4}
                  value={formData.detalles}
                  onChange={handleChange}
                  className="form-control form-select-sm"
                  placeholder="Información adicional..."
                  required
                />
              </div>

              <div className="d-flex justify-content-end mt-4">
                <Button appearance="primary" type="submit">
                  Generar
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

export default ModalAgregarCotizacion;
