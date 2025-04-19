import { useState, useEffect } from "react";
import { Button, Form, Schema, SelectPicker, DatePicker, Loader } from "rsuite";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import "../styles/agregar.css";
import "../styles/form.css";

export const BASE_URL = import.meta.env.VITE_API_URL;

const { StringType, DateType } = Schema.Types;

const model = Schema.Model({
  FechaInicio: DateType()
    .isRequired("La fecha de inicio es obligatoria")
    .addRule((value, data) => {
      if (value && new Date(value) < new Date().setHours(0, 0, 0, 0)) {
        return "No se pueden solicitar vacaciones en fechas pasadas";
      }
      return true;
    }),
  FechaFin: DateType()
    .isRequired("La fecha de fin es obligatoria")
    .addRule((value, data) => {
      if (value && data.FechaInicio && new Date(value) < new Date(data.FechaInicio)) {
        return "La fecha fin no puede ser anterior a la fecha inicio";
      }
      return true;
    }),
  idTrabajador: StringType().isRequired("El trabajador es obligatorio"),
});

const CreateSolicitud = () => {
  const navigate = useNavigate();
  const [trabajadores, setTrabajadores] = useState([]);
  const [loadingTrabajadores, setLoadingTrabajadores] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorTrabajadores, setErrorTrabajadores] = useState(null);
  const [formValue, setFormValue] = useState({
    FechaInicio: null,
    FechaFin: null,
    idTrabajador: "",
  });

  useEffect(() => {
    const fetchTrabajadores = async () => {
      try {
        setLoadingTrabajadores(true);
        setErrorTrabajadores(null);

        const response = await axios.get(`${BASE_URL}/trabajadores/obteneTrabajadoresMenu`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (response.status !== 200) {
          throw new Error(`Error al cargar trabajadores: ${response.status}`);
        }

        const data = response.data;
        setTrabajadores(
          data.map((trabajador) => ({
            label: trabajador.nombreCompleto,
            value: trabajador.idTrabajador.toString(), // Asegurar que sea string para el SelectPicker
          }))
        );

      } catch (error) {
        console.error("Error:", error);
        setErrorTrabajadores("Error al cargar la lista de trabajadores");

        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            await Swal.fire("Sesión expirada", "Por favor inicie sesión nuevamente", "warning");
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
          }
          if (status === 403) {
            await Swal.fire("Acceso denegado", "No tiene permisos para ver los trabajadores", "error");
            return;
          }
        }

        await Swal.fire("Error", "No se pudo cargar la lista de trabajadores", "error");
      } finally {
        setLoadingTrabajadores(false);
      }
    };

    fetchTrabajadores();
  }, []);

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async () => {
    if (!formValue.FechaInicio || !formValue.FechaFin || !formValue.idTrabajador) {
      await Swal.fire("Error", "Por favor complete todos los campos", "error");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/trabajadores/Solicitud-Vacaciones`,
        {
          fechaInicio: formatDate(formValue.FechaInicio),
          fechaFin: formatDate(formValue.FechaFin),
          idTrabajador: parseInt(formValue.idTrabajador, 10),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error(`Error al registrar la solicitud: ${response.status}`);
      }

      await Swal.fire({
        icon: "success",
        title: "¡Solicitud enviada!",
        text: "Tu solicitud de vacaciones ha sido registrada correctamente.",
        confirmButtonText: "Aceptar",
      });

      navigate("/trabajadores-user");

    } catch (error) {
      console.error("Error en el envío:", error);
      let errorMessage = "Hubo un error al registrar la solicitud.";

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400 && data.error) {
          errorMessage = data.error;
        } else if (status === 401) {
          await Swal.fire("Sesión expirada", "Por favor inicie sesión nuevamente", "warning");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        } else if (status === 403) {
          errorMessage = "No tiene permisos para realizar esta acción.";
        }
      }

      await Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "Aceptar",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingTrabajadores) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Loader size="lg" content="Cargando trabajadores..." />
      </div>
    );
  }

  return (
    <div className="form-container">
      <h4 className="text-center text-primary">Solicitar vacaciones</h4>
      <hr className="text-primary" />

      <Form
        model={model}
        onChange={setFormValue}
        formValue={formValue}
        fluid
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.ControlLabel>Fecha de Inicio</Form.ControlLabel>
          <DatePicker
            name="FechaInicio"
            value={formValue.FechaInicio}
            onChange={(date) => setFormValue({ ...formValue, FechaInicio: date })}
            format="yyyy-MM-dd"
            oneTap
            block
            disabledDate={date => date < new Date().setHours(0, 0, 0, 0)}
          />
          <Form.HelpText>No se permiten fechas pasadas</Form.HelpText>
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
            disabledDate={date => formValue.FechaInicio && date < formValue.FechaInicio}
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
            loading={loadingTrabajadores}
          />
          {errorTrabajadores && (
            <Form.ErrorMessage show={!!errorTrabajadores}>
              {errorTrabajadores}
            </Form.ErrorMessage>
          )}
        </Form.Group>

        <div className="d-flex justify-content-between gap-p">
          <Button className="btn btn-secondary text-white rounded-5 d-flex align-items-center justify-content-center gap-1"
            onClick={() => navigate("/trabajadores-user")}
            disabled={submitting}>
            Cancelar
          </Button>

          <Button className="btn btn-primary text-white rounded-5 d-flex align-items-center justify-content-center gap-1"
            type="submit"
            loading={submitting}
            disabled={submitting || !formValue.FechaInicio || !formValue.FechaFin || !formValue.idTrabajador}>
            {submitting ? 'Enviando...' : 'Enviar Solicitud'}
          </Button>

        </div>
      </Form>
    </div>
  );
};

export default CreateSolicitud;