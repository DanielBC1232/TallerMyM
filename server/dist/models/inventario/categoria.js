"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
class Categoria {
    constructor(nombreCategoria, idCategoria) {
        this.nombreCategoria = nombreCategoria;
        this.idCategoria = idCategoria;
    }
    // Validación básica del modelo
    validar() {
        if (!this.nombreCategoria || this.nombreCategoria.trim().length === 0) {
            throw new Error('El nombre de la categoría es requerido');
        }
        if (this.nombreCategoria.length > 100) {
            throw new Error('El nombre no puede exceder los 100 caracteres');
        }
        return true;
    }
}
exports.Categoria = Categoria;
