import React from "react";
import FormularioPerfil from "../components/FormularioPerfil";

const CrearPerfil = () => {
  const handleFormSubmit = async (data) => {
    if (!data.email) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/email/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email : data.email}),
      });
    
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Error al verificar el correo.");
      }
    
      alert("Correo verificado correctamente.");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert(`Hubo un error al intentar enviar el correo: ${error.message}`);
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