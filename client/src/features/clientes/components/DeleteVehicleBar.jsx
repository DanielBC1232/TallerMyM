import { useState } from "react";
import { Input, Button, Message, useToaster } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "../styles/eliminarVehiculo.css";

const EliminarVehiculo = ({ idClienteProp }) => {
  const [idCliente, setIdCliente] = useState(idClienteProp || "");
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const toaster = useToaster();

  const fetchVehiculos = async () => {
    if (!idCliente) return;

    try {
      const response = await fetch(
        `http://localhost:3000/clientes/${idCliente}/vehiculos`
      );

      if (response.status === 404) {
        setVehiculos([]);
        toaster.push(
          <Message type="error">
            No se encontraron vehículos para este cliente o el cliente no existe
          </Message>,
          { placement: "topEnd" }
        );
        return;
      }

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.error || "No se pudieron obtener los vehículos");

      setVehiculos(data);
      toaster.push(
        <Message type="success">Vehículos cargados correctamente</Message>,
        { placement: "topEnd" }
      );
    } catch (error) {
      toaster.push(<Message type="error">{error.message}</Message>, {
        placement: "topEnd",
      });
    }
  };

  const eliminarVehiculo = async (idVehiculo) => {
    if (!idCliente) {
      return toaster.push(
        <Message type="warning">Ingrese la cédula del cliente</Message>,
        { placement: "topEnd" }
      );
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/clientes/${idCliente}/vehiculos/${idVehiculo}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "No se pudo eliminar el vehículo");

      toaster.push(
        <Message type="success">Vehículo eliminado exitosamente</Message>,
        { placement: "topEnd" }
      );
      setVehiculos(vehiculos.filter((v) => v.idVehiculo !== idVehiculo));
    } catch (error) {
      toaster.push(<Message type="error">{error.message}</Message>, {
        placement: "topEnd",
      });
    } finally {
      setLoading(false);
    }
  };

  const buscarPorCedula = () => {
    if (!idCliente) {
      toaster.push(
        <Message type="warning">Debe ingresar una cédula para buscar</Message>,
        { placement: "topEnd" }
      );
    } else {
      setIsSearchClicked(true);
      fetchVehiculos();
    }
  };

  return (
    <div className="form-container">
      <h2>Eliminar Vehículo</h2>

      {!idClienteProp && (
        <div className="input-container">
          <Input
            placeholder="Cédula del Cliente"
            value={idCliente}
            onChange={setIdCliente}
          />
          <Button color="green" appearance="primary" onClick={buscarPorCedula}>
            Buscar
          </Button>
        </div>
      )}

      <div className="vehiculo-list">
        {vehiculos.length > 0 ? (
          vehiculos.map((vehiculo) => (
            <div key={vehiculo.idVehiculo} className="vehiculo-item">
              <span>
                {vehiculo.marcaVehiculo} {vehiculo.modeloVehiculo} (
                {vehiculo.placaVehiculo})
              </span>
              <Button
                color="red"
                appearance="primary"
                loading={loading}
                onClick={() => eliminarVehiculo(vehiculo.idVehiculo)}
              >
                Eliminar
              </Button>
            </div>
          ))
        ) : (
          <p>No hay vehículos registrados para este cliente</p>
        )}
      </div>
    </div>
  );
};

export default EliminarVehiculo;
