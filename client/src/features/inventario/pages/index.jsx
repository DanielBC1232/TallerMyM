import React, { useState, useEffect } from "react";
import ContenedorProductos from "../components/contenedorArticulo";
import SelectCategoria from "../components/SelectCategoria";
import SelectMarca from "../components/SelectMarca";
import RangoPrecio from "../components/RangoPrecio";
import ModalSolicitarProducto from "../components/ModalSolicitarProducto";
import {
  BrowserRouter as Router,
  Link,
  useNavigate
} from "react-router-dom";
import axios from "axios";
import { Row } from "rsuite";
import Notificaciones from "../../../components/Notificaciones";
import "../styles/inv.css";
import { IoAddSharp } from "react-icons/io5";
//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const IndexInventario = () => {
  const [precios, setPrecios] = useState([]);
  //console.log(precios)
  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    categoria: "",
    stock: 0,
    rangoPrecio: [precios.precioMin, precios.precioMax],
  });
  //console.log(formData)
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    async function obtenerPrecios() {
      try {
        const response = await axios.get(
          `${BASE_URL}/productos/precios`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token JWT aquí
            },
          }
        );
        setPrecios(response.data);
        if (response.data) {
          // Actualiza formData solo después de obtener los precios
          setFormData((prevState) => ({
            ...prevState,
            rangoPrecio: [response.data.precioMin, response.data.precioMax],
          }));
        }
      } catch (error) {
        console.error("Error obteniendo precios:", error);
        if (error.response) {
          if (error.response.status === 401) {
            Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "Operacion no Autorizada",
              showConfirmButton: false,
            });
            navigate(0); // Redirigir si no autorizado
          } else if (error.response.status === 403) {
            Swal.fire({
              icon: "warning",
              title: "Autenticación",
              text: "Sesión expirada",
              showConfirmButton: false,
            });
            localStorage.clear();
            navigate("/login"); // Redirigir si sesión expirada
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error al obtener los precios",
              showConfirmButton: false,
            });
          }
        }
      }
    }

    obtenerPrecios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "precio" || name === "stock"
          ? Number(value)
          : name === "vehiculosCompatibles"
            ? value
            : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
  };

  return (
    <div className="grid-container px-3 py-3">
      <Notificaciones modulo={'INVENTARIO'} />
      <div className="p-4 rounded-3 shadow-sm py-5 background-darkest">
        <form onSubmit={handleSubmit}>
          <div className="row my-2">
            <Row className="d-flex gap-4 justify-content-start">
              <div>
                <span>Categoria:</span>
                <SelectCategoria
                  value={formData.categoria}
                  onChange={handleChange} />
              </div>
              <div>
                <span>Marca:</span>
                <SelectMarca
                  value={formData.marca}
                  onChange={handleChange} />
              </div>
              <div>
                <span>Stock:</span>
                <select
                  className="form-select rounded-5 py-2 mt-2"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}>
                  <option value="">Cualquiera</option>
                  <option value="10">Menos de 10</option>
                  <option value="50">Menos de 50</option>
                  <option value="100">Menos de 100</option>
                  <option value="500">Menos de 500</option>
                  <option value="1000">Menos de 1000</option>
                </select>
              </div>
              <div>
                <span>Producto:</span>
                <input
                  name="nombre"
                  className="form-control rounded-5 py-2 mt-2"
                  placeholder="Buscar por nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
            </Row>
            <Row className="d-flex gap-4 justify-content-start mt-4">
              <RangoPrecio value={[formData.precioMin, formData.precioMax]} onChange={handleChange} />
            </Row>
          </div>
          <hr className="text-primary" />
          <Row className="d-flex gap-4 justify-content-start">
            <Link to="/inventario-agregar" className="btn btn-primary rounded-5 text-white d-flex align-items-center justify-content-center gap-1">
              Agregar producto</Link>
            <ModalSolicitarProducto />
          </Row>
        </form>
      </div>

      <div className="mt-4">

        <ContenedorProductos formData={formData} />

      </div>

    </div>
  );
};

export default IndexInventario;
