import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, DatePicker, Input, InputNumber } from "rsuite";
import "rsuite/dist/rsuite.min.css";

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const EditarVacaciones = () => {
  const { idVacaciones } = useParams();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    solicitud: "",
    fechaInicio: undefined,
    fechaFin: undefined,
    motivoRechazo: "",
    idTrabajador: "",
  });

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/trabajadores/obtenerSolicitudVacacion/${idVacaciones}`
        );

        setFormValue({
          solicitud: response.data.solicitud || "",
          fechaInicio: response.data.fechaInicio ? new Date(response.data.fechaInicio) : undefined,
          fechaFin: response.data.fechaFin ? new Date(response.data.fechaFin) : undefined,
          motivoRechazo: response.data.motivoRechazo || "",
          idTrabajador: response.data.idTrabajador || ""
        });
      } catch (error) {
        console.error("Error al cargar datos:", error);
        alert("Error al obtener la solicitud");
      }
    };
    cargarDatos();
  }, [idVacaciones]);

  // Funcionalidades botes

  //Handle de Guardar
  const handleSubmit = async () => {
    console.log("Datos a enviar",formValue)
    try {
      const datosActualizados = {
        ...formValue,
        fechaInicio: formValue.fechaInicio?.toISOString(),
        fechaFin: formValue.fechaFin?.toISOString(),
      };
      //se envian los datos
      console.log("Datos a enviar",datosActualizados)

      await axios.put(`${BASE_URL}/trabajadores/Edit-Vacaciones/${idVacaciones}`,datosActualizados);
      alert("Solicitud actualizada correctamente");
      navigate("/GestionarSolicitud-Vacaciones");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al actualizar la solicitud front");
    }
  };

  //---Aprobar
  const handleAprobar = async () => {
    console.log("Datos a enviar",idVacaciones)
    try {      
      //se envian los datos
      await axios.put(`${BASE_URL}/trabajadores/Aprob-Vacaciones/${idVacaciones}` );
      alert("Solicitud aprobada correctamente");
      navigate("/GestionarSolicitud-Vacaciones");
    } catch (error) {
      console.error("Error al aprobar:", error);
      alert("Error al aprobar la solicitud front");
    }
  };

  //---Rechazar
  const handleRechazar = async () => {
    if (!formValue.motivoRechazo) {
      alert("Debe ingresar un motivo de rechazo");
      return;
    }
    try {
      const datosActualizados = {...formValue};
      await axios.put(`${BASE_URL}/trabajadores/Rechazar-Vacaciones/${idVacaciones}`,datosActualizados);
      alert("Solicitud rechazada");
      navigate("/GestionarSolicitud-Vacaciones");
    } catch (error) {
      console.error("Error al rechazar:", error);
      alert("Error al rechazar");
    }
  };

    //Eliminar
  const handleEliminar = async () => {
    if (!confirm("¿Está seguro de eliminar esta solicitud?")) return;
    try {
      await axios.delete(`${BASE_URL}/trabajadores/Elim-Vacaciones/${idVacaciones}`);
      alert("Solicitud eliminada");
      navigate("/GestionarSolicitud-Vacaciones");
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar");
    }
  };
  //

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Editar Solicitud de Vacaciones
      </h1>

      <Form
        formValue={formValue}
        onChange={setFormValue}
        onSubmit={handleSubmit}
        fluid
      >
        {/* Campo: Estado de Solicitud */}
        <Form.Group controlId="solicitud">
          <Form.ControlLabel>Estado de Solicitud</Form.ControlLabel>
          <Form.Control
            name="solicitud"
            accepter={Input}
            placeholder="Ej: Aprobada, Pendiente, Rechazada"
          />
        </Form.Group>

        {/* Campos de Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Group controlId="fechaInicio">
            <Form.ControlLabel>Fecha de Inicio</Form.ControlLabel>
            <Form.Control
              name="fechaInicio"
              accepter={DatePicker}
              format="yyyy-MM-dd"
              cleanable={false}
              style={{ width: "100%" }}
              value={formValue.fechaInicio || null}
            />
          </Form.Group>

          <Form.Group controlId="fechaFin">
            <Form.ControlLabel>Fecha Fin</Form.ControlLabel>
            <Form.Control
              name="fechaFin"
              accepter={DatePicker}
              format="yyyy-MM-dd"
              cleanable={false}
              style={{ width: "100%" }}
              value={formValue.fechaFin || null}
            />
          </Form.Group>
        </div>

        {/* Campo: Motivo de Rechazo */}
        <Form.Group controlId="motivoRechazo">
          <Form.ControlLabel>Motivo de Rechazo</Form.ControlLabel>
          <Form.Control
            name="motivoRechazo"
            accepter={Input}
            placeholder="No ha sido rechazado"
          />
        </Form.Group>

        {/* Campo: ID Trabajador */}
        <Form.Group controlId="idTrabajador">
          <Form.ControlLabel>ID del Trabajador</Form.ControlLabel>
          <Form.Control
            name="idTrabajador"
            accepter={InputNumber}
            min={1}
            style={{ width: "100%" }}
          />
        </Form.Group>

        {/* Botones --------de-------- Acción */}
        <div className="flex flex-wrap gap-2 mt-6">
          {/* Guardar (Verde) */}
          <Button
            appearance="default"
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "4px 8px",
              fontSize: "18px",
              margin: 10
            }}
            onClick={handleSubmit}
          >
            Guardar
          </Button>

          {/* Aprobar (Azul) */}
          <Button
            appearance="default"
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "4px 8px",
              fontSize: "18px",
              margin: 10
            }}
            onClick={handleAprobar}
          >
            Aprobar
          </Button>

          {/* Rechazar (Naranja) */}
          <Button
            appearance="default"
            style={{
              backgroundColor: "#f97316",
              color: "white",
              padding: "4px 8px",
              fontSize: "18px",
              margin: 10
            }}
            onClick={handleRechazar}
          >
            Rechazar
          </Button>
            <br></br>
          {/* Eliminar (Rojo) */}
          <Button
            appearance="default"
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "4px 8px",
              fontSize: "18px",
              margin: 10
            }}
            onClick={handleEliminar}
          >
            Eliminar
          </Button>

          {/* Cancelar (Gris) */}
          <Button
            appearance="default"
            style={{
              backgroundColor: "#646464",
              color: "white",
              borderColor: "#d1d5db",
              padding: "4px 8px",
              fontSize: "18px",
              margin: 10
            }}
            onClick={() => navigate("/GestionarSolicitud-Vacaciones")}
          >
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditarVacaciones;
