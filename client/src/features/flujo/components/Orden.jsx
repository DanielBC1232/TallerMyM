import { Card, Text, Row, Col } from "rsuite";
import { Link } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import { IoDocumentText } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FiTool } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";

const Orden = ({ datos }) => {
    //console.log(datos);
    return (
        datos.map((orden) => (
            <Link key={orden.idOrden} to={`/flujo-detalles/${orden.idOrden}`}>
                <Card size="sm" className="card bg-darkest-secondary shadow-sm p-0 rounded-4" style={{
                        width: '100%',
                        minHeight: '200px',
                        maxWidth: '100%',
                        boxSizing: 'border-box'
                    }}>
                    <Row className="card-header p-0 mb-1 bg-darkest pb-2">
                        <Col xs={12}>
                            <Card.Header className=" ms-3 text-white">
                                <Text size="md" className="text-start mb-1 text-success" weight="semibold" style={{ color: "#FFF" }}><IoDocumentText /> Orden:</Text>
                                <Text size="sm" className="text-start" weight="medium" style={{ color: "#FFF" }}>{orden.codigoOrden}</Text>
                            </Card.Header>
                        </Col>
                        <Col xs={12}>
                            <Card.Header className="text-white">
                                <Text size="md" className="text-start text-success mb-1" weight="semibold" style={{ color: "#FFF" }}><IoMdTime /> Restante:</Text>
                                <Text size="sm" className="text-start" weight="medium" style={{ color: "#FFF" }}>
                                    {orden.TiempoRestante}
                                </Text>
                            </Card.Header>
                        </Col>
                    </Row>
                    <Card.Body style={{ minHeight: "150px" }}>
                        <Row className="ms-2 p-2">
                            <Col xs={12}>
                                <div className="d-grid text-start mb-2">
                                    <Text size="md" className="text-start text-white" weight="medium"><FaCar /> Vehiculo:</Text>
                                    <Text muted size="sm">{orden.marcaVehiculo + " " + orden.modeloVehiculo + " " + orden.annoVehiculo}</Text>
                                </div>
                                <div className="d-grid text-start">
                                    <Text size="md" className="text-start text-white" weight="medium"><CiCalendarDate /> Fecha de Ingreso:</Text>
                                    <Text muted size="sm">{orden.fechaIngreso}</Text>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="d-grid text-start mb-2">
                                    <Text size="md" className="text-start text-white" weight="medium"><FiTool /> Encargado:</Text>
                                    <Text muted size="sm">{orden.nombreMecanico}</Text>
                                </div>
                                <div className="d-grid text-start">
                                    <Text size="md" className="text-start text-white" weight="medium"><IoPersonSharp /> Cliente:</Text>
                                    <Text muted size="sm">{orden.nombreCliente}</Text>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Link>
        ))
    );
};
export default Orden;
