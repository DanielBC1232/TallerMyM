import DropdownVehiculos from "../components/DropDownVehiculos";
import SelectCategoria from "../components/SelectCategoria";
import SelectMarca from "../components/SelectMarca";
import SelectProveedor from "../components/SelectProveedor";
import SubirImagen from "../components/SubirImagen";

import {
  Button,
  DateInput,
  Stack,
  Input,
  InputGroup,
  InputNumber,
  Grid,
  Row,
  Col
} from "rsuite";

import "../styles/inv.css";

const styles = {
  width: 225,
};

const Editar = () => {
  return (
    <div className="container main mx-auto p-5">
      <Grid fluid>
        <Row className="show-grid" gutter={16}>
          <Col xs={6}>
            <SubirImagen />
          </Col>

          <Col
            xs={16}
            className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3"
          >
            <Row className="show-grid" gutter={16}>
              <Col xs={12} className="column">
                <span>
                  <span>Nombre:</span>
                  <Input id="idNombre" style={styles} />
                </span>

                <SelectMarca />

                <DropdownVehiculos />

                <SelectCategoria />

                <SelectProveedor />
              </Col>

              <Col xs={12} className="column">
                <span>
                  <span>Precio:</span>
                  <InputGroup inside style={styles}>
                    <InputGroup.Addon>₡</InputGroup.Addon>
                    <InputNumber
                      id="idPrecio"
                      min={0}
                      step={100}
                      decimalSeparator="."
                    />
                  </InputGroup>
                </span>

                <span>
                  <span>Fecha de ingreso:</span>
                  <Stack
                    spacing={10}
                    direction="column"
                    alignItems="flex-start"
                  >
                    <DateInput defaultValue={new Date()} style={styles} />
                  </Stack>
                </span>

                <span>
                  <span>Ubicacion Almacen:</span>
                  <Input id="idUbicacion" style={styles} />
                </span>

                <span>
                  <span>Stock:</span>
                  <InputNumber id="idStock" min={0} inside style={styles} />
                </span>

                <span>
                  <span>Descripcion:</span>
                  <Input
                    id="idDescripcion"
                    as="textarea"
                    rows={3}
                    style={styles}
                  />
                </span>

                <div className="d-flex justify-content-center d-grid gap-3 my-5 me-5">
                  <Button className="btn btn-primary edit-btn text-white">
                    Agregar
                  </Button>
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

export default Editar;
