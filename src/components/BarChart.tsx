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
import { useEffect, useState } from 'react';
import instance from 'api/axios';
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
interface ILabel {
  isSeq: number;
  isMiSeq: number;
  isRegDt: string;
  isTime: string;
  etName: string;
  levelType: string;
  giStatus: string;
  esType: string;
}
const BarChart = () => {
  const [label, setLabel] = useState<ILabel[]>([]);
  const fetchData = async () => {
    await instance
      .get('individualscore/list/change', {
        params: {
          memberNo: "1",
          type: '걷기',
        },
      })
      .then( (res : any) => setLabel(res.data.list));
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(label)
 const formattedYData = label.map(item => ({
    x: item.etName,
    y: item.isTime,
  }));
  const formattedXData = label.map(item => ({
    y: item.isTime,
  }));
console.log(formattedXData)
  // const sumArr = formattedXData.reduce((a,b)=>(a+b))
   const data = {
    datasets: [
      {
        label: '시간',
        data: formattedYData,
        backgroundColor: 'rgba(255, 131, 57, 0.9)',
      },
    ],
  };
  return (
    <div className='bg-gray-200 rounded-xl p-3 my-3'>
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarChart;