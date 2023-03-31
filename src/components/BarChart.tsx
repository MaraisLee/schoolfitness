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
          memberNo: '1',
          type: '사이클링',
        },
      })
      .then((res: any) => {
        setLabel(res.data.list);
        console.log(res.data.list);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(label);
  const formattedYData = label.map((item, i) => ({
    x: item.etName,
    y: item.isTime,
  }));
  const formattedXData = label.map((item: any) => ({ y: item.isTime }));
  console.log(formattedXData[0]);
  // console.log(String(formattedXData[0]).getHours())
  // const sumArr = formattedXData.reduce((a,b)=>(a+b))
  //   getHours()	시간 중 '시'각을 숫자로 반환 ( 0 ~ 23 )
  // getMinutes()	시간 중 '분'을 숫자로 반환 ( 0 ~ 59 )
  // getSeconds()
  const data = {
    labels: [
      '걷기',
      '사이클링',
      '댄스',
      '하이킹',
      '수영',
      '코어트레이닝',
      '필라테스',
    ],
    datasets: [
      {
        label: '시간(분)',
        data: [233, 55, 66, 99, 777, 77, 444],
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
