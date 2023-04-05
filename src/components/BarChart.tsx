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
import type { ILabel } from 'pages/details/Detail';
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

  // Core options
  aspectRatio: 5 / 4,
  layout: {
    padding: {
      top: 0,
      right: 16,
      bottom: 16,
      left: 8,
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
    datalabels: {
      display: true,
      weight: 'bold',
      fontSize: 28,
    },
  },
};

interface IProps {
  barlabel: ILabel[];
}

const BarChart = (props: IProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#000000',
          // This more specific font property overrides the global property
          font: {
            size: 10,
          },
        },
      },

      datalabels: {
        color: '#000000',

        offset: 4,
        display: true,

        font: {
          size: 12,
          lineHeight: 1.2,
        },
      },
    },
  };
  // 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(userAtom);

  const formattedXData = props.barlabel.map(item => item.etName);
  // console.log(formattedXData, 'x축');
  const formattedYData = props.barlabel.map(item => item.total);

  // console.log(formattedYData);

  const data = {
    labels: formattedXData,
    datasets: [
      {
        label: '시간(초)',
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
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };
  return (
    <div className='bg-gray-50 rounded-xl p-3 my-3'>
      <Bar data={data} options={options} />
    </div>
  );
};
export default BarChart;
