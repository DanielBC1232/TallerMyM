const sql = require('mssql');
const dbConfig = require('../../config/database');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuración reusable del transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

class EmailModel {
  static async obtenerClientePorId(idCliente) {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('idCliente', sql.Int, idCliente)
      .query('SELECT nombre, apellido, correo FROM CLIENTE WHERE idCliente = @idCliente');
    
    return result.recordset[0];
  }

  static async enviarCorreo(destinatario, asunto, contenido) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: destinatario,
      subject: asunto,
      html: contenido
    };

    await transporter.sendMail(mailOptions);
  }
}

module.exports = EmailModel;