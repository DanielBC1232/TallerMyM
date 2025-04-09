import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Row, Col } from "rsuite";
import "../styles/gtr.css";

export const BASE_URL = import.meta.env.VITE_API_URL;

const EditarTrabajador = () => {
  const navigate = useNavigate();
  const { idTrabajador } = useParams();

  const [formData, setFormData] = useState({
    idTrabajador: idTrabajador,
    nombreCompleto: "",
    cedula: "",
    salario: "",
    seguroSocial: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTrabajador = async () => {
      if (!idTrabajador) return;
      try {
        const { data } = await axios.get(`${BASE_URL}/trabajadores/obtener-trabajador/${idTrabajador}`);
        setFormData(data);
      } catch (error) {
        console.error("Error al obtener el trabajador:", error);
      }
    };

    fetchTrabajador();
  }, [idTrabajador]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salario" ? Number(value) : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nombreCompleto.trim()) newErrors.nombreCompleto = "Campo obligatorio";
    if (!/^\d{9}$/.test(formData.cedula)) newErrors.cedula = "Cédula inválida";
    if (!formData.salario || formData.salario <= 0) newErrors.salario = "Salario inválido";
    if (!formData.seguroSocial.trim()) newErrors.seguroSocial = "Campo obligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire({
        icon: "error",
        text: "Corrija los campos marcados",
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    try {
      await axios.put(`${BASE_URL}/trabajadores/actualizar-trabajador`, formData);
      Swal.fire({
        icon: "success",
        title: "Trabajador actualizado correctamente",
        timer: 1500,
        showConfirmButton: false
      }).then(() => navigate("/trabajadores"));
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar trabajador",
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container main mx-auto p-5">
        <Grid fluid>
          <Row className="show-grid" gutter={16}>
            <Col xs={16} className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3">
              <Row gutter={16}>
                <Col xs={12}>
                  {["nombreCompleto", "cedula", "salario", "seguroSocial"].map((field) => (
                    <div className="mb-3" key={field}>
                      <label htmlFor={field} className="form-label">
                        {field === "nombreCompleto"
                          ? "Nombre Completo"
                          : field === "cedula"
                          ? "Cédula"
                          : field === "salario"
                          ? "Salario"
                          : "Seguro Social"}:
                      </label>
                      <input
                        name={field}
                        type={field === "salario" ? "number" : "text"}
                        className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                        value={formData[field]}
                        onChange={handleChange}
                        readOnly={field === "cedula"}
                      />
                      {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                    </div>
                  ))}

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
