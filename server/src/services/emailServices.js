import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (email, nombre) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '¡Perfil Creado con Éxito!',
        text: `Hola ${nombre},\n\nTu perfil ha sido creado exitosamente en nuestro sistema.\n\nSaludos,\nEquipo del Taller Mecánico MYM`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Error al enviar el correo');
    }
};