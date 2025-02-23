import { Card, VStack, Text, Row, Col } from "rsuite";
import { Link } from "react-router-dom";
//Traer listado orden FIFO (antiguo primero)

//Map del resultado y lista cada orden

const OrdenEnProceso = () => {
  return (
    <VStack spacing={10} style={{ all: 'unset' }}>

      <Link to="#">
        <Card size="sm" className="card">
          <Row className="card-header p-0 mb-1">
            <Col xs={12}>
              <Card.Header as="h6" className="text-white">
                Orden: [#Orden]
              </Card.Header>
            </Col>
            <Col xs={12}>
              <Card.Header as="h6" className="text-white">
                Restante: [Tiempo]
              </Card.Header>
            </Col>
          </Row>
          <Card.Body>
            <Row className="ms-4">
              <Col xs={12}>
                <Text size="sm" className="d-grid justify-content-start">
                  Vehiculo: [Modelo]
                </Text>
                <Text size="sm" className="d-grid justify-content-start">
                  Fecha de Ingreso: [Fecha]
                </Text>
              </Col>
              <Col xs={12}>
                <Text size="sm" className="d-grid justify-content-start">
                  Encargado: [Nombre Mecanico]
                </Text>
                <Text size="sm" className="d-grid justify-content-start">
                  Cliente: [Nombre Cliente]
                </Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Link>

    </VStack>
  );
};
export default OrdenEnProceso;
