
const Header = () => {
    return (

<header className="header">
<nav className="navbar navbar-expand-sm bg-primary navbar-dark">
  <div className="container-fluid">
      <ul className="navbar-nav">
          <li className="nav-item">
              <a className="nav-link active" href="#">
                <img src="/Imagenes/logo.png" alt="Logo" style={{height: "40px", width: "auto"}} />
              </a>
            </li>

          <li className="nav-item">
              <a className="nav-link" href="/Administrativo/usuarios.html">Administrativo</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/Trabajadores/index.html">Trabajadores</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="./features/inventario/pages/index">Clientes</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/Reporteria/index.html">Reporteria</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/Inventario/index.html">Inventario</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/Finanzas/index.html">Finanzas</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/Ventas/Index.html">Ventas</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/Flujo/Index.html">Control de Flujo</a>
          </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
          <li><a href="#"><i className="bi bi-box-arrow-in-left"></i> Logout</a></li>
        </ul>
  </div>
</nav>
</header>

    )
}

export default Header;