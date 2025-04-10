import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Modal, Button } from "rsuite";

export const BASE_URL = import.meta.env.VITE_API_URL;

const ModalAgregarUsuario = () => {
    const [open, setOpen] = useState(false);
    const [formValue, setFormValue] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => { //SUBBMIT FORM

        e.preventDefault();
        const { username, email, password, password2 } = formValue;
        if (!username || !email || !password || !password2) {
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Todos los campos son obligatorios",
                showConfirmButton: false,
            });
            return;
        }
        if (password.length < 8) {
            Swal.fire("Advertencia", "La contraseña debe tener al menos 8 caracteres", "warning");
            return;
        }
        if (password !== password2) {
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Las contraseñas no coinciden",
                showConfirmButton: false,
            });
            return;
        }
        const payload = { username, email, password };
        try {
            console.log(payload);
            const response = await axios.post(// PETICION POST
                `${BASE_URL}/admin/registrar-usuario`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Usuario registrado exitosamente",
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                }).then(() => {
                    setFormValue({
                        username: "",
                        email: "",
                        password: "",
                        password2: "",
                    });
                    setOpen(false);
                });
                window.location.reload();
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                Swal.fire({
                    icon: "warning",
                    title: "Advertencia",
                    text: "El correo ya existe",
                    showConfirmButton: false,
                });
            } else {
                console.error("Error al registrar el usuario", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un error al registrar el usuario",
                    showConfirmButton: false,
                });
            }
        }
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Button
                style={{ minWidth: "80px", maxWidth: "350px" }}
                className="btn btn-primary btn-sm text-white"
                onClick={handleOpen}
            >
                Registrar Usuario
            </Button>

            <Modal open={open} onClose={handleClose} size="sm">
                <Modal.Header>
                    <Modal.Title>Registrar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="ms-5 mt-3">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Nombre de usuario:
                                </label>
                                <input
                                    type="text"
                                    className="form-control form-select-sm"
                                    name="username"
                                    value={formValue.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Correo:
                                </label>
                                <input
                                    type="email"
                                    className="form-control form-select-sm"
                                    name="email"
                                    value={formValue.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Contraseña:
                                </label>
                                <input
                                    type="password"
                                    className="form-control form-select-sm"
                                    name="password"
                                    value={formValue.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password2" className="form-label">
                                    Confirmar Contraseña:
                                </label>
                                <input
                                    type="password"
                                    className="form-control form-select-sm"
                                    name="password2"
                                    value={formValue.password2}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-start mt-4">
                                <button className="btn btn-sm btn-secondary text-white" type="submit">
                                    Registrar
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalAgregarUsuario;
