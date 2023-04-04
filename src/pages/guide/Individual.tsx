import arrowWhite from 'assets/arrowWhite.png';
import cycling from 'assets/cycling.png';
import dance from 'assets/dance.png';
import hiking from 'assets/hiking.png';
import pilates from 'assets/pilates.png';
import pool from 'assets/pool.png';
import walking from 'assets/walking.png';
import yoga from 'assets/yoga.png';
import train from 'assets/train.png';
import { MdTimer } from 'react-icons/md';
import StopWatch from './StopWatch';
import { Radio } from 'antd';
import Form from 'antd/es/form';
import React, { useEffect, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'api/axios';
import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';

type IndividualType = {
  etDetail: string;
  etName: string;
  etSeq: number;
  url: string;
};
const Individual = () => {
  const imgArr = [walking, cycling, yoga, dance, train, pilates, pool, hiking];
  const [myexercise, setMyExercise] = useState<IndividualType[]>([]);
  const [form] = Form.useForm();
  const [value, setValue] = useState(5);
  const getindiData = async () => {
    await axios
      .get('exercise')
      .then(res => {
        // console.log('exercise : ', res.data);
        setMyExercise(res.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getindiData();
  }, []);

  // 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(userAtom);

  const onChange = (e: RadioChangeEvent) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
    const WeightList = async () => {
      try {
        const res = await axios.get(
          `
          individualscore/list`,
          { params: { memberNo: userInfo.miSeq } },
        );
        // console.log('WeightList');
      } catch (err) {
        console.log(err);
      }
    };
  };
  const navigate = useNavigate();

  const backHandleClick = () => {
    navigate(-1);
  };

  // 개인 측정용 운동 API(류승지) 개인측정용 운동목록조회/저장/개인기록조회 를 받아서 목록 만들기

  return (
    <div>
      <div className='flex mb-5 justify-around items-center  bg-[#ff8339] w-full h-[50px] rounded-b-[12px]'>
        <img
          src={arrowWhite}
          alt=''
          className='scale-25 '
          onClick={backHandleClick}
        />

        <p> </p>
        <p> </p>
        <p className='text-white text-sm font-bold '>⚾ 개인 운동기록 </p>
        <p> </p>
        <p> </p>

        <Link to={'/individual'}>
          <MdTimer className='text-white' />
        </Link>
      </div>
      <span
        className='m-5 font-bold text-[#ff8339] 
      '
      >
        종목을 선택하세요
      </span>
      <div className='mt-10 text-center  '>
        <Form
          name='todoform'
          form={form}
          layout='horizontal'
          labelCol={{}}
          wrapperCol={{}}
          style={{ maxWidth: '100%' }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label=''
            name=''
            initialValue={'5'}
            rules={[{ required: true, message: '' }]}
            className='bg-gray-50 p-4 mt-4 w-[320px] h-[320px] scrall mx-auto overflow-y-auto scrollbar-hide border-y-2 border-gray-100'
          >
            <Radio.Group>
              {myexercise.map((item, index) => (
                <Radio
                  key={item.etSeq}
                  value={item.etSeq}
                  className='flex w-72 h-20 bg-white pl-5 drop-shadow'
                  style={{ alignItems: 'center' }}
                  onChange={onChange}
                >
                  <div className='flex justify-between items-center pl-4'>
                    <img
                      src={imgArr[index]}
                      alt={item.etName}
                      style={{ width: 50, height: 50 }}
                    />
                    <span className='ml-[50px] text-lg font-black '>
                      {item.etName}
                    </span>
                  </div>
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <StopWatch part='individual' level={value} />
        </Form>
      </div>
    </div>
  );
};

export default Individual;
