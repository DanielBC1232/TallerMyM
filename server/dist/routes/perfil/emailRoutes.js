const express = require("express");
const router = express.Router();
const { sendEmail } = require("../../controllers/perfil/emailController");

router.post("/send-email", sendEmail);

module.exports = router;
