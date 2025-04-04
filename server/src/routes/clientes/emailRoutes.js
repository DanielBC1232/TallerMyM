import express from "express";
import emailController from "../../controllers/clientes/emailController";

const router = express.Router();

// POST /api/email/cliente/:idCliente
router.post('/cliente/:idCliente', emailController.enviarCorreoCliente);

export default router;