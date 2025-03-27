const { connectDB } = require("../../config/database");
const sql = require('mssql');

class Solicitud {
  constructor(fechaInicio,fechaFin,idTrabajador) {
   
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.idTrabajador = idTrabajador;
    
  }
}
//------------
class SolicitudRepository {
  // Insertar nuevos clientes
  async insert(solicitud) {
    console.log(solicitud)
    try {
      const pool = await connectDB();
      await pool
        .request()
        .input("fechaInicio", solicitud.fechaInicio)
        .input("fechaFin", solicitud.fechaFin)
        .input("idTrabajador", solicitud.idTrabajador)
      
        .query(`
          INSERT INTO VACACIONES (fechaInicio, fechaFin, idTrabajador)
          VALUES (@fechaInicio, @fechaFin, @idTrabajador)
        `);
      console.log("La solicitud ha sido insertado exitosamente");
    } catch (error) {
      console.error("Error en insert:", error);
      throw new Error("Error al insertar solicitud");
    }
  }

}

module.exports = { Solicitud, SolicitudRepository };


  