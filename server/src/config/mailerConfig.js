const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: 'mymtaller.cr@gmail.com',
        pass: 'luou jfuw cxvi hwaq' //contrasena de aplicacion
        // SUB1RAB4JO%-             contrasena de correo
    },
    connectionTimeout: 10000, // Timeout para conexiones
    socketTimeout: 10000, // Timeout para el socket
    greetingTimeout: 5000, // Timeout para el saludo
    tls: {
        rejectUnauthorized: false
    }
});

// Función para enviar correo
async function enviarCorreo(nombreCliente, correo, codigoOrden, vehiculo, estadoOrden) {
    let nuevoEstado = '';
    if (estadoOrden === 0) {
        nuevoEstado = '"cancelado"';
    } else if (estadoOrden === 1) {
        nuevoEstado = '"en espera"';
    } else if (estadoOrden === 2) {
        nuevoEstado = '"en proceso"';
    } else if (estadoOrden === 3) {
        nuevoEstado = '"listo"';
    } else if (estadoOrden >= 4) {
        nuevoEstado = '"cobro"';
    }

    const mailOptions = {
        from: 'mymtaller.cr@gmail.com', // Correo del sistema
        to: correo, // Correo del cliente
        subject: `Actualización de Estado de Orden`,
        text: `Saludos ${nombreCliente},\n\nSu orden de código ${codigoOrden} del vehículo ${vehiculo} ha cambiado al estado ${nuevoEstado}.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${correo} sobre la orden ${codigoOrden}`);
    } catch (error) {
        console.error("Error enviando correo:", error);
    }   
}

module.exports = { enviarCorreo };
