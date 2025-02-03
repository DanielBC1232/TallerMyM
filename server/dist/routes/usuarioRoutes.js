const express = require('express');
const Usuario = require('../models/usuario/usuario'); // Asegúrate de importar correctamente el modelo

const router = express.Router();

// Ruta para verificar si el correo está registrado
router.post('/check-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'El correo es obligatorio' });
  }

  try {
    // Buscar el correo en la base de datos
    const user = await Usuario.findOne({
      where: { email: email },
    });

    if (user) {
      return res.json({ success: false, message: 'El correo ya está registrado' });
    }

    return res.json({ success: true, message: 'El correo está disponible' });
  } catch (error) {
    console.error('Error al verificar correo:', error);
    return res.status(500).json({ success: false, message: 'Error al acceder a la base de datos' });
  }
});

module.exports = router;