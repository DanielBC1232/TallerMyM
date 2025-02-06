import sql from "mssql";
import { connectDB } from "../../config/database";

export class Marca {

  idMarca: number;
  nombreMarca: string;

  constructor(idMarca: number, nombreMarca: string){
    this.idMarca = idMarca;
    this.nombreMarca = nombreMarca;
  }
}

export class MarcaRepository {
  // Obtener todas las marcas
  async getAll(): Promise<any[]> {
    try {
      const pool = await connectDB();
      const result = await pool.request().query("SELECT * FROM MARCA_PRODUCTO");
      return result.recordset;
    } catch (error) {
      console.error("Error en getAll:", error);
      throw new Error("Error al obtener categorías");
    }
  }

  async findById(idMarca: number): Promise<any | null> {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("idMarca", sql.Int, idMarca) // Parametros
        .query("SELECT * FROM MARCA_PRODUCTO WHERE idMarca = @idMarca");

      return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
      console.error(" Error en findById:", error);
      throw new Error("Error al obtener marca por ID");
    }
  }
}