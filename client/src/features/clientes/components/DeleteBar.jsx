import { useState } from "react";
import { Input, Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "../styles/eliminar.css";

const DeleteBar = () => {
  const [cedula, setCedula] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!cedula) {
      alert("Ingrese una cédula válida");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/clientes/${cedula}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "No se pudo eliminar");
      }

      // Si la eliminación fue exitosa
      alert("Cliente eliminado exitosamente");
      setCedula(""); 
    } catch (error) {
      // Si hubo un error
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Eliminar Cliente</h2>
      <div className="search-container">
        <Input
          placeholder="Ingrese la cédula"
          value={cedula}
          onChange={setCedula}
          className="search-input"
        />
        <Button
          color="red"
          appearance="primary"
          onClick={handleDelete}
          loading={loading}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default DeleteBar;