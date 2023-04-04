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
import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // datalabels import
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels, // datalabels 등록
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
        text: '',
      },
      datalabels: {
        display: true,
    
   
        weight: 'bold'
    
       
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
    await instance
      .get(`/individualscore/sum/date/` + userInfo.miSeq)
      .then((res: any) => {
        setLabel(res.data.score);

        console.log('ddd', res.data.score);
      });
  };

  // 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(userAtom);

  useEffect(() => {
    fetchData();
  }, []);
  // 초를 분 과 초로
  function convertSecondsToMinutesAndSeconds(seconds) {
    const minutes = Math.floor(seconds / 60); // 초를 분으로 변환
    const remainingSeconds = seconds % 60; // 남은 초 계산

    return `${minutes} ${remainingSeconds}`;
  }

  console.log(convertSecondsToMinutesAndSeconds(3000)); // "50분 0초"
  const formattedData = label.map(item => item.total);

  const formattedXData = label.map(item =>
    item.da.replace(/-/g, '.').substr(2, 15),
  );

  const data = {
    labels:formattedXData,

    datasets: [
      {
        label: '시간(초)',
        borderWidth: 2,
        borderColor: 'rgba(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        tension: 0.5,
        data: formattedData,
        
       
      },
    ],
  };

  // borderColor: '#ff8339',
  // backgroundColor: '#ff8339',

  return (
    <div className='bg-gray-50 rounded-xl p-3 my-3 text-xs'>
      <Line data={data} options={options} />
    </div>
  );
};
export default LineChart;
