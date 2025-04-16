import React from "react";
import ListaCotizaciones from "../components/ListaCotizaciones";
import ModalAgregarCotizacion from "../components/ModalAgregarCotizacion";

const IndexCotizacion = () => {
    return (
        <div className="p-4 bg-darkest rounded-4 shadow-sm" style={{ minHeight: "88vh" }}>
            <ModalAgregarCotizacion />
            <div className="mt-3">
                <ListaCotizaciones />
            </div>
        </div>
    );
};
export default IndexCotizacion;
