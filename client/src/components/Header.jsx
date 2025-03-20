import "../styles/custom.css";
import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
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

    if (window.bootstrap && window.bootstrap.ScrollSpy) {
      new window.bootstrap.ScrollSpy(document.body, {
        target: "#mainNav",
        offset: 100,
      });
    }

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
    <nav className="navbar navbar-expand-xl navbar-light fixed-top py-3" id="mainNav">
      <div className="container px-4 px-lg-5">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={Logo} alt="Logo Taller MyM" width="40" height="40" className="me-2" />
          <span className="fw-bold">Taller MyM</span>
        </a>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarResponsive">
          <ul className="navbar-nav ms-auto my-2 my-lg-0">
            {[
              { name: "Clientes", submenu: ["Módulo Clientes", "Vehículo Clientes"] },
              { name: "Inventario", submenu: ["Productos y Servicios", "Solicitudes"] },
              { name: "Trabajadores", submenu: ["Ingreso Trabajadores", "Ver Trabajadores"] },
              { name: "Administrativo", submenu: ["Módulo Reportería", "Finanzas", "Administrativo"] }
            ].map((menu) => (
              <li className="nav-item dropdown" key={menu.name}>
                <button
                  className="nav-link dropdown-toggle"
                  onClick={() => toggleDropdown(menu.name)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  {menu.name}
                </button>
                {openDropdown === menu.name && (
                  <ul className="dropdown-menu show" style={{ display: "block" }}>
                    {menu.submenu.map((item, index) => (
                      <li key={index}>
                        <span className="dropdown-item">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
