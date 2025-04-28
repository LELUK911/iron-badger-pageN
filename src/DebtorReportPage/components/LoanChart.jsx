import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import { BigNumConv } from '../../utils/helper/helper';

ChartJS.register(ArcElement, Tooltip, Legend, Title);
export const LoansChart = ({ loanArray }) => {
    const data = {
        labels: loanArray.map(item => item.ticker), // Nomi dei token
        datasets: [
            {
                label: 'Quantità Prestiti',
                data: loanArray.map(item => BigNumConv(item.amount)), // Quantità di ciascun token
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ], // Colori delle fette
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ], // Colori dei bordi
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
                text: 'Distribuzione dei Prestiti',
            },
        },
    };

    return (
        <div className="flex justify-center items-center w-full h-[500px] p-4">
            <div className="w-full h-full">
                <Pie
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: false,
                            },
                        },
                    }}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>

    );
};