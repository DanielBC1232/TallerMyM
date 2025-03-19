import sql from 'mssql';
import { connectDB } from '../../config/database.js';

export class Orden {
    constructor(idOrden, codigoOrden, estadoOrden, fechaIngreso, tiempoEstimado, estadoAtrasado, idVehiculo,descripcion, idTrabajador, idCliente) {
        this.idOrden = idOrden
        this.codigoOrden = codigoOrden;
        this.estadoOrden = estadoOrden;
        this.fechaIngreso = fechaIngreso;
        this.tiempoEstimado = tiempoEstimado;
        this.estadoAtrasado = estadoAtrasado;
        this.idVehiculo = idVehiculo;
        this.descripcion = descripcion
        this.idTrabajador = idTrabajador;
        this.idCliente = idCliente;
    }
}

export class OrdenRepository {

    // Método para insertar Orden
    async insertOrden(tiempoEstimado, idVehiculo, idTrabajador, idCliente,descripcion) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('tiempoEstimado', sql.DateTime, tiempoEstimado)
                .input('idVehiculo', sql.Int, idVehiculo)
                .input('idTrabajador', sql.Int, idTrabajador)
                .input('idCliente', sql.Int, idCliente)
                .input('descripcion', sql.NVarChar, descripcion)
                .execute(`SP_INSERTAR_ORDEN`);
            return result.rowsAffected[0]; // Devuelve el número de filas afectadas
        } catch (error) {
            console.error('Error en generar una nueva orden', error);
            throw new Error('Error en generar una nueva orde');
        }
    }

    // Obtener listado de Orden - By estado (columna 1-Pendiente, 2-En proceso, 3-Listo)
    async getOrdenesByStatus(estadoOrden) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('estadoOrden', sql.Int, estadoOrden)
                .execute(`SP_GET_ORDENES`);
            return result.recordset;
        } catch (error) {
            console.error('Error en obtener ordenes:', error);
            throw new Error('Error en obtener ordenes');
        }
    }

    // Obtener oden por ID
    async getOrdenById(idOrden) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('idOrden', sql.Int, idOrden)
                .execute(`GET_ORDEN`);
            return result.recordset[0]; // Devuelve el registro
        } catch (error) {
            console.error('Error en obtener orden:', error);
            throw new Error('Error en obtener orden');
        }
    }

    // Actualizar Orden
    async updateTrabajador(idOrden, codigoOrden, estadoOrden, fechaIngreso, tiempoEstimado) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('idOrden', sql.Int, idOrden)
                .input('codigoOrden', sql.VarChar, codigoOrden)
                .input('estadoOrden', sql.VarChar, estadoOrden)
                .input('fechaIngreso', sql.Decimal(10, 2), fechaIngreso)
                .input('tiempoEstimado', sql.VarChar, tiempoEstimado)
                .query(`
                    UPDATE TRABAJADOR
                    SET codigoOrden = @codigoOrden,
                        estadoOrden = @estadoOrden,
                        fechaIngreso = @fechaIngreso,
                        tiempoEstimado = @tiempoEstimado
                    WHERE idOrden = @idOrden
                `);
            return result.rowsAffected[0]; // Devuelve el número de filas afectadas
        } catch (error) {
            console.error('Error en actualizar trabajador:', error);
            throw new Error('Error en actualizar trabajador');
        }
    }

    // Cancelar orden => update estado a 0
    async cancelarOrden(idOrden) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('idOrden', sql.Int, idOrden)
                .query(`
                    DELETE FROM TRABAJADOR
                    WHERE idOrden = @idOrden
                `);
            return result.rowsAffected; // Devuelve el número de filas afectadas
        } catch (error) {
            console.error('Error en eliminar trabajador:', error);
            throw new Error('Error en eliminar trabajador');
        }
    }

}
