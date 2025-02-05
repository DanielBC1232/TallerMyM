import sql from "mssql";
import { connectDB } from "../../config/database";

export class ProductoServicio {
  idProducto: number;
  nombre: string;
  marca: string;
  descripcion: string;
  precio: number;
  stock: number;
  fechaIngreso: Date;
  ubicacionAlmacen: string;
  proveedor: string;
  categoria: string;
  vehiculosCompatibles: string;
  tipo: string;
  img?: string;
  porcentajeDescuento?: number;
  fechaInicio?: Date;
  fechaFin?: Date;

  constructor(
    idProducto: number,
    nombre: string,
    marca: string,
    descripcion: string,
    precio: number,
    stock: number,
    fechaIngreso: Date,
    ubicacionAlmacen: string,
    proveedor: string,
    categoria: string,
    vehiculosCompatibles: string,
    tipo: string,
    img?: string,
    porcentajeDescuento?: number,
    fechaInicio?: Date,
    fechaFin?: Date
  ) {
    this.idProducto = idProducto;
    this.nombre = nombre;
    this.marca = marca;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.fechaIngreso = fechaIngreso;
    this.ubicacionAlmacen = ubicacionAlmacen;
    this.proveedor = proveedor;
    this.categoria = categoria;
    this.vehiculosCompatibles = vehiculosCompatibles;
    this.tipo = tipo;
    this.img = img;
    this.porcentajeDescuento = porcentajeDescuento;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }
}

export class ProductoRepository {
  // Obtener todos los productos
  async getAll(): Promise<any[]> {
    try {
      const pool = await connectDB(); //conexion BD
      const result = await pool
        .request()
        .query("SELECT * FROM PRODUCTO_SERVICIO"); //QUERY
      return result.recordset;
    } catch (error) {
      //Manejo de errores
      console.error("Error en getAll:", error);
      throw new Error("Error al obtener producto");
    }
  }

  async findById(idProducto): Promise<any | null> {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("idProducto", sql.Int, idProducto) // Parametros
        .query(
          "SELECT * FROM PRODUCTO_SERVICIO WHERE idProducto = @idProducto"
        );

      return result.recordset.length > 0 ? result.recordset[0] : null;
    } catch (error) {
      console.error(" Error en findById:", error);
      throw new Error("Error al obtener producto por ID");
    }
  }
  // Insertar producto
  async insertProducto(
    nombre: string,
    marca: string,
    descripcion: string,
    precio: number,
    stock: number,
    fechaIngreso: Date,
    ubicacionAlmacen: string,
    proveedor: string,
    categoria: string,
    vehiculosCompatibles: string,
    tipo: string,
    img?: string,
    porcentajeDescuento?: number,
    fechaInicio?: Date,
    fechaFin?: Date
  ): Promise<any | null> {
    try {
      const pool = await connectDB();
      const result = await // Consulta parametrizada
      pool
        //PARAMETROS
        .request()
        .input("nombre", sql.VarChar, nombre)
        .input("marca", sql.VarChar, marca)
        .input("descripcion", sql.NVarChar, descripcion)
        .input("precio", sql.Decimal(10, 2), precio)
        .input("stock", sql.Int, stock)
        .input("fechaIngreso", sql.Date, fechaIngreso)
        .input("ubicacionAlmacen", sql.VarChar, ubicacionAlmacen)
        .input("proveedor", sql.VarChar, proveedor)
        .input("categoria", sql.VarChar, categoria)
        .input("vehiculosCompatibles", sql.NVarChar, vehiculosCompatibles)
        .input("tipo", sql.VarChar, tipo)
        .input("img", sql.VarChar, img || null)
        .input(
          "porcentajeDescuento",
          sql.Decimal(10, 2),
          porcentajeDescuento || null
        )
        .input("fechaInicio", sql.DateTime, fechaInicio || null)
        .input("fechaFin", sql.DateTime, fechaFin || null).query(`
          INSERT INTO PRODUCTO_SERVICIO 
          (nombre, marca, descripcion, precio, stock, fechaIngreso, ubicacionAlmacen, 
          proveedor, categoria, vehiculosCompatibles, tipo, img, porcentajeDescuento, fechaInicio, fechaFin) 
          VALUES 
          (@nombre, @marca, @descripcion, @precio, @stock, @fechaIngreso, @ubicacionAlmacen, 
          @proveedor, @categoria, @vehiculosCompatibles, @tipo, @img, @porcentajeDescuento, @fechaInicio, @fechaFin)
        `);

      return result.rowsAffected[0];
    } catch (error) {
      console.error("Error en insertar producto o servicio:", error);
      throw new Error("Error al insertar producto o servicio");
    }
  }

  // Actualizar producto
  async updateProducto(
    idProducto: number,
    nombre: string,
    marca: string,
    descripcion: string,
    precio: number,
    stock: number,
    fechaIngreso: Date,
    ubicacionAlmacen: string,
    proveedor: string,
    categoria: string,
    vehiculosCompatibles: string,
    tipo: string,
    img?: string,
    porcentajeDescuento?: number,
    fechaInicio?: Date,
    fechaFin?: Date
  ): Promise<any | null> {
    try {
      const pool = await connectDB();
      const result = await // Consulta parametrizada
      //Query update
      pool
        //PARAMETROS
        .request()
        .input("idProducto", sql.Int, idProducto)
        .input("nombre", sql.VarChar, nombre)
        .input("marca", sql.VarChar, marca)
        .input("descripcion", sql.NVarChar, descripcion)
        .input("precio", sql.Decimal(10, 2), precio)
        .input("stock", sql.Int, stock)
        .input("fechaIngreso", sql.Date, fechaIngreso)
        .input("ubicacionAlmacen", sql.VarChar, ubicacionAlmacen)
        .input("proveedor", sql.VarChar, proveedor)
        .input("categoria", sql.VarChar, categoria)
        .input("vehiculosCompatibles", sql.NVarChar, vehiculosCompatibles)
        .input("tipo", sql.VarChar, tipo)
        .input("img", sql.VarChar, img || null)
        .input(
          "porcentajeDescuento",
          sql.Decimal(10, 2),
          porcentajeDescuento || null
        )
        .input("fechaInicio", sql.DateTime, fechaInicio || null)
        .input("fechaFin", sql.DateTime, fechaFin || null).query(`
          UPDATE PRODUCTO_SERVICIO SET
            nombre = @nombre,
            marca = @marca,
            descripcion = @descripcion,
            precio = @precio,
            stock = @stock,
            fechaIngreso = @fechaIngreso,
            ubicacionAlmacen = @ubicacionAlmacen,
            proveedor = @proveedor,
            categoria = @categoria,
            vehiculosCompatibles = @vehiculosCompatibles,
            tipo = @tipo,
            img = @img,
            porcentajeDescuento = @porcentajeDescuento,
            fechaInicio = @fechaInicio,
            fechaFin = @fechaFin
          WHERE idProducto = @idProducto
        `);

      return result.rowsAffected[0];
    } catch (error) {
      console.error("Error en insertar producto o servicio:", error);
      throw new Error("Error al insertar producto o servicio");
    }
  }

  // Eliminar un producto
  async deleteProducto(idProducto: number): Promise<any> {
    try {
      const pool = await connectDB();
      await pool.request().input("idProducto", sql.Int, idProducto).query(`
          DELETE FROM PRODUCTO_SERVICIO WHERE idProducto = @idProducto
        `);
    } catch (error) {
      console.error("Error en delete:", error);
      throw new Error("Error al eliminar el producto");
    }
  }
}
