require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

const sendEmail = async (req, res) => {
    const { email, nombre } = req.body;

    // Validación de datos
    if (!email || !nombre) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "¡Perfil Creado con Éxito!",
        text: `Hola ${nombre},\n\nTu perfil ha sido creado exitosamente en nuestro sistema.\n\nSaludos,\nEquipo del Taller Mecánico MYM`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Correo enviado con éxito" });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ error: "Error al enviar el correo" });
    }
};

module.exports = { sendEmail };