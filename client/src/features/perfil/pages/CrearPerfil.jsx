import React from "react";
import FormularioPerfil from "../components/FormularioPerfil";

const CrearPerfil = () => {
  const handleFormSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Perfil creado y correo enviado correctamente.");
      } else {
        alert("Error al enviar el correo.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Crear Perfil</h2>
          <p className="lead">Complete el formulario para crear un perfil de usuario</p>
        </div>

        <FormularioPerfil onSubmit={handleFormSubmit} />
      </main>
    </div>
  );
};

export default CrearPerfil;

