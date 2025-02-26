const express = require('express');
const Usuario = require('../../models/usuario/usuario'); 
const { sendEmail } = require('../../services/emailServices'); 

const router = express.Router();

// Ruta para verificar si el correo está registrado
router.post('/send-email', async (req, res) => {
  const { email, nombre } = req.body;

  if (!email || !nombre) {
    return res.status(400).json({ success: false, message: 'El correo y nombre es obligatorio' });
  }

  try {
    // Buscar el correo en la base de datos
    const user = await getUsuarioByEmail(email);

    if (user) {
      return res.json({ success: false, message: 'El correo ya está registrado' });
    }

    await sendEmail(email, nombre);

    return res.json({ success: true, message: 'El correo enviado correctamente' });
  } catch (error) {
    console.error('Error al verificar correo:', error);
    return res.status(500).json({ success: false, message: 'Error al acceder a la base de datos' });
  }
});

module.exports = router;