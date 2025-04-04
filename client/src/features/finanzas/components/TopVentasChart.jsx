import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

export const BASE_URL = import.meta.env.VITE_API_URL;

const TopVentasChart = () => {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        const getDatos = async () => {
            try {
                const ventasRes = await axios.get(`${BASE_URL}/finanzas/obtener-top-ventas/`);
                setVentas(ventasRes.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        getDatos();
    }, []);

    const categories = ventas.map(item => item.nombreProducto);
    const seriesData = ventas.map(item => item.cantidad);

    const options = {
        chart: {
            type: 'bar',
            height: 380
        },
        title: {
            text: 'Top 10 Productos/Servicios Más Vendidos',
            align: 'center'
        },
        xaxis: {
            categories: categories,
            labels: {
                rotate: -45,
                style: {
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            title: {
                text: 'Ventas'
            },
            labels: {
                formatter: function (val) {
                    return val.toFixed(0);
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toFixed(2);
                }
            }
        }
    };

    const series = [
        {
            name: 'Ventas',
            data: seriesData
        }
    ];

    return (
        <div>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={380}
            />
        </div>
    );
};

export default TopVentasChart;
