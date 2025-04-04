import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

export const BASE_URL = import.meta.env.VITE_API_URL;

const IngresosChart = () => {
    const [ingresos, setIngresos] = useState([]);
    const [gastos, setGastos] = useState([]);

    useEffect(() => {
        const getDatos = async () => {
            try {
                const ingresosRes = await axios.get(`${BASE_URL}/finanzas/obtener-ganancias-mes/`);
                const gastosRes = await axios.get(`${BASE_URL}/finanzas/obtener-gastos-mes/`);
                setIngresos(ingresosRes.data);
                setGastos(gastosRes.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        getDatos();
    }, []);

    // Función para agrupar datos por fecha (mismo nodo)
    const agruparPorFecha = (data, key) => {
        return data.reduce((acc, item) => {
            const fecha = new Date(item.fecha).getTime();
            if (!acc[fecha]) {
                acc[fecha] = { x: fecha, y: item[key] };
            } else {
                acc[fecha].y += item[key];
            }
            return acc;
        }, {});
    };

    const seriesIngresos = Object.values(agruparPorFecha(ingresos, "total"));
    const seriesGastos = Object.values(agruparPorFecha(gastos, "monto"));

    const options = {
        chart: {
            type: 'line',
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        stroke: {
            curve: 'smooth'
        },
        markers: {
            size: 5
        },
        title: {
            text: 'Comparativo de Ingresos y Gastos',
            align: 'left'
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                }
            },
            title: {
                text: 'Monto'
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        }
    };

    return (
        <div>
            <ReactApexChart
                options={options}
                series={[
                    { name: 'Ingresos', data: seriesIngresos },
                    { name: 'Gastos', data: seriesGastos }
                ]}
                type="line"
                height={350}
            />
        </div>
    );
};

export default IngresosChart;
