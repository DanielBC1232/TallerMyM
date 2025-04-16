import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Text } from "rsuite";
import '../styles/tables.css';
// Iconos
import { IoPersonCircle } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { MdCarRepair } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { RiShoppingBagFill } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TbShoppingBagSearch } from "react-icons/tb";
import { MdInventory } from "react-icons/md";
import { LuMailSearch } from "react-icons/lu";
import { AiFillDashboard } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { BsPersonGear } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
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
      <nav id="sidebar" className="sidebar shadow-sm">
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
                <MdCarRepair size="25" /> Ordenes
              </Link>
            </li>

            {/* Clientes */}
            <li className="sidebar-header">Clientes</li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/clientes">
                <MdPerson size="20" className="p-0" /> Lista de clientes
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/vehiculos">
                <FaCar size="20" />Vehiculos
              </Link>
            </li>

            {/* Ventas */}
            <li className="sidebar-header">Ventas</li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/ventas">
              <IoIosCheckmarkCircle size={20}/>Ordenes Finalizadas
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/ventas">
              <RiShoppingBagFill size={20}/>Lista de ventas
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/cotizacion">
              <TbShoppingBagSearch size={20}/>Cotizar
              </Link>
            </li>

            {/* Inventario */}
            <li className="sidebar-header">Inventario</li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/inventario">
              <MdInventory size={20}/>Catalogo de Inventario
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/solicitudes">
              <LuMailSearch size={20}/>Solicitudes de repuestos
              </Link>
            </li>

            {/* Administracion */}
            <li className="sidebar-header">Administracion</li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/Dashboard">
              <AiFillDashboard size={20}/>Dashboard
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/administracion">
              <MdAdminPanelSettings size={20}/>Administracion
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/gastos-operativos">
              <MdOutlineAttachMoney  size={20}/>Gastos Operativos
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/Reportes">
              <TbReportAnalytics size={20}/>Reportes
              </Link>
            </li>
            {/* Trabajadores - Administracion */}
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/trabajadores">
              <BsPersonGear size={20}/> Empleados
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="main">
        <nav className="navbar navbar-expand shadow-sm bg-darkest-secondary">
          <a className="sidebar-toggle text-dark" onClick={toggleSidebar}><GiHamburgerMenu className="text-white" size="xxl" /></a>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white me-2" role="button" id="userDropdown" data-bs-toggle="dropdown">
                  <IoPersonCircle size="20" className="me-2" />{localStorage.getItem("username")}
                </a>
                <div className="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="userDropdown">
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
