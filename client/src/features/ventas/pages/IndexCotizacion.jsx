import React, { useState, useEffect } from "react";
import { Button, Grid, Row, Col, Divider } from "rsuite";
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import axios from "axios";

import ListaCotizaciones from "../components/ListaCotizaciones";
import ModalAgregarCotizacion from "../components/ModalAgregarCotizacion";

const IndexCotizacion = () => {
    return (
        <div className="grid-container">
            <nav
                className="sidebar p-4 rounded-3 shadow-sm"
                style={{ maxWidth: "550px" }}
            >
                <form>
                    <br />
                    <div className="row my-2 d-flex justify-content-center">
                    </div>
                    <br />
                    <div className="row mx-1">
                        <div>
                            <Row gutter={10}>
                                <Col xs={11}>
                                    <ModalAgregarCotizacion />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </form>
            </nav>
            <div className="main rounded-3">
                <div className="article-scroll">
                    <ListaCotizaciones />
                </div>
            </div>
        </div>
    );
};
export default IndexCotizacion;
