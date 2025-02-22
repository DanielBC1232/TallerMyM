const { sql, connectDB } = require("../../config/database");

class Cliente {
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

class ClienteRepository {
  // Insertar nuevos clientes
  async insert(cliente) {
    try {
      const pool = await connectDB();
      await pool
        .request()
        .input("nombre", cliente.nombre)
        .input("apellido", cliente.apellido)
        .input("cedula", cliente.cedula)
        .input("correo", cliente.correo)
        .input("telefono", cliente.telefono)
        .input("fechaRegistro", cliente.fechaRegistro)
        .query(`
          INSERT INTO CLIENTE (nombre, apellido, cedula, correo, telefono, fechaRegistro)
          VALUES (@nombre, @apellido, @cedula, @correo, @telefono, @fechaRegistro)
        `);
      console.log("Cliente insertado exitosamente");
    } catch (error) {
      console.error("Error en insert:", error);
      throw new Error("Error al insertar cliente");
    }
  }

  // Obtener historial por cédula
  async getHistorialOrdenesByCedula(cedula) {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("cedula", sql.VarChar, cedula)
        .query(`
          SELECT 
            o.idOrden,
            o.codigoOrden,
            o.estadoOrden,
            o.fechaIngreso,
            o.estadoAtrasado,
            o.tiempoEstimado,
            v.placaVehiculo,
            v.modeloVehiculo,
            v.marcaVehiculo,
            c.nombre AS nombreCliente,
            c.telefono AS telefonoCliente
          FROM ORDEN o
          JOIN CLIENTE_VEHICULO v ON o.idVehiculo = v.idVehiculo
          JOIN CLIENTE c ON o.idCliente = c.idCliente
          WHERE c.cedula = @cedula
          ORDER BY o.fechaIngreso DESC
        `);
      if (result.recordset.length === 0) {
        return null;
      }
      return result.recordset;
    } catch (error) {
      console.error("Error al consultar historial de órdenes:", error);
      throw new Error("Error al consultar historial de órdenes");
    }
  }

  // Actualizar cliente
  async updateCliente(id, datosActualizados) {
    try {
      const pool = await connectDB();
      const { cedula, nombre, apellido, correo, telefono } = datosActualizados;

      const result = await pool
        .request()
        .input("idCliente", sql.Int, id)
        .input("cedula", sql.VarChar, cedula)
        .input("nombre", sql.VarChar, nombre)
        .input("apellido", sql.VarChar, apellido)
        .input("correo", sql.VarChar, correo)
        .input("telefono", sql.VarChar, telefono)
        .query(`
          UPDATE CLIENTE
          SET cedula = @cedula, nombre = @nombre, apellido = @apellido, correo = @correo, telefono = @telefono
          WHERE idCliente = @idCliente
        `);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      throw new Error("Error al actualizar cliente");
    }
  }

  // Eliminar cliente
  async deleteCliente(cedula) {
    try {
      console.log("Iniciando conexión con la base de datos...");
      const pool = await connectDB();
      console.log("Conexión establecida con la base de datos.");

      console.log("Ejecutando consulta de eliminación para cédula:", cedula);
      const result = await pool
        .request()
        .input("cedula", sql.VarChar, cedula)
        .query(`
          DELETE FROM CLIENTE WHERE cedula = @cedula
        `);

      console.log("Resultado de la eliminación:", result);
      console.log("Filas afectadas:", result.rowsAffected[0]);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      throw new Error("Error al eliminar cliente");
    }
  }

  // Obtener cliente por cédula
  async getByCedula(cedula) {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("cedula", sql.VarChar, cedula)
        .query("SELECT * FROM CLIENTE WHERE cedula = @cedula");

      if (result.recordset.length === 0) {
        return null;
      }

      return result.recordset[0];
    } catch (error) {
      console.error("Error al consultar cliente:", error);
      throw new Error("Error al consultar cliente");
    }
  }

  // Agregar vehículos a un cliente
  async agregarVehiculos(idCliente, vehiculos) {
    try {
      const pool = await connectDB();

      for (const vehiculo of vehiculos) {
        await pool
          .request()
          .input("placaVehiculo", sql.VarChar, vehiculo.placaVehiculo)
          .input("modeloVehiculo", sql.VarChar, vehiculo.modeloVehiculo)
          .input("marcaVehiculo", sql.VarChar, vehiculo.marcaVehiculo)
          .input("annoVehiculo", sql.Int, vehiculo.annoVehiculo)
          .input("tipoVehiculo", sql.VarChar, vehiculo.tipoVehiculo)
          .input("idCliente", sql.Int, idCliente)
          .query(`
            INSERT INTO CLIENTE_VEHICULO (placaVehiculo, modeloVehiculo, marcaVehiculo, annoVehiculo, tipoVehiculo, idCliente)
            VALUES (@placaVehiculo, @modeloVehiculo, @marcaVehiculo, @annoVehiculo, @tipoVehiculo, @idCliente)
          `);
      }

      console.log("Vehículos agregados exitosamente");
    } catch (error) {
      console.error("Error al agregar vehículos:", error);
      throw new Error("Error al agregar vehículos");
    }
  }
}

module.exports = { Cliente, ClienteRepository };
