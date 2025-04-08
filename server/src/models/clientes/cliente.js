import sql from 'mssql';
import { connectDB } from '../../config/database.js';

export class Cliente {
  constructor(nombre, apellido, cedula, correo, telefono, fechaRegistro) {
    this.idCliente = 0;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.correo = correo;
    this.telefono = telefono;
    this.fechaRegistro = fechaRegistro;
  }
}
//------------
export class ClienteRepository {
  // Insertar nuevos clientes
  async insert(cliente) {
    console.log(cliente);
    try {
      const pool = await connectDB();
      await pool
        .request()
        .input("nombre", sql.VarChar, cliente.nombre)
        .input("apellido", sql.VarChar, cliente.apellido)
        .input("cedula", sql.Int, parseInt(cedula))
        .input("correo", sql.VarChar, cliente.correo)
        .input("telefono", sql.VarChar, cliente.telefono)
        .input("fechaRegistro", sql.Date, cliente.fechaRegistro)
        .query(`
        INSERT INTO CLIENTE (nombre, apellido, cedula, correo, telefono, fechaRegistro)
        VALUES (@nombre, @apellido, @cedula, @correo, @telefono, @fechaRegistro)`);
      console.log("Cliente insertado exitosamente");
    } catch (error) {
      console.error("Error en insert:", error);
      throw new Error("Error al insertar cliente");
    }
  }


  // Actualizar cliente
  async updateCliente(cedula, datosActualizados) {
    try {
      const pool = await connectDB();
      const { id, nombre, apellido, correo, telefono } = datosActualizados;

      const result = await pool
        .request()
        .input("idCliente", sql.Int, id)
        .input("cedula", sql.Int, parseInt(cedula))
        .input("nombre", sql.VarChar, nombre)
        .input("apellido", sql.VarChar, apellido)
        .input("correo", sql.VarChar, correo)
        .input("telefono", sql.VarChar, telefono)
        .query(`UPDATE CLIENTE
        SET nombre = @nombre, apellido = @apellido, correo = @correo, telefono = @telefono
        WHERE cedula = @cedula`);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      throw new Error("Error al actualizar cliente");
    }
  }

  // Eliminar cliente
  async deleteCliente(cedula) {
    try {
      const pool = await connectDB();
      console.log("Conexión establecida con la base de datos.");

      const result = await pool
        .request()
        .input("cedula", sql.Int, parseInt(cedula))
        .query(`DELETE FROM CLIENTE WHERE cedula = @cedula`);

      console.log("Resultado de la eliminación:", result);
      console.log("Filas afectadas:", result.rowsAffected[0]);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      throw new Error("Error al eliminar cliente");
    }
  }
  //----CED
  //select todos
  async getAll() {
    try {
      const pool = await connectDB();
      const result = await pool.request().query("SELECT * FROM CLIENTE");
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener todos los clientes:", error);
      throw new Error("Error al obtener clientes");
    }
  }

  // Obtener cliente por cédula
  async getByCedula(cedula) {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("cedula", sql.Int, parseInt(cedula))
        .query("SELECT * FROM CLIENTE WHERE cedula = @cedula");

      return result.recordset;

    } catch (error) {
      console.error("Error al consultar cliente:", error);
      throw new Error("Error al consultar cliente");
    }
  }

  // Obtener clientes
  async getClientesInactivos() {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .query(`SELECT
          idCliente, 
          nombre +' '+ apellido as nombreCliente,
          correo,
          telefono
          FROM CLIENTE
          `);

      return result.recordset || [];

    } catch (error) {
      console.error("Error al consultar cliente:", error);
      throw new Error("Error al consultar cliente");
    }
  }

}