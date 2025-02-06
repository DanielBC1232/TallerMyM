import SelectVehiculos from "../components/SelectVehiculos";
import SelectCategoria from "../components/SelectCategoria";
import SelectMarca from "../components/SelectMarca";
import SelectProveedor from "../components/SelectProveedor";
import SelectStock from "../components/SelectStock";

import {
  Button,
  Image,
  DateInput,
  Stack,
  Input,
  InputGroup,
  InputNumber,
  Grid,
  Row,
  Col,
} from "rsuite";

import "../styles/inv.css";

const styles = {
  width: 225,
};

const Detalles = () => {
  return (
    <div className="container main mx-auto p-5">
      <Grid fluid>
        <Row className="show-grid" gutter={16}>
          <Col xs={8}>
            {/* img */}
            <div className="imgDetalle">
              <Image
                rounded
                src="https://i.pinimg.com/236x/46/77/d7/4677d73a1ab9d63db490196ddb2a7358.jpg"
                alt="brown french bulldog puppy lying on yellow textile"
                width={130}
                className="shadow-sm"
              />
            </div>
          </Col>

          <Col xs={12} className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3" >
            <Row className="show-grid" gutter={16}>
              <Col xs={12} className="column">
                <span>
                  <span>Nombre:</span>
                  <Input id="idNombre" style={styles} readOnly/>
                </span>

                <span>
                  <span>Marca:</span>
                  <Input id="idMarca" style={styles} readOnly/>
                </span>

                <span>
                  <span>Vehiculos compatibles:</span>
                  <Input id="idCompatibles" style={styles} readOnly/>
                </span>

                <span>
                  <span>Categoría:</span>
                  <Input id="idCategoria" style={styles} readOnly/>
                </span>

                <span>
                  <span>Proveedor:</span>
                  <Input id="idProveedor" style={styles} readOnly/>
                </span>
              </Col>

              <Col xs={12} className="column">
                <span>
                  <span>Precio:</span>
                  <InputGroup inside style={styles}>
                    <InputGroup.Addon>₡</InputGroup.Addon>
                    <Input id="idPrecio" readOnly/>
                  </InputGroup>
                </span>

                <span>
                  <span>Fecha de ingreso:</span>
                  <Stack
                    spacing={10}
                    direction="column"
                    alignItems="flex-start"
                  >
                    <DateInput defaultValue={new Date()} style={styles} readOnly/>
                  </Stack>
                </span>

                <span>
                  <span>Ubicacion Almacen:</span>
                  <Input id="idUbicacion" style={styles} readOnly/>
                </span>

                <span>
                  <span>Stock:</span>
                  <Input id="idStock" style={styles} readOnly/>
                </span>

                <span>
                  <span>Descripcion:</span>
                  <Input
                    id="idDescripcion"
                    as="textarea"
                    rows={3}
                    style={styles}
                  readOnly/>
                </span>

                <div className="d-flex justify-content-center d-grid gap-3 my-5 me-5">
                <Button className="btn btn-warning return-btn text-white">Editar</Button>

                  <Button className="btn btn-dark return-btn">Volver</Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Detalles;
