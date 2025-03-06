import { useState } from "react";
import { Form, Button, Input, Message, useToaster } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "../styles/editar.css";

const EditForm = () => {
  const [cedula, setCedula] = useState("");
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(false);
  const toaster = useToaster();

  const fetchCliente = async () => {
    if (!cedula) {
      alert("Ingrese una cédula válida");
      return;
    }
    setLoading(true);
    setCliente(null);

    try {
      const response = await fetch(`http://localhost:3000/clientes/${cedula}`,{
        method:"GET"
      });
      
      if (response.status === 404) {
        alert("Cliente noooo encontrado");
        setCliente(null);
        return;
      }

      if (!response.ok) {
        throw new Error("Error al buscar cliente");
      }

      const data = await response.json();
      if (!data.idCliente) {
        throw new Error("Cliente sin ID asignado");
      }

      setCliente(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
//------------------------------------
  const handleUpdate = async () => {
    if (!cliente) {
      alert("No hay cliente cargado");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/clientes/${cliente.idCliente}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cliente),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el cliente");
      }

      alert("Cliente actualizado con éxito");

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Modificar Cliente</h2>

      <div className="search-container">
        <Input
          placeholder="Ingrese la cédula"
          value={cedula}
          onChange={setCedula}
          className="search-input"
        />
        <Button appearance="primary" onClick={fetchCliente} loading={loading}>
          Buscar
        </Button>
      </div>

      {cliente && (
        <Form fluid>
          <Form.Group controlId="cedula">
            <Form.ControlLabel>Cédula</Form.ControlLabel>
            <Input
              value={cliente.cedula}
              onChange={(value) => setCliente({ ...cliente, cedula: value })}
            />
          </Form.Group>

          <Form.Group controlId="nombre">
            <Form.ControlLabel>Nombre</Form.ControlLabel>
            <Input
              value={cliente.nombre}
              onChange={(value) => setCliente({ ...cliente, nombre: value })}
            />
          </Form.Group>

          <Form.Group controlId="apellido">
            <Form.ControlLabel>Apellido</Form.ControlLabel>
            <Input
              value={cliente.apellido}
              onChange={(value) => setCliente({ ...cliente, apellido: value })}
            />
          </Form.Group>

          <Form.Group controlId="telefono">
            <Form.ControlLabel>Teléfono</Form.ControlLabel>
            <Input
              value={cliente.telefono}
              onChange={(value) => setCliente({ ...cliente, telefono: value })}
            />
          </Form.Group>

          <Form.Group controlId="correo">
            <Form.ControlLabel>Correo</Form.ControlLabel>
            <Input
              value={cliente.correo}
              onChange={(value) => setCliente({ ...cliente, correo: value })}
            />
          </Form.Group>

          <Form.Group>
            <Button appearance="primary" onClick={handleUpdate}>
              Guardar Cambios
            </Button>
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default EditForm;
