import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '개인성적통계',
    },
  },
};

const labels = [
  '2023.03.01',
  '2023.03.02',
  '2023.03.03',
  '2023.03.04',
  '2023.03.05',
  '2023.03.06',
  '2023.03.07',
];

export const data = {
  labels,
  datasets: [
    {
      label: '시간(분)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 131, 57)',
      backgroundColor: 'rgba(255, 131, 57)',
    },
  ],
};

const LineChart = () => {
  return (
    <div className='bg-gray-200 rounded-xl p-3 my-3'>
      <Line data={data} />
    </div>
  );
};
export default LineChart;
