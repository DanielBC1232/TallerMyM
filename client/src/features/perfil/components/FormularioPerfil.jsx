import React, { useState } from "react";

const FormularioPerfil = ({ onSubmit }) => {
  const [isValidated, setIsValidated] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    if (!form.checkValidity()) {
      setIsValidated(true);
      return;
    }

    const email = document.getElementById("email").value;
    const nombre = document.getElementById("firstName").value;
    const role = document.querySelector('input[name="role"]:checked')?.value;

    onSubmit({ email, nombre, role });
  };

  const checkEmail = async () => {
    const email = document.getElementById("email").value;

    try {
      const response = await fetch("http://localhost:3000/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.status === 400) {
        setEmailError("El correo ya está registrado.");
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error("Error verificando el correo:", error);
    }
  };

  return (
    <form className={`needs-validation ${isValidated ? "was-validated" : ""}`} noValidate onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="firstName" required />
          <div className="invalid-feedback">Ingrese un nombre válido.</div>
        </div>

        <div className="col-sm-6">
          <label htmlFor="lastName" className="form-label">Apellidos</label>
          <input type="text" className="form-control" id="lastName" required />
          <div className="invalid-feedback">Ingrese apellidos válidos.</div>
        </div>

        <div className="col-12">
          <label htmlFor="email" className="form-label">Correo</label>
          <input type="email" className="form-control" id="email" required onBlur={checkEmail} />
          <div className="invalid-feedback">Ingrese un correo válido.</div>
          {emailError && <div className="invalid-feedback d-block">{emailError}</div>}
        </div>
      </div>

      <hr className="my-4" />

      <h4 className="mb-3">Rol</h4>
      <div className="my-3">
        {["Mecánico", "Cliente", "Gerente", "Director", "Sector Financiero"].map((role, index) => (
          <div className="form-check" key={index}>
            <input id={`role${index}`} name="role" type="radio" className="form-check-input" value={role} required />
            <label className="form-check-label" htmlFor={`role${index}`}>{role}</label>
          </div>
        ))}
      </div>

      <hr className="my-4" />
      <button className="w-100 btn btn-primary btn-lg" type="submit">Crear perfil</button>
    </form>
  );
};

export default FormularioPerfil;