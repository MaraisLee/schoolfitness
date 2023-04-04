import instance from 'api/axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';

// const options = {
//   plugins: {
//     legend: {
//       display: false,
//     },
//     tooltip: {
//       // 기존 툴팁 사용 안 함
//       enabled: false,
//     },
//   },
//   datalabels: {
//     // datalables 플러그인 세팅
//     formatter: function (value, context) {
//       var idx = context.dataIndex; // 각 데이터 인덱스

//       // 출력 텍스트
//       return context.chart.data.labels + value + '%';
//     },
//   },
// };

interface IWeight {
  mwSeq: number;
  mwRegDt: string;
  mwWeight: number;
}

type WeightChartProps = {
  editModalVisible: boolean;
};

const WeightChart = ({ editModalVisible }: WeightChartProps) => {
  const [weight, setWeight] = useState<IWeight[]>([]);
  const userInfo = useRecoilValue(userAtom);
  const fetchData = async () => {
    await instance
      .get(`member/weight/{seq}?seq=${userInfo.miSeq}`)
      .then(res => {
        setWeight(res.data.list);
      });
  };

  useEffect(() => {
    fetchData();
  }, [editModalVisible]);

  const date = weight.map(item => item.mwRegDt);
  const weightData = weight.map(item => item.mwWeight);

  const data = {
    labels: date,
    datasets: [
      {
        label: '몸무게',
        data: weightData,
        fill: false,
        borderColor: '#ff8339',
        backgroundColor: '#ff8339',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default WeightChart;
