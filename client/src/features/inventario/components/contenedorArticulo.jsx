import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Image } from "rsuite";

//constante de Productos
const ContenedorProductos = ({formData}) => {

  console.log("Datos filtro:", formData);//parametros de filtro

  const [listado, setLista] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/productos`,formData);
        setLista(data);
      } catch (error) {
        console.error("Error obteniendo las categorías:", error);
      }
    };

    if (formData) {  // Asegúrate de que formData no sea vacío o undefined
      obtenerProductos();
    }
  }, [formData]);

   //url get imagen para las previsualizaciones
   const getImg = `http://localhost:3000/img/`;

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
              <Image
                className="card-img-top"
                src={getImg+productos.img}
                fallbackSrc="/noResult.png"
                alt=""
                style={{ width: "100%", minHeight: "120px" }}
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
