import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/form.css";

export const BASE_URL = import.meta.env.VITE_API_URL;

const AgregarUsuario = () => {
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, password2 } = formValue;

    // Validación de campos obligatorios
    if (!username || !email || !password || !password2) {
      Swal.fire("Advertencia", "Todos los campos son obligatorios", "warning");
      return;
    }

    // Validar que las contraseñas sean iguales
    if (password !== password2) {
      Swal.fire("Advertencia", "Las contraseñas no coinciden", "warning");
      return;
    }

    const payload = { username, email, password };

    try {
      const response = await axios.post(`${BASE_URL}/admin/registrar-usuario`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Éxito",
          text: "Usuario registrado exitosamente",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          setFormValue({
            username: "",
            email: "",
            password: "",
            password2: "",
          });
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire("Advertencia", "El correo ya existe", "warning");
      } else {
        console.error("Error al registrar el usuario", error);
        Swal.fire("Error", "Hubo un error al registrar el usuario", "error");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Registrar Usuario</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }} className="mx-auto">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de usuario:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formValue.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password2" className="form-label">
            Confirmar Contraseña:
          </label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={formValue.password2}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default AgregarUsuario;
