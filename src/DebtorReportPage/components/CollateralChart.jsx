import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { BigNumConv } from '../../utils/helper/helper';

// Registra i componenti di Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const CollateralChart = ({ colateralArray }) => {
    const data = {
        labels: colateralArray.map(item => item.ticker), // Nomi dei token
        datasets: [
            {
                label: 'Collateral Quantity',
                data: colateralArray.map(item => BigNumConv(item.amount)), // Quantità di ciascun token
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Colore delle barre
                borderColor: 'rgba(75, 192, 192, 1)', // Colore del bordo
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Collateral Distribution',
            },
        },
    };

    return <Bar data={data} options={options} />;
};