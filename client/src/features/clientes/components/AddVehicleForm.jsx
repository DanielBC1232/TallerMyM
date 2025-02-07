import { useState } from "react";
import { Input, Button, Message, useToaster } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "../styles/form.css";

const AgregarVehiculos = ({ idClienteProp }) => {
  const [idCliente, setIdCliente] = useState(idClienteProp || "");
  const [vehiculos, setVehiculos] = useState([
    {
      placaVehiculo: "",
      marcaVehiculo: "",
      modeloVehiculo: "",
      annoVehiculo: "",
      tipoVehiculo: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const toaster = useToaster();

  const handleChange = (index, field, value) => {
    const newVehiculos = [...vehiculos];
    newVehiculos[index][field] = value;
    setVehiculos(newVehiculos);
  };

  const agregarVehiculo = () => {
    setVehiculos([
      ...vehiculos,
      {
        placaVehiculo: "",
        marcaVehiculo: "",
        modeloVehiculo: "",
        annoVehiculo: "",
        tipoVehiculo: "",
      },
    ]);
  };

  const eliminarVehiculo = (index) => {
    setVehiculos(vehiculos.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!idCliente) {
      return toaster.push(
        <Message type="warning">Ingrese la cédula del cliente</Message>,
        { placement: "topEnd" }
      );
    }
    if (
      vehiculos.some(
        (v) =>
          !v.placaVehiculo ||
          !v.marcaVehiculo ||
          !v.modeloVehiculo ||
          !v.annoVehiculo ||
          !v.tipoVehiculo
      )
    ) {
      return toaster.push(
        <Message type="warning">Todos los campos son obligatorios</Message>,
        { placement: "topEnd" }
      );
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/clientes/${idCliente}/vehiculos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vehiculos }),
        }
      );

      const data = await response.json();

      if (response.status === 404) {
        alert("Cliente no encontrado");
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "No se pudieron agregar los vehículos");
      }

      toaster.push(
        <Message type="success">Vehículos agregados exitosamente</Message>,
        { placement: "topEnd" }
      );

      alert("¡Vehículos agregados exitosamente!");

      setVehiculos([
        {
          placaVehiculo: "",
          marcaVehiculo: "",
          modeloVehiculo: "",
          annoVehiculo: "",
          tipoVehiculo: "",
        },
      ]);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Agregar Vehículos</h2>

      {!idClienteProp && (
        <Input
          placeholder="Cédula del Cliente"
          value={idCliente}
          onChange={setIdCliente}
        />
      )}

      {vehiculos.map((vehiculo, index) => (
        <div key={index} className="vehiculo-form">
          <Input
            placeholder="Placa"
            value={vehiculo.placaVehiculo}
            onChange={(value) => handleChange(index, "placaVehiculo", value)}
          />
          <Input
            placeholder="Marca"
            value={vehiculo.marcaVehiculo}
            onChange={(value) => handleChange(index, "marcaVehiculo", value)}
          />
          <Input
            placeholder="Modelo"
            value={vehiculo.modeloVehiculo}
            onChange={(value) => handleChange(index, "modeloVehiculo", value)}
          />
          <Input
            type="number"
            placeholder="Año"
            value={vehiculo.annoVehiculo}
            onChange={(value) => handleChange(index, "annoVehiculo", value)}
          />
          <Input
            placeholder="Tipo"
            value={vehiculo.tipoVehiculo}
            onChange={(value) => handleChange(index, "tipoVehiculo", value)}
          />
          <Button color="red" onClick={() => eliminarVehiculo(index)}>
            Eliminar
          </Button>
        </div>
      ))}

      <Button onClick={agregarVehiculo}>+ Agregar Otro Vehículo</Button>
      <Button
        color="blue"
        appearance="primary"
        loading={loading}
        onClick={handleSubmit}
      >
        Guardar Vehículos
      </Button>
    </div>
  );
};

export default AgregarVehiculos;
