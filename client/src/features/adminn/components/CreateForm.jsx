import { useState } from "react";
import { Input, Button, Form, Schema } from "rsuite";
import "../styles/form.css";

const { StringType,NumberType } = Schema.Types;

const model = Schema.Model({
  username: StringType().isRequired("El nombre de usuario es obligatorio"),
  email: StringType().isEmail("Correo inválido").isRequired("El correo es obligatorio"),
  password: StringType().isRequired("La Contraseña es obligatorio"),
  idRol: NumberType().isInteger("El rol debe ser un número entero").isRequired("El rol es obligatorio"),
});

const CreateForm = () => {
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    idRol: "",
  });

  const handleSubmit = async () => {
    
    try {
      const response = await fetch("http://localhost:3000/admin/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValue),
      });

      if (!response.ok) throw new Error("Error al registrar usuario");

      alert("Cliente usuario exitosamente");
      setFormValue({
        username: "",
        email: "",
        password: "",
        idRol: "",
      });
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar el usuario");
    }
  };

  return (
    <div className="form-container">
      
      <Form model={model} onChange={(value) => setFormValue({ ...value, idRol: Number(value.idRol) || "" })} formValue={formValue} fluid>
        <Form.Group>
          <Form.ControlLabel>Nombre de usuario</Form.ControlLabel>
          <Form.Control name="username" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Correo</Form.ControlLabel>
          <Form.Control name="email" type="email" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Contraseña</Form.ControlLabel>
          <Form.Control name="password" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Rol</Form.ControlLabel>
          <Form.Control name="idRol" />
        </Form.Group>
        <Button appearance="default" onClick={() => console.log("Datos actuales:", formValue)}>
          Ver datos
        </Button>
        <Button appearance="primary" onClick={handleSubmit}>
          Registrar
        </Button>
      </Form>
    </div>
  );
};

export default CreateForm;
