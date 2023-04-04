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
import { RecoilState, useRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';
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
      text: '',
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
  miSeq: string;
  miNickname: string;
  total: number;
}

const BarChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '',
      },
      datalabels: {
        display: false,
      },
      scales: {
        y: {
          ticks: {
            display: true,
          },
        },
      },
    },
  };
  // 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(userAtom);

  const [label, setLabel] = useState<ILabel[]>([]);
  console.log(userInfo.miSeq, '바차트유저');
  const fetchData = async () => {
    await instance
      .get('/individualscore/sum/name/' + userInfo.miSeq)
      .then((res: any) => {
        setLabel(res.data.score);
        console.log(res.data.score, '총 합계');
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const formattedXData = label.map((item)=> item.etName);
  console.log(formattedXData, 'x축');
  const formattedYData = label.map(item => item.total);

  console.log(formattedYData);

  const data = {
    labels: formattedXData,
    datasets: [
      {
        label: '시간(분)',
        data: formattedYData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 205, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(201, 203, 207, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 205, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(201, 203, 207, 0.7)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='bg-gray-50 rounded-xl p-3 my-3'>
      <Bar data={data} />
    </div>
  );
};
export default BarChart;
