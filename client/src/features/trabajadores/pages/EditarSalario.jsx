import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Row, Col } from "rsuite";
import "../styles/gtr.css";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const EditarTrabajador = () => {
  const navigate = useNavigate();
  const {idTrabajador} = useParams(); // Obtener el ID del trabajador desde los parámetros de la URL
  const [formData, setFormData] = useState({
    idTrabajador: idTrabajador,
    nombreCompleto: "",
    cedula: "",
    salario: 0.00,
    seguroSocial: ""
  });
  
  useEffect(() => {
    const fetchTrabajador = async () => {
      if (!idTrabajador) return;
      try {
        const response = await axios.get(`${BASE_URL}/trabajadores/obtener-trabajador/${idTrabajador}`);
        setFormData(response.data[0]);// [0] al ser un solo objeto
      } catch (error) {
        console.error("Error al obtener el trabajador:", error);
      }
    };

    fetchTrabajador();
  }, [idTrabajador]);
  
  const errorNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "salario" ? Number(value) : value,
    });
  };

  const verificarNombreCompleto = () => {
    var pass = false;
    if (!formData.nombreCompleto.trim()) {
      nombreCompleto.classList.remove("is-valid");
      nombreCompleto.classList.add("is-invalid");
      pass = false;
      errorNotification("Campo de nombre vacío");
    } else {
      nombreCompleto.classList.remove("is-invalid");
      nombreCompleto.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };



  const verificarSalario = () => {
    var pass = false;
    if (!formData.salario || formData.salario <= 0) {
      salario.classList.remove("is-valid");
      salario.classList.add("is-invalid");
      pass = false;
      errorNotification("Digite un salario válido");
    } else {
      salario.classList.remove("is-invalid");
      salario.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };



  const verificacion = () => {
    var pass = false;
    if (
      verificarNombreCompleto() && verificarSalario() 
    ) {
      pass = true;
    } else {
      pass = false;
    }
    return pass;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (verificacion()) {
      axios
        .put(`${BASE_URL}/trabajadores/actualizar-trabajador`, formData)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Trabajador actualizado correctamente",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/trabajadores");
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error al actualizar trabajador",
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container main mx-auto p-5">
        <Grid fluid>
          <Row className="show-grid" gutter={16}>
            <Col xs={16} className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3">
              <Row className="show-grid" gutter={16}>
                <Col xs={12} className="column">
                  <div className="mb-3">
                    <label htmlFor="nombreCompleto" className="form-label">
                      Nombre Completo:
                    </label>
                    <input
                      id="nombreCompleto"
                      name="nombreCompleto"
                      type="text"
                      className="form-control"
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                    />
                  </div>


                  <div className="mb-3">
                    <label htmlFor="salario" className="form-label">
                      Salario:
                    </label>
                    <input
                      id="salario"
                      name="salario"
                      type="number"
                      className="form-control"
                      value={formData.salario}
                      onChange={handleChange}
                    />
                  </div>

               

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Actualizar Trabajador
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    </form>
  );
};

export default EditarTrabajador;