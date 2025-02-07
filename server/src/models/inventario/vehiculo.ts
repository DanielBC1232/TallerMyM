import { sql } from "../../config/database";
import { connectDB } from "../../config/database";

export class Vehiculo {
  idCliente: number;
  placaVehiculo: string;
  marcaVehiculo: string;
  modeloVehiculo: string;
  annoVehiculo: number;
  tipoVehiculo: string;
  idVehiculo?: number;

  constructor(
    idCliente: number,
    placaVehiculo: string,
    marcaVehiculo: string,
    modeloVehiculo: string,
    annoVehiculo: number,
    tipoVehiculo: string,
    idVehiculo?: number
  ) {
    this.idVehiculo = idVehiculo || 0;
    this.idCliente = idCliente;
    this.placaVehiculo = placaVehiculo;
    this.marcaVehiculo = marcaVehiculo;
    this.modeloVehiculo = modeloVehiculo;
    this.annoVehiculo = annoVehiculo;
    this.tipoVehiculo = tipoVehiculo;
  }
}

export class VehiculosRepository {
  // Insertar un nuevo vehículo para un cliente
  async agregarVehiculos(
    idCliente: number,
    vehiculos: Vehiculo[]
  ): Promise<void> {
    try {
      const pool = await connectDB();

      console.log("idCliente:", idCliente);

      for (const vehiculo of vehiculos) {
        console.log("Insertando vehículo:", vehiculo);

        await pool
          .request()
          .input("idCliente", sql.Int, idCliente)
          .input("placaVehiculo", sql.VarChar, vehiculo.placaVehiculo)
          .input("marcaVehiculo", sql.VarChar, vehiculo.marcaVehiculo)
          .input("modeloVehiculo", sql.VarChar, vehiculo.modeloVehiculo)
          .input("annoVehiculo", sql.Int, vehiculo.annoVehiculo)
          .input("tipoVehiculo", sql.VarChar, vehiculo.tipoVehiculo).query(`
              INSERT INTO CLIENTE_VEHICULO (idCliente, placaVehiculo, marcaVehiculo, modeloVehiculo, annoVehiculo, tipoVehiculo)
              VALUES (@idCliente, @placaVehiculo, @marcaVehiculo, @modeloVehiculo, @annoVehiculo, @tipoVehiculo)
            `);
      }

      console.log("Vehículos agregados exitosamente");
    } catch (error) {
      console.error("Error al agregar vehículos:", error);
      throw new Error("Error al agregar vehículos");
    }
  }

  async getVehiculosByCliente(idCliente: number): Promise<Vehiculo[]> {
    try {
      const pool = await connectDB();
      const result = await pool.request().input("idCliente", sql.Int, idCliente)
        .query(`
          SELECT idVehiculo, idCliente, placaVehiculo, marcaVehiculo, modeloVehiculo, annoVehiculo, tipoVehiculo
          FROM CLIENTE_VEHICULO
          WHERE idCliente = @idCliente
        `);

      if (result.recordset.length === 0) {
        return [];
      }

      const vehiculos = result.recordset.map(
        (vehiculo: any) =>
          new Vehiculo(
            vehiculo.idCliente,
            vehiculo.placaVehiculo,
            vehiculo.marcaVehiculo,
            vehiculo.modeloVehiculo,
            vehiculo.annoVehiculo,
            vehiculo.tipoVehiculo,
            vehiculo.idVehiculo
          )
      );

      return vehiculos;
    } catch (error) {
      console.error("Error al obtener vehículos por Cliente:", error);
      throw new Error("Error al obtener vehículos por Cliente");
    }
  }

  // Obtener un vehículo por su ID
  async getVehiculoById(
    idVehiculo: number,
    idCliente: number
  ): Promise<Vehiculo | null> {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("idVehiculo", sql.Int, idVehiculo)
        .input("idCliente", sql.Int, idCliente).query(`
              SELECT idVehiculo, idCliente, placaVehiculo, marcaVehiculo, modeloVehiculo, annoVehiculo, tipoVehiculo
              FROM CLIENTE_VEHICULO
              WHERE idVehiculo = @idVehiculo AND idCliente = @idCliente
            `);

      if (result.recordset.length === 0) {
        return null;
      }

      const vehiculo = result.recordset[0];
      return new Vehiculo(
        vehiculo.idCliente,
        vehiculo.placaVehiculo,
        vehiculo.marcaVehiculo,
        vehiculo.modeloVehiculo,
        vehiculo.annoVehiculo,
        vehiculo.tipoVehiculo,
        vehiculo.idVehiculo
      );
    } catch (error) {
      console.error("Error al obtener vehículo por ID y Cliente:", error);
      throw new Error("Error al obtener vehículo por ID y Cliente");
    }
  }

  async eliminarVehiculo(idVehiculo: number): Promise<void> {
    try {
      const pool = await connectDB();

      await pool.request().input("idVehiculo", sql.Int, idVehiculo).query(`
              DELETE FROM CLIENTE_VEHICULO 
              WHERE idVehiculo = @idVehiculo
            `);

      console.log("Vehículo eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
      throw new Error("Error al eliminar vehículo");
    }
  }
}
