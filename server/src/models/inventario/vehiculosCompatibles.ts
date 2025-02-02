import sql from "mssql";
import { connectDB } from "../../config/database";

export class VehiculosCompatibles {

  idVehiculos: number;
  modelo: string;
  marca: string;
  anno: number;

  constructor(idVehiculos: number, modelo: string, marca: string, anno: number){
    this.idVehiculos = idVehiculos;
    this.modelo = modelo;
    this.marca = marca;
    this.anno = anno;
  }
}

export class VehiculosCompatiblesRepository {
  // Obtener todas los vehiculos
  async getAll(): Promise<any[]> {
    try {
      const pool = await connectDB();
      const result = await pool.request().query("SELECT * FROM VEHICULOS_COMPATIBLES");
      return result.recordset;
    } catch (error) {
      console.error("Error en getAll:", error);
      throw new Error("Error al obtener categorías");
    }
  }

  async findById(idVehiculos: number): Promise<any | null> {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("idVehiculos", sql.Int, idVehiculos) // Parametros
        .query("SELECT * FROM VEHICULOS_COMPATIBLES WHERE idVehiculos = @idVehiculos");

      return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
      console.error(" Error en findById:", error);
      throw new Error("Error al obtener categoría por ID");
    }
  }
}