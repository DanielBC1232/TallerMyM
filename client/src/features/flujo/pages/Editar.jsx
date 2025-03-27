/*import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "rsuite";
import "../styles/flu.css";
import Swal from "sweetalert2";
import axios from "axios";
import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";

import SelectTrabajadores from "../components/SelectTrabajadores";

//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const Editar = () => {
  const { idOrden } = useParams();
  const navigate = useNavigate(); // Hook para navegar
  const [verificaCambioFecha, setVerificaCambioFecha] = useState({
    tiempoEstimadoInicial: ""
  });
  const [formData, setFormData] = useState({
    tiempoEstimado: "",
    idTrabajador: null,
    descripcion: "",
    estadoAtrasado: 0
  });

  const errorNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      showConfirmButton: false,
    });
  };
  // --- Verificaciones de campos ---
  const VerificarTiempoEstimado = () => {
    if (!formData.tiempoEstimado) {
      errorNotification("Campo de tiempo estimado vacío");
      return false;
    }
    return true;
  };
  const verificarTrabajador = () => {
    var pass = false;
    //Campo Marca
    if (!formData.idTrabajador) {
      pass = false;
      errorNotification("Debe asignar un mecanico encargado");
    } else if (formData.idTrabajador) {
      pass = true;
    }
    return pass;
  };

  // VERIFICACION GENERAL
  const verificacion = () => {
    var pass = false;
    //Verificar que todos los campos sean validos
    if (
      VerificarTiempoEstimado() &&
      verificarTrabajador()
    ) {
      pass = true;
    } else {
      pass = false;
    }
    return pass;
  };

  useEffect(() => {
    const obtenerOrden = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/flujo/obtener-orden/${idOrden}`
        ); //consumir api en backend por id
        setFormData((prev) => ({
          ...prev,//Mantener valores predefinidos
          tiempoEstimado: moment(data.timepoEstimadoOriginal).format('YYYY-MM-DD'),
          idTrabajador: data.idTrabajador,
          descripcion: data.decripcion,
          estadoAtrasado: data.estadoAtrasado
        }));
        setVerificaCambioFecha((prev) => ({
          ...prev,//Mantener valores predefinidos
          tiempoEstimadoInicial: moment(data.timepoEstimadoOriginal).format('YYYY-MM-DD'),
        }));
        console.log(data); // imprimir JSON en consola
      } catch (error) {
        console.error("Error al obtener el orden:", error);
      }
    };
    console.log(FormData);

    obtenerOrden(); // llamar funcion
  }, [idOrden]);//cargar al tener id

function comprobarCambioFecha(){
  //si se actualiza la fecha.
  if (formData.tiempoEstimado != verificaCambioFecha.tiempoEstimadoInicial) {

    //El estado atrasado se reinicia a false
    setFormData((prev) => ({
      ...prev,//Mantener valores predefinidos
      estadoAtrasado: 0
    }));

  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (verificacion()) {

      comprobarCambioFecha();
      
      try {
        const { res } = await axios.post(`${BASE_URL}/flujo/obtener-orden/`, formData);
        setFormData(res);
        console.log(res.data);

        if (res.status === 201) {
          await Swal.fire({
            icon: "success",
            title: "Orden agregada correctamente",
            showConfirmButton: false,
            timer: 1300,
          });
          navigate(`/flujo-editar/${idOrden}`);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Ocurrió un problema al procesar la solicitud",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          let message = "Error al agregar la orden";
          if (status === 400) {
            message = "Solicitud incorrecta, por favor verifique los datos ingresados";
          } else if (status === 404) {
            message = "No se encontró el recurso solicitado";
          } else if (status === 500) {
            message = "Error interno del servidor, por favor intente más tarde";
          }
          Swal.fire({
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error desconocido, por favor intente más tarde",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container main p-5">
        <Grid fluid>
          <Row
            className="show-grid d-flex justify-content-center align-items-center"
            gutter={16}
          >
            <Col
              xs={16}
              className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3"
            >
              <Row className="show-grid" gutter={16}>
                <Col xs={12} className="column">
                  <span>
                    Seleccionar un mecánico
                    <SelectTrabajadores
                      value={formData.idTrabajador}
                      onChange={(e) => setFormData(prev => ({ ...prev, idTrabajador: e.target.value }))}
                    />
                  </span>
                </Col>
                <Col xs={12} className="column">
                  <span>
                    Estimado de finalización:
                    <input
                      type="date"
                      className="form-control"
                      style={{ maxWidth: "225px" }}
                      name="tiempoEstimado"
                      value={formData.tiempoEstimado}
                      onChange={(e) => setFormData(prev => ({ ...prev, tiempoEstimado: e.target.value }))}
                    />
                  </span>
                </Col>
              </Row>
              <div className="d-grid justify-content-end me-5">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ maxWidth: "120px" }}
                >
                  Agregar
                </button>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </form>
  );
};

export default Editar;*/
