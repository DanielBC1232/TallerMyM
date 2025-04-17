import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useNavigate,
} from "react-router-dom";
import { Grid, Row, Col, Text } from "rsuite";
import "../styles/flu.module.css";
import ColPendiente from "../components/ColPendiente";
import ColProgreso from "../components/ColProgreso";
import ColListo from "../components/ColListo";
import Notificaciones from "../../../components/Notificaciones";
import ModalAgregarOrden from "../components/ModalAgregarOrden";

const IndexFlujo = () => {
  const navigate = useNavigate(); // Hook para navegar

  return (
    <div className="">
      {/* OPCIONES */}
      <Notificaciones modulo={'FLUJO'} />
      <div className="px-4 py-3">
        <ModalAgregarOrden />
      </div>

      {/* FLUJO */}
      <div className="flujo-row">
        {/* Pendiente */}
        <div className="flujo-col">
          <div className="bg-primary rounded-4 py-2 mb-4 h-100">
            <Text size="xxl" className="text-white ps-4 py-1">Pendiente</Text>
            <div className="p-3 scrollable-container bg-white shadow" style={{ minHeight: "75vh" }}>
              <ColPendiente />
            </div>
          </div>
        </div>

        {/* En progreso */}
        <div className="flujo-col">
          <div className="bg-primary rounded-4 py-2 mb-4 h-100">
            <Text size="xxl" className="text-white ps-4 py-1">En progreso</Text>
            <div className="p-3 scrollable-container bg-white shadow" style={{ minHeight: "75vh" }}>
              <ColProgreso />
            </div>
          </div>
        </div>

        {/* Listo */}
        <div className="flujo-col">
          <div className="bg-primary rounded-4 py-2 mb-4 h-100">
            <Text size="xxl" className="text-white ps-4 py-1">Listo</Text>
            <div className="p-3 scrollable-container bg-white shadow" style={{ minHeight: "75vh" }}>
              <ColListo />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default IndexFlujo;
