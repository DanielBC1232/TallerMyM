import { useState, useEffect } from "react";
import { Button, Form, Schema, SelectPicker, DatePicker } from "rsuite";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "../styles/agregar.css";
import "../styles/form.css";

export const BASE_URL = import.meta.env.VITE_API_URL;

const { StringType, DateType } = Schema.Types;

const model = Schema.Model({
  FechaInicio: DateType().isRequired("La fecha de inicio es obligatoria"),
  FechaFin: DateType().isRequired("La fecha de fin es obligatoria"),
  idTrabajador: StringType().isRequired("El trabajador es obligatorio"),
});

const CreateSolicitud = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    FechaInicio: null,
    FechaFin: null,
    idTrabajador: "",
  });

  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        const response = await fetch("http://localhost:3000/trabajadores/obteneTrabajadoresMenu");
        if (!response.ok) throw new Error("Error al cargar trabajadores");
        const data = await response.json();

        setTrabajadores(
          data.map((trabajador) => ({
            label: trabajador.nombreCompleto,
            value: trabajador.idTrabajador,
          }))
        );
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "No se pudo cargar la lista de trabajadores", "error");
      }
    };

    fetchTrabajadores();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/trabajadores/Solicitud-Vacaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fechaInicio: formValue.FechaInicio?.toISOString().split("T")[0],
          fechaFin: formValue.FechaFin?.toISOString().split("T")[0],
          idTrabajador: Number(formValue.idTrabajador),
        }),
      });

      if (!response.ok) throw new Error("Error al registrar la solicitud");

      await Swal.fire({
        icon: "success",
        title: "¡Registrado!",
        text: "Solicitud registrada exitosamente.",
        confirmButtonText: "Aceptar",
      });

      navigate("/trabajadores-user");
    } catch (error) {
      console.error("Error en el envío:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al registrar la solicitud.",
        confirmButtonText: "Aceptar",
      });

      // Redirigir igualmente aunque haya error
      navigate("/trabajadores-user");
    }
  };

  return (
    <div className="form-container">
      <Form model={model} onChange={setFormValue} formValue={formValue} fluid>
        <Form.Group>
          <Form.ControlLabel>Fecha de Inicio</Form.ControlLabel>
          <DatePicker
            name="FechaInicio"
            value={formValue.FechaInicio}
            onChange={(date) => setFormValue({ ...formValue, FechaInicio: date })}
            format="yyyy-MM-dd"
            oneTap
            block
          />
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel>Fecha Fin</Form.ControlLabel>
          <DatePicker
            name="FechaFin"
            value={formValue.FechaFin}
            onChange={(date) => setFormValue({ ...formValue, FechaFin: date })}
            format="yyyy-MM-dd"
            oneTap
            block
          />
        </Form.Group>

        <Form.Group>
          <Form.ControlLabel>Seleccionar Trabajador</Form.ControlLabel>
          <SelectPicker
            data={trabajadores}
            name="idTrabajador"
            value={formValue.idTrabajador}
            onChange={(value) => setFormValue({ ...formValue, idTrabajador: value })}
            placeholder="Seleccione un trabajador"
            block
          />
        </Form.Group>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <Button appearance="primary" onClick={handleSubmit}>
            Registrar
          </Button>
          <Button appearance="default" onClick={() => navigate("/trabajadores-user")}>
            Regresar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateSolicitud;
