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
    miSeq: number;
    miNickname: string;
    da: string;
    total: number;
  }

  const [label, setLabel] = useState<ILabel[]>([]);
  const fetchData = async () => {
    await instance.get(`/individualscore/sum/date/1`, {}).then((res: any) => {
      setLabel(res.data.score);

      console.log('ddd', res.data.score);
    });
  };

  // 점수 삭제
  const deleteScore = (idx: number) => {
    const deletedScore = [...label];
    deletedScore.splice(idx, 1);
    setLabel(deletedScore);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const formattedData = label.map(item => ({
    x: item.da.replace(/-/g, '.').substr(2, 15),
    y: item.total,
  }));

  const formattedXData = label.map(item => ({
    x: item.da,
  }));
  const data = {
    formattedData,

    datasets: [
      {
        label: '시간(분)',
        borderColor: 'rgb(255, 131, 57)',
        borderWidth: 2,
        backgroundColor: 'rgba(255, 131, 57)',
        data: formattedData,
      },
    ],
  };
  return (
    <div className='bg-gray-200 rounded-xl p-3 my-3 text-xs'>
      <Line data={data} />
    </div>
  );
};
export default LineChart;
