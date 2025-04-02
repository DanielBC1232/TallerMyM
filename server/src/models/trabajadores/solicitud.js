const { connectDB } = require("../../config/database");
const sql = require('mssql');

class Solicitud {
  constructor(fechaInicio,fechaFin,idTrabajador) {
   
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.idTrabajador = idTrabajador;
    
  }
}

//Metodos CRUD
class SolicitudRepository {
  // Insertar nuevos clientes
  async InsertSolicitud(solicitud) {
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

   // Actualizar Solicitud
  async UpdateSolicitud(idVacaciones, datosActualizados) {
    try {
      const pool = await connectDB();
      
      const { solicitud, fechaInicio, fechaFin, motivoRechazo, idTrabajador } = datosActualizados;
  
      // Convertir fechas ISO a formato Date de SQL Server
      const fechaInicioSQL = fechaInicio ? new Date(fechaInicio) : null;
      const fechaFinSQL = fechaFin ? new Date(fechaFin) : null;
  
      const result = await pool
        .request()
        .input("idVacaciones", sql.Int, idVacaciones)
        .input("solicitud", sql.VarChar, solicitud)
        .input("fechaInicio", sql.Date, fechaInicioSQL)
        .input("fechaFin", sql.Date, fechaFinSQL)
        .input("motivoRechazo", sql.VarChar, motivoRechazo) 
        .input("idTrabajador", sql.Int, idTrabajador)
        .query(`
          UPDATE VACACIONES
          SET solicitud = @solicitud, 
              fechaInicio = @fechaInicio, 
              fechaFin = @fechaFin,
              motivoRechazo = @motivoRechazo, 
              idTrabajador = @idTrabajador 
          WHERE idVacaciones = @idVacaciones
        `);
  
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
      throw new Error("Error al actualizar la solicitud");
    }
  }

  async DeleteSolicitud(idVacaciones) {
    try {
      const pool = await connectDB();
      
      
  
      const result = await pool
        .request()
        .input("idVacaciones", sql.Int, idVacaciones)
        
        .query(`DELETE VACACIONES SET solicitud = 'Aprobado' 
          WHERE idVacaciones = @idVacaciones`);
  
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
      throw new Error("Error al actualizar la solicitud");
    }
  }
  //--------

//Aprobar y Rechazar Vacaciones
  // AprobarSolicitud

  async AprobarSolicitud(idVacaciones) {
    try {
      const pool = await connectDB();
      
      
  
      const result = await pool
        .request()
        .input("idVacaciones", sql.Int, idVacaciones)
        
        .query(`UPDATE VACACIONES SET solicitud = 'Aprobado' 
          WHERE idVacaciones = @idVacaciones`);
  
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
      throw new Error("Error al actualizar la solicitud");
    }
  }

  //Rechazar
  async RechazarSolicitud(idVacaciones,datosActualizados) {
    try {
      const pool = await connectDB();
      
      const { motivoRechazo } = datosActualizados;

  
      const result = await pool
        .request()
        .input("idVacaciones", sql.Int, idVacaciones)
        .input("motivoRechazo", sql.VarChar, motivoRechazo) 
        .query(`UPDATE VACACIONES SET solicitud = 'Rechazado',motivoRechazo = @motivoRechazo
          WHERE idVacaciones = @idVacaciones`);
  
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
      throw new Error("Error al actualizar la solicitud");
    }
  }

//Metodos Get
  async getVacacionesGest() {
    try {
      const pool = await connectDB();
      const result = await pool.request().query("SELECT idVacaciones,solicitud,fechaInicio,fechaFin,motivoRechazo,idTrabajador FROM VACACIONES");
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener todos los clientes:", error);
      throw new Error("Error al obtener clientes");
    }
  }

  async getVacionPorIdVacacion(idVacaciones) {
        try {
          const pool = await connectDB();
          const result = await pool.request()
            .input("idVacaciones", sql.Int, idVacaciones)
            .query(`SELECT idVacaciones,solicitud, fechaInicio, fechaFin, motivoRechazo,idTrabajador
               FROM VACACIONES WHERE idVacaciones = @idVacaciones`);
          return result.recordset;
        } catch (error) {
          console.error("Error al obtener las solicitudes:", error);
          throw new Error("Error al obtener solocitudes");
        }
      }

}

module.exports = { Solicitud, SolicitudRepository };


  