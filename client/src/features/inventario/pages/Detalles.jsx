import React, { useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Row,
  Col,
} from "rsuite";

import "../styles/inv.css";

const styles = {
  width: 225,
};

const Detalles = () => {
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/productos/${idProducto}`
        ); //consumir api en backend por id
        setProducto(data);
        console.log(data); // imprimir JSON en consola
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    obtenerProducto(); // llamar funcion
  }, [idProducto]);

  if (!producto) return <p>Cargando...</p>;
  return (
    <div className="container main mx-auto p-5">
      <Grid fluid>
        <Row className="show-grid" gutter={16}>
          <Col xs={6}>{/* AUN FALTA CARGAR SUBIR IMAGEN */}</Col>
          <Col
            xs={16}
            className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3"
          >
            <Row className="show-grid" gutter={16}>
              <Col xs={12} className="column">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.nombre}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="marca" className="form-label">
                    Marca:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.marca}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="vehiculos" className="form-label">
                    Vehículos compatibles:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      Array.isArray(producto.vehiculosCompatibles) // verifica si es un array
                        ? producto.vehiculosCompatibles.join(", ") // si es un array usa join()
                        : typeof producto.vehiculosCompatibles === "string" // si es una cadena
                        ? JSON.parse(producto.vehiculosCompatibles).join(", ") // Conviértela a array y usa join()
                        : "No hay vehículos compatibles"
                    }
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="categoria" className="form-label">
                    Categoría:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.categoria}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="proveedor" className="form-label">
                    Proveedor:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.proveedor}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="serviceProduct" className="form-label">
                    Tipo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.tipo}
                    readOnly
                  />
                </div>
              </Col>
              <Col xs={12} className="column">
                <div className="mb-3">
                  <label htmlFor="precio" className="form-label">
                    Precio:
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">₡</span>
                    <input
                    type="number"
                    className="form-control"
                    value={producto.precio}
                    readOnly
                  />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaIngreso" className="form-label">
                    Fecha de ingreso:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={new Date(producto.fechaIngreso).toLocaleDateString('es-CR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ubicacion" className="form-label">
                    Ubicación en almacén:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.ubicacionAlmacen}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Stock:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={producto.stock}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción:
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    className="form-control"
                    value={producto.descripcion}
                    readOnly
                    rows={6}
                  />
                </div>
                
              </Col>
              
            </Row>
            <div className="d-flex d-grid justify-content-end gap-4">
                  <button
                    className="btn btn-danger text-white"
                    style={{ maxWidth: "120px" }}>
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning text-white"
                    style={{ maxWidth: "120px" }}>
                    Editar
                  </button>
                </div>
          </Col>
          
        </Row>
      </Grid>
    </div>
  );
};

export default Detalles;
