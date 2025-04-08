import React, { useState, useRef } from "react";
import { Button, Form, Schema } from "rsuite";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

export const BASE_URL = import.meta.env.VITE_API_URL;
const { StringType } = Schema.Types;

const model = Schema.Model({
  nombre: StringType().isRequired("El nombre es obligatorio"),
  apellido: StringType().isRequired("El apellido es obligatorio"),
  cedula: StringType().isRequired("La cédula es obligatoria"),
  correo: StringType()
    .isEmail("Correo inválido")
    .isRequired("El correo es obligatorio"),
  telefono: StringType().isRequired("El teléfono es obligatorio")
});

const AgregarCliente = () => {
  const [formValue, setFormValue] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: ""
  });

  const formRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      Swal.fire({
        icon: "warning",
        title: "Validación",
        text: "Por favor complete el formulario correctamente"
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/clientes/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValue)
      });

      if (response.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Cédula duplicada",
          text: "Ya existe un cliente registrado con esta cédula"
        });
        return;
      }

      if (!response.ok) throw new Error("Error al registrar cliente");

      Swal.fire({
        icon: "success",
        title: "Cliente registrado exitosamente",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/clientes");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al registrar el cliente"
      });
    }
  };

  return (
    <div className="form-container">
      <Form
        ref={formRef}
        model={model}
        onChange={setFormValue}
        formValue={formValue}
        fluid
      >
        <Form.Group>
          <Form.ControlLabel>Nombre</Form.ControlLabel>
          <Form.Control name="nombre" placeholder="Ingrese el nombre" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Apellido</Form.ControlLabel>
          <Form.Control name="apellido" placeholder="Ingrese el apellido" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Cédula</Form.ControlLabel>
          <Form.Control name="cedula" placeholder="Ingrese la cédula" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Correo</Form.ControlLabel>
          <Form.Control name="correo" type="email" placeholder="Ingrese el correo electrónico" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Teléfono</Form.ControlLabel>
          <Form.Control name="telefono" placeholder="Ingrese el teléfono" />
        </Form.Group>
        <Form.Group>
          <Button appearance="primary" onClick={handleSubmit}>
            Registrar
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AgregarCliente;
