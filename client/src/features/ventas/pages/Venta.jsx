import "../styles/ven.css";
import React, { useState, useEffect } from "react";
import { Text, Row, Col } from "rsuite";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import SelectProductos from "../components/SelectProductos";
import ListaProductosVenta from "../components/ListaProductosVenta";

//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const Venta = () => {
  const { idVenta } = useParams();
  const navigate = useNavigate(); // Hook para navegar
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/ventas/obtener-venta/${idVenta}`);
        setFormData(data);

      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerDatos(); // llamar funcion

  }, [idVenta]);


  return (
    <div className="mx-5 mt-3">
      <Row>
        {/* COLUMNA DETALLSE VENTA */}
        <Col xs={14}>
          <div className="ven-col">
            <div className="d-flex flex-row ven-header bg-primary p-4 py-3"><Text size="xl" className="text-white">Detalles de Venta</Text></div>
            <div className="p-4">

              <Row>
                {/*COLUMNA INFORMACION*/}
                <Col xs={11} className="d-grid gap-4">

                  <span>
                    <Text size="xxl">Codigo de orden:</Text>
                    <Text size="xl" muted>{formData.codigoOrden}</Text>
                  </span>

                  <span>
                    <Text size="xxl">Cliente:</Text>
                    <Text size="xl" muted>{formData.nombreCliente}</Text>
                  </span>

                  <span>
                    <Text size="xxl">Fecha de ingereso:</Text>
                    <Text size="xl" muted>{new Date(formData.fechaIngreso).toLocaleDateString("es-CR")}</Text>
                  </span>

                  <span>
                    <Text size="xxl">Fecha de venta:</Text>
                    <Text size="xl" muted>{new Date(formData.fechaVenta).toLocaleDateString("es-CR")}</Text>
                  </span>

                  <span>
                    <Text size="xxl">Detalles de venta:</Text>
                    <Text size="xl" muted>{formData.VentaDetalles}</Text>
                  </span>

                  <span>
                    <Text size="xxl">Detalles de Orden:</Text>
                    <Text size="xl" muted>{formData.descripcionOrden}</Text>
                  </span>

                  <span>
                    <Text size="xxl">Vehiculo:</Text>
                    <Text size="xl" muted>{formData.vehiculo}</Text>
                  </span>

                  <span>
                    <Text size="xxl">Tipo de pago:</Text>
                    <Text size="xl" muted>{formData.tipoPago}</Text>
                  </span>

                </Col>
                {/*COLUMNA PRODUCTOS VINCULADOS + PRECIOS*/}
                <Col xs={13} className="d-grid gap-4">

                  {/* Lista de productos asociados a la venta */}
                  <ListaProductosVenta idVenta={idVenta}/>


                </Col>
              </Row>

            </div>
          </div>
        </Col>

        {/* COLUMNA SELECCION DE PRODUCTOS */}
        <Col xs={10}>
          <div className="ven-col">
            <div className="d-flex flex-row ven-header bg-primary p-4 py-3"><Text size="xl" className="text-white">Agregar productos</Text></div>
            <div className="p-4">

              {/* FILTRO PRODUCTOS */}
              <SelectProductos idVenta={idVenta} />


            </div>
          </div>
        </Col>

      </Row>
    </div>
  );
};
export default Venta;