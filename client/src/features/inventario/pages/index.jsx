import Articulo from "../components/Articulo";
import SelectCategoria from "../components/SelectCategoria";
import SelectStock from "../components/SelectStock";
import SelectMarca from "../components/SelectMarca";
import VehiculosCompatibles from "../components/VehiculosCompatibles";
import RangoPrecio from "../components/RangoPrecio";

import {Button ,Grid, Row, Col, FlexboxGrid, Input, Divider} from "rsuite";

import "../styles/inv.css";

const onSubmit = (data) => {
  console.log(data);
};


const IndexInventario = () => {
  return (
    <div className="grid-container">
      <nav className="sidebar p-4 rounded-3 shadow-sm">
        <div className="mt-3">
        <Input id="idNombre" placeholder="Buscar por nombre" />
      </div>
        <br/>
        <div className="row my-2 d-flex justify-content-center">
          <Grid fluid>
            <FlexboxGrid justify="start">
              <Row className="show-grid">
                <Col xs={12}>
                  <SelectCategoria />
                </Col>
                <Col xs={12}>
                  <SelectMarca />
                </Col>
              </Row>
            </FlexboxGrid>
            <br/>
            <FlexboxGrid justify="start">
              <Row className="show-grid">
                <Col xs={12}>
                  <SelectStock />
                </Col>
                <Col xs={12}>
                  <VehiculosCompatibles />
                </Col>
              </Row>
            </FlexboxGrid>
          </Grid>
            </div>
            <br/>
        <div className="row mb-4">
          <RangoPrecio />
        </div>

        <div className="d-flex flex-column gap-4 mb-4">
          <Button className="btn btn-sm btn-primary px-5 text-white">
            Buscar
          </Button>
        </div>

        <div className="row mx-1">
          <Divider />
          <Button className="btn btn-sm btn-primary px-5 text-white">
            Agregar Repuesto/Servicio
          </Button>
        </div>
      </nav>
      <div className="main rounded-3 p-3">
        <div className="article-container article-scroll">
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
        </div>
      </div>
    </div>
  );
};

export default IndexInventario;
