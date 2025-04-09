import { Button, Grid, Row, Col } from "rsuite";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const BASE_URL = import.meta.env.VITE_API_URL;

const EditarCotizacion = () => {
  const { idCotizacion } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    montoTotal: 0,
    montoManoObra: 0,
    tiempoEstimado: "",
    detalles: "",
  });

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await axios.get(`${BASE_URL}/cotizacion/obtener-cotizacion/${idCotizacion}`);
        const data = respuesta.data;
        setFormData({
          montoTotal: data.montoTotal,
          montoManoObra: data.montoManoObra,
          tiempoEstimado: data.tiempoEstimado,
          detalles: data.detalles,
        });
      } catch {
        Swal.fire({
          text: "Error al obtener la cotización",
          icon: "error",
          showConfirmButton: false,
        });
      }
    };
    obtenerDatos();
  }, [idCotizacion]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const verificacion = () => {
    if (formData.montoTotal <= 0) {
      Swal.fire({ text: "Monto Total debe ser mayor a 0", icon: "error", showConfirmButton: false });
      return false;
    }
    if (formData.montoManoObra <= 0) {
      Swal.fire({ text: "Monto de Mano de Obra debe ser mayor a 0", icon: "error", showConfirmButton: false });
      return false;
    }
    if (!formData.tiempoEstimado.trim()) {
      Swal.fire({ text: "Tiempo Estimado es requerido", icon: "error", showConfirmButton: false });
      return false;
    }
    if (!formData.detalles.trim()) {
      Swal.fire({ text: "Detalles es requerido", icon: "error", showConfirmButton: false });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificacion()) return;

    try {
      await axios.put(`${BASE_URL}/cotizacion/actualizar-cotizacion/`, {
        idCotizacion,
        ...formData,
      });
      Swal.fire({
        icon: "success",
        title: "Cotización actualizada correctamente",
        showConfirmButton: false,
        timer: 1500,
      })
      navigate("/cotizacion");
    } catch {
      Swal.fire({
        text: "Error al actualizar cotización",
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container bg-white mt-5 p-5">
      <Grid>
        <form onSubmit={handleSubmit}>
          <Row className="show-grid" gutter={16}>
            <Col xs={12}>
              <label>
                Monto Total:
                <input
                  type="number"
                  name="montoTotal"
                  value={formData.montoTotal}
                  onChange={handleChange}
                  className="form-control"
                  min="0"
                  style={{ minWidth: "250px" }}
                />
              </label>
              <label>
                Monto por mano de obra:
                <input
                  type="number"
                  name="montoManoObra"
                  value={formData.montoManoObra}
                  onChange={handleChange}
                  className="form-control"
                  min="0"
                  style={{ minWidth: "250px" }}
                />
              </label>
            </Col>
            <Col xs={12}>
              <label>
                Tiempo estimado:
                <input
                  type="text"
                  name="tiempoEstimado"
                  value={formData.tiempoEstimado}
                  onChange={handleChange}
                  className="form-control"
                  style={{ minWidth: "250px" }}
                />
              </label>
            </Col>
          </Row>
          <label>
            Detalles:
            <textarea
              name="detalles"
              value={formData.detalles}
              onChange={handleChange}
              className="form-control"
              rows="4"
              style={{ minWidth: "250px" }}
            />
          </label>
          <div className="d-flex justify-content-center mt-5">
            <Button type="submit" className="btn btn-secondary text-white">
              Guardar
            </Button>
          </div>
        </form>
      </Grid>
    </div>
  );
};

export default EditarCotizacion;
