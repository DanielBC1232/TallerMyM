import { DataTypes, Model } from "sequelize";

export interface ICategoria {
  idCategoria?: number;  // Opcional porque es autoincremental
  nombreCategoria: string;
}

export class Categoria implements ICategoria {
  public idCategoria?: number;
  public nombreCategoria: string;

  constructor(nombreCategoria: string, idCategoria?: number) {
    this.nombreCategoria = nombreCategoria;
    this.idCategoria = idCategoria;
  }

  // Validación básica del modelo
  validar(): boolean {
    if (!this.nombreCategoria || this.nombreCategoria.trim().length === 0) {
      throw new Error('El nombre de la categoría es requerido');
    }

    if (this.nombreCategoria.length > 100) {
      throw new Error('El nombre no puede exceder los 100 caracteres');
    }

    return true;
  }
}
