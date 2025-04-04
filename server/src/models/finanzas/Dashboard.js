import sql from 'mssql';
import { connectDB } from '../../config/database.js';

export class DashboardRepository {

    async getGanaciaMes() {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .execute(`SP_GET_GANANCIAS_MESES`);
            return result.recordset[0];
        } catch (error) {
            console.error('Error en obtener datos', error);
            throw new Error('Error en obtener datos');
        }
    }

    async getGanaciasMes() {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .query(`SELECT total, fecha FROM PAGO_CLIENTE`);
            return result.recordset;
        } catch (error) {
            console.error('Error en obtener datos', error);
            throw new Error('Error en obtener datos');
        }
    }

    async getGastoMes() {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .execute(`SP_GET_GASTOS_MESES`);
            return result.recordset[0];
        } catch (error) {
            console.error('Error en obtener datos', error);
            throw new Error('Error en obtener datos');
        }
    }

    async getGastosMes() {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .query(`SELECT monto, fecha FROM GASTO_OPERATIVO`);
            return result.recordset;
        } catch (error) {
            console.error('Error en obtener datos', error);
            throw new Error('Error en obtener datos');
        }
    }

    async getTopVentas() {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .execute(`SP_TOP_VENTAS`);
            return result.recordset;
        } catch (error) {
            console.error('Error en obtener datos', error);
            throw new Error('Error en obtener datos');
        }
    }

}