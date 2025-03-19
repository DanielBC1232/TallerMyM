import { Navbar, Nav, Image } from "rsuite";
import MoveDownIcon from "@rsuite/icons/MoveDown";
import CogIcon from "@rsuite/icons/legacy/Cog";
import logo from "../assets/Logo.png";
import {Link} from "react-router-dom";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.mi.css"
import Reat from "react"; 

const Header = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props} appearance="inverse" className="navbar navbar-expand-lg navbar-light fixed-top py-3 shadow-sm" id="mainNav">
      <div className="container px-4 px-lg-5">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className="me-2"
            style={{ objectFit: "contain" }}
          />
          Taller MyM
          </Navbar.Brand>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <Nav onSelect={onSelect} activeKey={activeKey} className="navbar-nav ms-auto my-2 my-lg-0">
            <Nav.Menu title="Inventario">
              <Nav.Item as={Link} to="/inventario" eventKey="1">Productos y Servicios</Nav.Item>
              <Nav.Item as={Link} to="/solicitudes" eventKey="1">Solicitudes</Nav.Item>
            </Nav.Menu>
            <Nav.Menu title="Trabajadores">
              <Nav.Item as={Link} to="/trabajadores" eventKey="5">Trabajadores</Nav.Item>
            </Nav.Menu>
            <Nav.Menu title="Clientes">
              <Nav.Item as={Link} to="/clientes/obtenerclientes" eventKey="5">Buscar Ciente</Nav.Item>
              <Nav.Item as={Link} to="/clientes/registrar" eventKey="5">Agregar Cliente</Nav.Item>
              <Nav.Item as={Link} to="/clientes/list-edit" eventKey="5">Editar Cliente</Nav.Item>
              <Nav.Item as={Link} to="/cientes/list-elim" eventKey="5">Eliminar Cliente</Nav.Item>
              <Nav.Item as={Link} to="/vehiculos/Index" eventKey="5">Vehiculos Cliente</Nav.Item>

            </Nav.Menu>
            <Nav.Menu title="Administrativo">
              <Nav.Item as={Link} to="/perfil-crear" eventKey="5">Crear Perfil</Nav.Item>
              <Nav.Item eventKey="5">Reporteria</Nav.Item>
              <Nav.Item eventKey="5">Finanzas</Nav.Item>

            </Nav.Menu>
            <Nav.Menu title="Ventas">
              <Nav.Item as={Link} to="/ventas" eventKey="5">Ventas</Nav.Item>
            </Nav.Menu>
          </Nav>
          <Nav pullRight>
            <Nav.Menu icon={<CogIcon />} title="Ajustes">
              <Nav.Item eventKey="2">
                Cerrar Sesión <MoveDownIcon />
              </Nav.Item>
            </Nav.Menu>
          </Nav>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
