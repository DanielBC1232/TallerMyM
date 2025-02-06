import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//constante de Productos
const ContenedorProductos = () => {
  const [listado, setLista] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/productos");
        setLista(data);
      } catch (error) {
        console.error("Error obteniendo las categorías:", error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className="article-container article-scroll">
      {listado.map((productos) => (
        <div
          key={productos.idProducto}
          className="card article border-0 rounded rounded-4"
        >
          <div className="imgFrame">
            <Link
              to={`/inventario-detalles/${productos.idProducto}`}
              className="btn-link"
            >
              <img
                className="card-img-top"
                src="https://www.autofixpr.com/wp-content/uploads/2017/12/3p-disco-freno.jpg"
                alt="Card image"
                style={{ width: "90%", minHeight: "120px" }}
              />
            </Link>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <strong className="text-secondary">{productos.nombre}</strong>
            </h5>
            <span className="card-text">
              <strong className="text-dark">Categoría:</strong>{" "}
              {productos.categoria}
            </span>
            <br />
            <span className="card-text">
              <strong>Stock:</strong> {productos.stock}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContenedorProductos;
