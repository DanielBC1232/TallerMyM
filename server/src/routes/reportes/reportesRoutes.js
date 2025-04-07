import express from 'express';
import Excel from 'exceljs';
const router = express.Router();

import { CotizacionRepository } from '../../models/ventas/cotizacion.js';
const CotizacionRepo = new CotizacionRepository();

router.post('/generar-factura', async (req, res) => {
    try {
        const formData = req.body; //recibe los datos enviado de react
        const fechaActual = new Date().toISOString().split('T')[0]; // FormatoYYYY-MM-DD
        const fileName = `Factura-${fechaActual}.xlsx`; //nombre de archivo con fecha

        const workbook = new Excel.Workbook(); //nuevo xlsx
        const worksheet = workbook.addWorksheet('Factura'); //hoja de trabajo excel y empezar a escibir

        //columnas
        worksheet.columns = [
            { header: 'Código de Orden', key: 'codigoOrden', width: 20 },
            { header: 'Descripción', key: 'descripcionOrden', width: 40 },
            { header: 'Fecha de Ingreso', key: 'fechaIngreso', width: 15 },
            { header: 'Fecha de Venta', key: 'fechaVenta', width: 15 },
            { header: 'Cliente', key: 'nombreCliente', width: 25 },
            { header: 'Vehículo', key: 'vehiculo', width: 25 },
            { header: 'Monto Total', key: 'montoTotal', width: 15 },
            { header: 'Dinero Vuelto', key: 'dineroVuelto', width: 15 },
            { header: 'Método de Pago', key: 'metodoPago', width: 20 }
        ];

        //fila de header en negrita
        worksheet.getRow(1).font = { bold: true };

        //Fila con datos segun los datos recibidos (formData)
        worksheet.addRow({
            codigoOrden: formData.codigoOrden || 'N/A',
            descripcionOrden: formData.descripcionOrden || 'N/A',
            fechaIngreso: formData.fechaIngreso ? formData.fechaIngreso.split('T')[0] : 'N/A',
            fechaVenta: formData.fechaVenta ? formData.fechaVenta.split('T')[0] : 'N/A',
            nombreCliente: formData.nombreCliente || 'N/A',
            vehiculo: formData.vehiculo || 'N/A',
            montoTotal: formData.montoTotal || 0,
            dineroVuelto: formData.dineroVuelto || 0,
            metodoPago: formData.metodoPago || 'Tarjeta'
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

        await workbook.xlsx.write(res);
        res.end(); //terminar edicion de archivo y retornar
    } catch (error) {
        console.error('Error al generar el archivo XLSX:', error);
        res.status(500).json({ error: 'Error al generar el archivo XLSX' });
    }
});

router.post('/descargar-cotizacion/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);//tomar el id de cotizacion

        //traer datos de BD
        const cotizacion = await CotizacionRepo.getCotizacionById(id);

        if (!cotizacion) {//cotizacion no existe
            return res.status(404).json({ error: 'Cotización no encontrada' });
        }

        const fechaActual = new Date().toISOString().split('T')[0]; // FormatoYYYY-MM-DD
        const fileName = `Factura-${fechaActual}.xlsx`; //nombre de archivo con fecha

        const workbook = new Excel.Workbook(); //nuevo xlsx
        const worksheet = workbook.addWorksheet('Factura'); //hoja de trabajo excel y empezar a escibir

        //columnas
        worksheet.columns = [
            { header: 'Cliente', key: 'nombreCliente', width: 25 },
            { header: 'Detalles', key: 'detalles', width: 40 },
            { header: 'Fecha', key: 'fecha', width: 20 },
            { header: 'Monto Total', key: 'montoTotal', width: 20 },
            { header: 'Monto Mano de obra', key: 'montoManoObra', width: 40 },
        ];

        //fila de header en negrita
        worksheet.getRow(1).font = { bold: true };

        //Fila con datos segun los datos recibidos (formData)
        worksheet.addRow({
            nombreCliente: cotizacion.nombreCliente || 'N/A',
            detalles: cotizacion.detalles || 'N/A',
            fecha: cotizacion.fecha ? cotizacion.fecha.split('T')[0] : 'N/A',
            montoTotal: cotizacion.montoTotal || 0,
            montoManoObra: cotizacion.montoManoObra || 0,
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

        await workbook.xlsx.write(res);
        res.end(); //terminar edicion de archivo y retornar
    } catch (error) {
        console.error('Error al generar el archivo XLSX:', error);
        res.status(500).json({ error: 'Error al generar el archivo XLSX' });
    }
});

export default router;