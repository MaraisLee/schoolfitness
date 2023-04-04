import instance from 'api/axios';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';
import { userAtom, userDetailAtom } from 'recoil/user';

interface IWeight {
  mwSeq: number;
  mwRegDt: string;
  mwWeight: number;
}

type WeightChartProps = {
  editModalVisible: boolean;
};

const BMIChart = ({ editModalVisible }: WeightChartProps) => {
  const [weight, setWeight] = useState<IWeight[]>([]);
  const userInfo = useRecoilValue(userAtom);
  const userDetail = useRecoilValue(userDetailAtom);

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
  const BMIData = weight.map(item => getBMI(userDetail.tall, item.mwWeight));

  const data = {
    labels: date,
    datasets: [
      {
        label: 'BMI',
        data: BMIData,
        backgroundColor: '#ff8339',
        borderWidth: 1,
        barPercentage: 0.5, // 막대의 너비 비율
        categoryPercentage: 0.5, // 카테고리 간격 비율
      },
    ],
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

function getBMI(tall: number | undefined, weight: number | undefined) {
  if (typeof tall === 'number' && typeof weight === 'number') {
    return ((weight / (tall * tall)) * 10000).toFixed(2);
  }
}

export default BMIChart;
