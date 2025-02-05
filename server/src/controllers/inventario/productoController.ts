import { Request, Response } from "express";
import { ProductoRepository } from "../../models/inventario/producto";

const ProductoRepo = new ProductoRepository();

// Obtener todas las producto - filtros y paginacion
export const getAllProductos = async (_req: Request, res: Response) => {
  try {
    const producto = await ProductoRepo.getAll(); // Get

    //validaciones
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los producto" });
  }
};

// Obtener una producto por ID
export const getProductoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const producto = await ProductoRepo.findById(id); // Get

    // Validaciones - return
    if (!producto) {
      res.status(404).json({ error: "Producto no encontrado" }); // Return
    }
    res.json(producto); //Return exitoso
  } catch (error) {
    console.error("Error en obtener producto por id:", error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

// Registrar nuevo producto
export const addProducto = async (req: Request, res: Response) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const {
      nombre,
      marca,
      descripcion,
      precio,
      stock,
      fechaIngreso,
      ubicacionAlmacen,
      proveedor,
      categoria,
      vehiculosCompatibles,
      tipo,
      img
    } = req.body;

    // Llamar al método insertProducto para insertar el nuevo producto en la base de datos
    const nuevoProducto = await ProductoRepo.insertProducto(
      nombre,
      marca,
      descripcion,
      precio,
      stock,
      fechaIngreso,
      ubicacionAlmacen,
      proveedor,
      categoria,
      vehiculosCompatibles,
      tipo,
      img
    );

    // Respuesta exitosa con el producto insertado
    res.status(201).json({
      message: "Producto insertado exitosamente",
      producto: nuevoProducto,
    });
    // Manejo de errores
  } catch (error) {
    console.error("Error al insertar producto:", error);
    res.status(500).json({ error: "Error al insertar el producto" });
  }
};

// Actualizar un producto
export const updateProducto = async (req: Request, res: Response) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const {
      nombre,
      marca,
      descripcion,
      precio,
      stock,
      fechaIngreso,
      ubicacionAlmacen,
      proveedor,
      categoria,
      vehiculosCompatibles,
      tipo,
      img,
      porcentajeDescuento,
      fechaInicio,
      fechaFin,
    } = req.body;

    // Llamar al metodo update Producto
    const actualizarProducto = await ProductoRepo.updateProducto(
      nombre,
      marca,
      descripcion,
      precio,
      stock,
      fechaIngreso,
      ubicacionAlmacen,
      proveedor,
      categoria,
      vehiculosCompatibles,
      tipo,
      img,
      porcentajeDescuento,
      fechaInicio,
      fechaFin
    );

    // Respuesta exitosa con el producto insertado
    res.status(201).json({
      message: "Producto actualizado exitosamente",
      producto: actualizarProducto,
    });
    // Manejo de errores
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// Eliminar producto
export const deleteProducto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); // Parametro

    // Verificamos si el producto existe o id valido
    const producto = await ProductoRepo.findById(id);
    if (!producto) {
      res.status(404).json({ error: "Producto no encontrado" }); // Si no existe o no se encontro con id
    }

    // Llama el metodo de borrado
    await ProductoRepo.deleteProducto(id);

    // Respuesta exitosa
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    //Manejo de errores
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

