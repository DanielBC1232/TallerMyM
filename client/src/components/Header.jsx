import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Text } from "rsuite";
// Iconos
import { FiAlignLeft } from "react-icons/fi";
//Iconos
const Header = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const toggleSidebar = (e) => {
    e.preventDefault();
    setSidebarCollapsed((prev) => !prev);
  };
  return (
    <div className={`wrapper ${sidebarCollapsed ? "collapsed" : ""}`}>
      <nav id="sidebar" className="sidebar">
        <div className="sidebar-content">
          <Link className="sidebar-brand" to="/">
            Taller MyM
          </Link>
          {/* icono *** */}
          <hr className="text-primary mx-3 m-0"></hr>
          <ul className="sidebar-nav">
            {/* Flujo */}
            <li className="sidebar-header">Flujo de Trabajo</li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/flujo">
                Ordenes
              </Link>
            </li>

            {/* Clientes */}
            <li className="sidebar-header">Clientes</li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/clientes">
                Lista de clientes
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/vehiculos">
                Vehiculos
              </Link>
            </li>

            {/* Ventas */}
            <li className="sidebar-header">Ventas</li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/ventas">
                Ordenes Finalizadas
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/ventas">
                Lista de ventas
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/cotizacion">
                Cotizar
              </Link>
            </li>

            {/* Inventario */}
            <li className="sidebar-header">Inventario</li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/inventario">
                Catalogo de Inventario
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/solicitudes">
                Solicitudes de repuestos
              </Link>
            </li>

            {/* Administracion */}
            <li className="sidebar-header">Administracion</li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/Dashboard">
                Dashboard
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/administracion">
                Administracion
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/Reportes">
                Reportes
              </Link>
            </li>
            {/* Trabajadores - Administracion */}
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/trabajadores">
                Empleados
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="main">
        <nav className="navbar navbar-expand navbar-light">
          <a className="sidebar-toggle"
            href="#"
            onClick={toggleSidebar}><FiAlignLeft /></a>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" role="button" id="userDropdown" data-bs-toggle="dropdown">
                  {localStorage.getItem("username")}
                </a>
                <div className="dropdown-menu dropdown-menu-end border-0 shadow" aria-labelledby="userDropdown">
                  <button id="logout-option" className="dropdown-item custom-logout" onClick={handleLogout}>
                    <Text size='md'>Cerrar Sesión</Text>
                  </button>
                </div>
              </li>
            </ul>
          </div>

        </nav>
        <div className="content-wrapper p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Header;
