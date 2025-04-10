import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "rsuite";
import { Link, useNavigate } from 'react-router-dom';

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

//constante de Productos
const ContenedorProductos = ({ formData }) => {
  const navigate = useNavigate();
  const [listado, setLista] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay para evitar consumo innecesario
        const { data } = await axios.post(
          `${BASE_URL}/productos`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}` // Agregar el token JWT
            }
          }
        );

        setLista(data);
      } catch (error) {
        if (error.response) {
          // Manejo de respuestas HTTP
          if (error.response.status === 401) {
            Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "Operacion no Autorizada",
              showConfirmButton: false,
            });
            navigate(0); // Redirige a la página de login si no está autorizado
          }
          else if (error.response.status === 403) {
            Swal.fire({
              icon: "warning",
              title: "Autenticación",
              text: "Sesión expirada",
              showConfirmButton: false,
            });
            localStorage.clear();
            navigate("/login"); // Redirige a login si la sesión ha expirado
          } else {
            console.error("Error obteniendo las categorías:", error);
          }
        } else {
          console.error("Error desconocido", error);
        }
      }

    };

    if (formData) {
      obtenerProductos();
    }
  }, [formData]);

  //url get imagen para las previsualizaciones
  const getImg = (img) => img ? `${BASE_URL}/img/${img}` : "/noResult.png";


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
                //src={getImg+productos.img}
                src={getImg(productos.img)}
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
            </span><br />
            <span className="card-text">
              <strong>Precio:</strong> ₡{productos.precio}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContenedorProductos;
