import sql from "mssql";
import { connectDB } from "../../config/database";

export class proveedor {

  idProveedor: number;
  nombreProveedor: string;

  constructor(idProveedor: number, nombreProveedor: string){
    this.idProveedor = idProveedor;
    this.nombreProveedor = nombreProveedor;
  }
}

export class ProveedorRepository {
  // Obtener todas las categorias
  async getAll(): Promise<any[]> {
    try {
      const pool = await connectDB();
      const result = await pool.request().query("SELECT * FROM PROVEEDOR");
      return result.recordset;
    } catch (error) {
      console.error("Error en getAll:", error);
      throw new Error("Error al obtener categorías");
    }
  }

  async findById(idProveedor: number): Promise<any | null> {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("idProveedor", sql.Int, idProveedor) // Parametros
        .query("SELECT * FROM PROVEEDOR WHERE idProveedor = @idProveedor");

      return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
      console.error(" Error en findById:", error);
      throw new Error("Error al obtener categoría por ID");
    }
  }
}