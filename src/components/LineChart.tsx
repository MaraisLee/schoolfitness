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
import { useEffect, useState } from 'react';
import instance from 'api/axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = () => {
  const options = {
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

  const [label, setLabel] = useState<ILabel[]>([]);

  const fetchData = async () => {
    await instance
      .get('individualscore/list/change', {
        params: {
          memberNo: 1,
          type: '걷기',
        },
      })
      .then(res => setLabel(res.data.list));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const formattedYData = label.map(item => ({
    x: item.isRegDt,
    y: item.isTime,
  }));
  const formattedXData = label.map(item => ({
    x: item.isRegDt,
    
  }));
  const data = {

    datasets: [
      {
       
        label: '시간(분)',
        
        borderColor: 'rgb(255, 131, 57)',
        borderWidth: 2,
        backgroundColor: 'rgba(255, 131, 57)',
        data: formattedYData,
      },
    ],
  };

 

  return (
    <div className='bg-gray-200 rounded-xl p-3 my-3'>
      <Line data={data} />
    </div>
  );
};
export default LineChart;
