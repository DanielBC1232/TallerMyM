import React, { useState } from "react";
import { Grid, Row, Col } from "rsuite";
import "../styles/flu.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SelectClientes from "../components/SelectClientes";

const Agregar = () => {
  const navigate = useNavigate(); // Hook para navegar
  const [formData, setFormData] = useState({
    tiempoEstimado: "",
    idTrabajador: null,
    idCliente: null,
    idVehiculo: null,
  });

  const errorNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      showConfirmButton: false,
    });
  };

  // --- Verificaciones de campos ---
  const VerificarTiempoEstimado = () => {
    var pass = false;
    //Campo Nombre
    if (!formData.tiempoEstimado.trim()) {
      tiempoEstimado.classList.remove("is-valid");
      tiempoEstimado.classList.add("is-invalid");
      pass = false;
      errorNotification("Campo de timepo estimado vacío");
    } else if (formData.tiempoEstimado.trim()) {
      tiempoEstimado.classList.remove("is-invalid");
      tiempoEstimado.classList.add("is-valid");
      pass = true;
    }

    return pass;
  };
  const verificarTrabajador = () => {
    var pass = false;
    //Campo Marca
    if (!formData.idTrabajador) {
      idTrabajador.classList.remove("is-valid");
      idTrabajador.classList.add("is-invalid");
      pass = false;
      errorNotification("Debe asignar un mecanico encargado");
    } else if (formData.idTrabajador) {
      idTrabajador.classList.remove("is-invalid");
      idTrabajador.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };
  const verificarCliente = () => {
    var pass = false;
    //Campo Precio
    if (!formData.idCliente) {
      idCliente.classList.remove("is-valid");
      idCliente.classList.add("is-invalid");
      pass = false;
      errorNotification("Debe asignar un cliente");
    } else if (formData.idCliente) {
      idCliente.classList.remove("is-invalid");
      idCliente.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };
  const verificarVehiculo = () => {
    var pass = false;
    //Campo Fecha Ingreso
    if (!formData.idVehiculo.trim()) {
      idVehiculo.classList.remove("is-valid");
      idVehiculo.classList.add("is-invalid");
      pass = false;
      errorNotification("Debe asignar un vehiculo");
    } else if (formData.marca.trim()) {
      idVehiculo.classList.remove("is-invalid");
      idVehiculo.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };
  // VERIFICACION GENERAL
  const verificacion = () => {
    var pass = false;
    //Verificar que todos los campos sean validos
    if (
      VerificarTiempoEstimado() &&
      verificarTrabajador() &&
      verificarCliente() &&
      verificarVehiculo()
    ) {
      pass = true;
    } else {
      pass = false;
    }
    return pass;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);

    if (verificacion()) {
      axios
        .post("http://localhost:3000/orden/agregar", formData)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Orden agregada correctamente",
            showConfirmButton: false,
            timer: 1300,
          }).then(() => {
            navigate("/flujo");
          });
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Error al agregar una orden",
            text: error,
            showConfirmButton: false,
            timer: 1000,
          })
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container main p-5">
        <Grid fluid>
          <Row
            className="show-grid d-flex justify-content-center align-items-center"
            gutter={16}
          >
            <Col
              xs={16}
              className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3"
            >
              <Row className="show-grid" gutter={16}>
                <Col xs={12} className="column">
                  <span>
                    Seleccionar un cliente
                    <SelectClientes />
                  </span>
                  <span>
                    Seleccionar un mecánico
                    <SelectClientes />
                  </span>
                </Col>
                <Col xs={12} className="column">
                  <span>
                    Seleccionar un vehiculo
                    <SelectClientes />
                  </span>
                  <span>
                    Estimado de finalización:
                    <input
                      type="date"
                      className="form-control"
                      style={{ maxWidth: "225px" }}
                      name="tiempoEstimado"
                    />
                  </span>
                </Col>
              </Row>
              <div className="d-grid justify-content-end me-5">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ maxWidth: "120px" }}
                >
                  Agregar
                </button>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </form>
  );
};

export default Agregar;
