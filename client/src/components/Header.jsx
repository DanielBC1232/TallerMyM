import "../styles/custom.css";
import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para alternar el menú en dispositivos móviles
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Función para reducir el tamaño del navbar cuando se hace scroll
    const navbarShrink = () => {
      const navbarCollapsible = document.querySelector("#mainNav");
      if (!navbarCollapsible) return;
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove("navbar-shrink");
      } else {
        navbarCollapsible.classList.add("navbar-shrink");
      }
    };

    window.addEventListener("scroll", navbarShrink);
    navbarShrink();

    // Cerrar el menú al hacer clic en un enlace en dispositivos móviles
    const navbarToggler = document.querySelector(".navbar-toggler");
    const responsiveNavItems = document.querySelectorAll("#navbarResponsive .nav-link");

    responsiveNavItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (window.getComputedStyle(navbarToggler).display !== "none") {
          navbarToggler.click();
        }
      });
    });

    return () => {
      window.removeEventListener("scroll", navbarShrink);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fixed-top py-3" id="mainNav" style={{ backgroundColor: "#005aa3" }}>
      <div className="container px-4 px-lg-5">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center text-white" href="/">
          <img src={Logo} alt="Logo Taller MyM" width="40" height="40" className="me-2" />
          Taller MyM
        </a>
        <button
          className={`navbar-toggler navbar-toggler-right ${isMenuOpen ? "collapsed" : ""}`}
          type="button"
          onClick={toggleMenu}
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarResponsive">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link text-white" href="/inventario">Inventario</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/flujo">Flujo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/ventas">Ventas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/trabajadores">Trabajadores</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/clientes/Index">Clientes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/vehiculos/Index">Vehículos</a>
            </li>
          </ul>

          {/* Botón de perfil alineado a la derecha */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link btn btn-outline-light" href="/perfil-crear">Perfil</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
