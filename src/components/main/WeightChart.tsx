import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: [
    '2022-01-01',
    '2022-01-02',
    '2022-01-03',
    '2022-01-04',
    '2022-01-05',
  ],
  datasets: [
    {
      label: '몸무게',
      data: [1, 70.5, 69.8, 69.9, 69.5],
      fill: false,
      borderColor: '#ff8339',
      backgroundColor: '#ff8339',
      tension: 0.1,
    },
  ],
};

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

const WeightChart = () => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default WeightChart;
