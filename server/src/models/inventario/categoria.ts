import sql from "mssql";
import { connectDB } from "../../config/database";

export class Categoria {

  idCategoria: number;
  nombreCategoria: string;

  constructor(idCategoria: number, nombreCategoria: string){
    this.idCategoria = idCategoria;
    this.nombreCategoria = nombreCategoria;
  }
}

export class CategoriaRepository {
  // Obtener todas las categorias
  async getAll(): Promise<any[]> {
    try {
      const pool = await connectDB();
      const result = await pool.request().query("SELECT * FROM categoria");
      return result.recordset;
    } catch (error) {
      console.error("Error en getAll:", error);
      throw new Error("Error al obtener categorías");
    }
  }

  async findById(idCategoria: number): Promise<any | null> {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("idCategoria", sql.Int, idCategoria) // Parametros
        .query("SELECT * FROM categoria WHERE idCategoria = @idCategoria");

      return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
      console.error(" Error en findById:", error);
      throw new Error("Error al obtener categoría por ID");
    }
  }
}