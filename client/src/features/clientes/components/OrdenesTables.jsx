import { useEffect, useState } from "react";
import { Table, Input, Button } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import "rsuite/dist/rsuite.min.css";
import "../styles/table.css";

const OrdenesTable = () => {
  const [cedula, setCedula] = useState("");
  const [ordenes, setOrdenes] = useState([]);

  const fetchOrdenes = async () => {
    if (!cedula) return alert("Ingrese una cédula válida");

    try {
      const response = await fetch(
        `http://localhost:3000/clientes/ordenes/${cedula}`
      );
      if (!response.ok) throw new Error("Error al obtener las órdenes");
      const data = await response.json();
      setOrdenes(data);
    } catch (error) {
      console.error(error);
      alert("No se pudieron obtener las órdenes.");
    }
  };

  return (
    <div className="table-container">
      <h2>Órdenes del Cliente</h2>

      <div className="search-container">
        <Input
          placeholder="Ingrese la cédula del cliente"
          value={cedula}
          onChange={setCedula}
          className="search-input"
        />
        <Button
          className="search-button"
          appearance="primary"
          onClick={fetchOrdenes}
        >
          Buscar
        </Button>
      </div>

      <Table data={ordenes} autoHeight bordered hover>
        <Column width={100} align="center" fixed>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="idOrden" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Código Orden</HeaderCell>
          <Cell dataKey="codigoOrden" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Estado</HeaderCell>
          <Cell dataKey="estadoOrden" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Fecha Ingreso</HeaderCell>
          <Cell dataKey="fechaIngreso" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Fecha Salida</HeaderCell>
          <Cell dataKey="fechaSalida" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Estado Atrasado</HeaderCell>
          <Cell>{(rowData) => (rowData.estadoAtrasado ? "Sí" : "No")}</Cell>
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Tiempo Estimado</HeaderCell>
          <Cell dataKey="tiempoEstimado" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Placa Vehículo</HeaderCell>
          <Cell dataKey="placaVehiculo" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Modelo Vehículo</HeaderCell>
          <Cell dataKey="modeloVehiculo" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Marca Vehículo</HeaderCell>
          <Cell dataKey="marcaVehiculo" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Cliente</HeaderCell>
          <Cell dataKey="nombreCliente" />
        </Column>
        <Column width={150} align="center">
          <HeaderCell>Teléfono Cliente</HeaderCell>
          <Cell dataKey="telefonoCliente" />
        </Column>
      </Table>
    </div>
  );
};

export default OrdenesTable;
