import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

const labels = ['스쿼트', '달리기', '풀업', '푸쉬업', '줄넘기', '플랭크', '걷기','d'];

export const data = {
  labels,
  datasets: [
    {
      label: '시간',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 131, 57, 0.9)',
    },
 
  ],
};
const BarChart = () => {
  return (
    <div className='bg-gray-200 rounded-xl p-3 my-3'>
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarChart;
