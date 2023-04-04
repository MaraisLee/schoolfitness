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
import { userAtom } from 'recoil/user';
import { useRecoilValue } from 'recoil';

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
  // 유저정보
  const userinfo = useRecoilValue(userAtom);
  console.log(userinfo.miSeq);
  const [label, setLabel] = useState<ILabel[]>([]);
  const fetchData = async () => {
    await instance
      .get('/individualscore/sum/name/' + userinfo.miSeq)
      .then((res: any) => {
        setLabel(res.data.score);
        console.log(res.data.score, "총 합계")
       
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const formattedYData = label.map((item) => ({
    x: item.etName,
    y: item.total,
  }));
 
  console.log(formattedYData)
 
  const data = {
    formattedYData,
    datasets: [
      {
        label: '시간(초)',
        data: formattedYData,
        backgroundColor: 'rgba(255, 131, 57, 0.9)',
      },
    ],
  };
  return (
    <div className='bg-gray-50 rounded-xl p-3 my-3'>
        <p className='text-center'>개인성적 통계</p>
      <Bar options={options} data={data} />
    </div>
  );
};
export default BarChart;
