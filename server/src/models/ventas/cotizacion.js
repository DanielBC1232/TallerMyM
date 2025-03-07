import sql from 'mssql';
import { connectDB } from '../../config/database.js';

export class Cotizacion {
    constructor(idCotizacion, montoTotal, montoManoObra, tiempoEstimado, detalles, fecha, idCliente) {
        this.idCotizacion = idCotizacion;
        this.montoTotal = montoTotal;
        this.montoManoObra = montoManoObra;
        this.tiempoEstimado = tiempoEstimado;
        this.detalles = detalles;
        this.idCliente = idCliente;
    }
}

export class CotizacionRepository {

    // Método para insertar cotización
    async insertCotizacion(montoTotal, montoManoObra, tiempoEstimado, detalles, idCliente) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('montoTotal', sql.Float, montoTotal)
                .input('montoManoObra', sql.Float, montoManoObra)
                .input('tiempoEstimado', sql.VarChar, tiempoEstimado)
                .input('detalles', sql.VarChar, detalles)
                .input('idCliente', sql.Int, idCliente)
                .query(`
                    INSERT INTO COTIZACION 
                    (montoTotal, montoManoObra, tiempoEstimado, detalles, idCliente)
                    VALUES 
                    (@montoTotal, @montoManoObra, @tiempoEstimado, @detalles, @idCliente)
                `);
            return result.rowsAffected[0]; // Devuelve el número de filas afectadas
        } catch (error) {
            console.error('Error en insertar cotizacion:', error);
            throw new Error('Error en insertar cotizacion');
        }
    }
}
