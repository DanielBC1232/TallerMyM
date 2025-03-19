import "../styles/custom.css";
import React from "react";
import Logo from "../assets/Logo.png";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand d-flex align-items-center" href="#page-top">
            <img src={Logo} alt="Logo Taller MyM" width="40" height="40" className="me-2" />
            Taller MyM
          </a>
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
            <ul className="navbar-nav ms-auto my-2 my-lg-0">
              <li className="nav-item"><a className="nav-link" href="#inventario">Inventario</a></li>
              <li className="nav-item"><a className="nav-link" href="#ventas">Ventas</a></li>
              <li className="nav-item"><a className="nav-link" href="#administrador">Administrador</a></li>
              <li className="nav-item"><a className="nav-link" href="#clientes">Clientes</a></li>
              <li className="nav-item"><a className="nav-link" href="#trabajadores">Trabajadores</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;