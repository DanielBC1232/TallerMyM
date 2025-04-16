import React, { useState, useEffect } from "react";
import { Text, Modal, Button } from "rsuite";
import axios from "axios";
import Swal from "sweetalert2";
import SelectMarca from "../../inventario/components/SelectMarca";
import SelectCategoria from "../../inventario/components/SelectCategoria";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const SelectProductos = ({ idVenta }) => {
    const [productos, setProductos] = useState({});//listado
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Verificacion si existe un pago asociado a la venta
    const [existePago, setExistePago] = useState(false);
    useEffect(() => {
        const verificarPago = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/ventas/existe-pago/${idVenta}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}` // Agregar el token JWT en los encabezados
                    }
                });
                setExistePago(response.data === true);
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        Swal.fire({
                            icon: "warning",
                            title: "Advertencia",
                            text: "Operación no Autorizada",
                            showConfirmButton: false,
                        });
                        navigate("/login"); // Redirigir al login si el token es inválido o no hay sesión activa
                    } else if (error.response.status === 403) {
                        Swal.fire({
                            icon: "warning",
                            title: "Autenticación",
                            text: "Sesión expirada",
                            showConfirmButton: false,
                        });
                        localStorage.clear();
                        navigate("/login"); // Redirigir al login si la sesión ha expirado
                    } else {
                        console.error("Error al verificar pago:", error);
                    }
                } else {
                    console.error("Error de conexión", error);
                }
                setExistePago(false); // En caso de error asumimos que no hay pago
            }

        };
        verificarPago();

    }, [idVenta]);
    //console.log(existePago);

    const [formData, setFormData] = useState({//Parametros para filtro
        nombre: "",
        marca: "",
        categoria: ""
    });
    const [formDataPost, setFormDataPost] = useState({
        idVenta: parseInt(idVenta),
        idProducto: parseInt(null),
        cantidad: 1 || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangePost = (e) => {
        const { name, value } = e.target;
        setFormDataPost({
            ...formDataPost,
            [name]: parseInt(value) || ""
        });
    };

    const handleBuscar = () => {
        obtenerDatos();
    };

    const obtenerDatos = async () => {
        try {
            setLoading(true); // Empieza la carga
            const { data } = await axios.post(`${BASE_URL}/productos/`, formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Agregar el token JWT en los encabezados
                }
            });
            setProductos(data);
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    Swal.fire({
                        icon: "warning",
                        title: "Advertencia",
                        text: "Operación no Autorizada",
                        showConfirmButton: false,
                    });
                    navigate("/login"); // Redirigir al login si el token es inválido o no hay sesión activa
                } else if (error.response.status === 403) {
                    Swal.fire({
                        icon: "warning",
                        title: "Autenticación",
                        text: "Sesión expirada",
                        showConfirmButton: false,
                    });
                    localStorage.clear();
                    navigate("/login"); // Redirigir al login si la sesión ha expirado
                } else {
                    console.error("Error al obtener datos:", error);
                }
            } else {
                console.error("Error de conexión", error);
            }
        } finally {
            setLoading(false); // Termina la carga
        }

    };

    async function AgregarProducto(id) {
        await setFormDataPost({
            ...formDataPost,
            idProducto: id,

        });
        handleOpen(true);
    }

    const verificarCantidad = () => {
        if (!formDataPost.cantidad > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Debe ingresar la cantidad del producto'
            });
            return false;
        }
        return true;
    };

    //form enviar producto
    const handleSubmit = (e) => {
        e.preventDefault();

        if (verificarCantidad()) {

            if (existePago === false) {

                axios.post(`${BASE_URL}/ventas/agregar-producto/`, formDataPost, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Añadimos el JWT en el header
                    }
                }).then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: "Producto agregado correctamente",
                        showConfirmButton: false,
                        timer: 1000,
                    }).then(() => {
                        window.location.reload();
                    });
                }).catch((error) => {
                    if (error.response) {
                        // Manejo de errores relacionados con la autorización
                        if (error.response.status === 401) {
                            Swal.fire({
                                icon: "warning",
                                title: "Advertencia",
                                text: "Operacion no Autorizada",
                                showConfirmButton: false,
                            });
                            navigate(0); // Redirige o recarga si no está autorizado
                        } else if (error.response.status === 403) {
                            Swal.fire({
                                icon: "warning",
                                title: "Sesión expirada",
                                text: "Su sesión ha expirado, por favor inicie sesión nuevamente",
                                showConfirmButton: false,
                            });
                            localStorage.clear();
                            navigate("/login"); // Redirige al login si la sesión ha expirado
                        } else {
                            // Otros errores
                            Swal.fire({
                                icon: "error",
                                title: "Error al agregar producto",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                    } else {
                        // Errores que no son respuestas del servidor
                        Swal.fire({
                            icon: "error",
                            title: "Error desconocido",
                            text: "Hubo un error al agregar el producto, por favor intente nuevamente",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });

                setFormDataPost({
                    ...formDataPost,
                    cantidad: '',
                });
                handleClose(true)

            } else if (existePago === true) {
                Swal.fire({
                    icon: "warning",
                    title: "No se puede agregar un producto o servicio",
                    text: "Ya ha sido efectuado un pago",
                    showConfirmButton: false,
                    timer: 2500,
                });
            }

        }

    };
    return (
        <div className="bg-darkest">
            <div className="px-4">
                <div className="row">
                    <div className="ms-0 mb-3 row">
                        <span>Producto:</span>
                        <input
                            name="nombre"
                            className="form-control rounded-5 py-2"
                            placeholder="Buscar por nombre"
                            value={formData.nombre}
                            onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <div>
                            <span>Marca:</span>
                            <SelectMarca
                                value={formData.marca}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <span>Categoria:</span>
                            <SelectCategoria
                                value={formData.categoria}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="mt-3 px-4">
                        <button className="btn btn-primary text-white rounded-5 d-flex align-items-center justify-content-center gap-1" onClick={handleBuscar}><FaSearch size={15} />Buscar</button>
                    </div>
                </div>
            </div>
            {/* MODAL */}
            <Modal open={open} onClose={handleClose} size="xs">
                <form onSubmit={handleSubmit}>
                    <Modal.Header className="px-3 pt-3">
                        <Modal.Title className="text-center">
                            <Text size="xxl" className="text-primary">
                                Agregar Producto
                            </Text>
                        </Modal.Title>
                        <hr className="text-primary p-0" />
                    </Modal.Header>
                    <Modal.Body className="px-3">
                        <div>
                            <Text size="xl">Cantidad:</Text>
                            <input
                                name="cantidad"
                                type="number"
                                className="form-control rounded-5"
                                min={1}
                                onChange={handleChangePost}
                                value={formDataPost.cantidad}
                            ></input>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="mb-3 d-flex justify-content-center">
                        <button className="btn btn-primary text-white rounded-5 d-flex align-items-center justify-content-center gap-1" type="submit">
                            <FaPlus size={15} />Generar
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/* Listado de productos */}
            <div className="p-4 px-2">

                {loading ? (
                    <div></div>
                ) : (
                    <div className="scroll-container">
                        {/* Listado de productos */}
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Marca</th>
                                    <th>Precio</th>
                                    <th>Agregar Producto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map(producto => (
                                    <tr key={producto.idProducto}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.marca}</td>
                                        <td>₡ {producto.precio}</td>
                                        <td className="d-flex justify-content-center">
                                            {/* USAR MODAL AGREGAR */}
                                            <button className="btn btn-primary text-white rounded-5 d-flex align-items-center justify-content-center gap-1"
                                                onClick={() => AgregarProducto(producto.idProducto)}
                                            ><FaPlus size={15} />Agregar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
export default SelectProductos;