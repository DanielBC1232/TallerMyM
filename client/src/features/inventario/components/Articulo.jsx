const Articulo = () => {
  return (
    <div className="card article border-0">
      <div className="imgFrame">
        <a href="#">
          <img
            className="card-img-top"
            src="https://www.autofixpr.com/wp-content/uploads/2017/12/3p-disco-freno.jpg"
            alt="Card image"
            style={{ width: "80%" }}
          />
        </a>
      </div>
      <div className="card-body">
        <h5 className="card-title">[Nombre Articulo]</h5>
        <span className="card-text">Categoría: [categoria]</span>
        <br />
        <span className="card-text">Stock: [numero]</span>
      </div>
    </div>
  );
};

export default Articulo;
