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
import { Link } from 'react-router-dom';
import axios from 'api/axios';

type propsType = {
  addTodo: (
    uid: string,
    title: string,
    body: string,
    done: boolean,
    sticker: string,
    date: string,
  ) => void;
};
const Individual = () => {
  const [myexercise, setMyExercise] = useState([]);
  const [form] = Form.useForm();
  const [value, setValue] = useState(5);
  const getindiData = async () => {
    await axios
      .get('api/exercise')
      .then(res => {
        console.log(res.data);

        setMyExercise(res.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getindiData();
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
    const WeightList = async () => {
      try {
        const res = await axios.get(
          `
          individualscore/list?memberNo=1`,
        );
        console.log('WeightList');
      } catch (err) {
        console.log(err);
      }
    };
  };

  // 개인 측정용 운동 API(류승지) 개인측정용 운동목록조회/저장/개인기록조회 를 받아서 목록 만들기

  return (
    <div>
      <div className='flex mb-5 justify-around items-center pl-4 bg-[#ff8339] w-full h-[50px] rounded-b-[12px]'>
        <Link to={'/detail'}>
          <img src={arrowWhite} alt='' className='scale-25' />
        </Link>
        <p> </p>
        <p> </p>
        <p className='text-white text-sm font-bold'>웨이터 운동기록 </p>
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
              <Radio
                value={'5'}
                className='flex w-72 h-20 bg-white pl-5 drop-shadow'
                style={{ alignItems: 'center' }}
                onChange={onChange}
              >
                <div className='flex justify-between items-center pl-4'>
                  <img
                    src={cycling}
                    alt='운동'
                    style={{ width: 50, height: 50 }}
                  />
                  <span className='ml-[50px] text-lg font-black '>
                    사이클링
                  </span>
                </div>
              </Radio>
              <Radio
                value={'6'}
                className='flex w-72 h-20 bg-white pl-5 drop-shadow '
                style={{ alignItems: 'center' }}
                onChange={onChange}
              >
                <div className='flex justify-between items-center pl-4'>
                  <img
                    src={dance}
                    alt='운동'
                    style={{ width: 50, height: 50 }}
                  />
                  <span className='ml-[50px] text-lg font-black '>댄스</span>
                </div>
              </Radio>
              <Radio
                value={'7'}
                className='flex w-72 h-20 bg-white pl-5 drop-shadow'
                style={{ alignItems: 'center' }}
                onChange={onChange}
              >
                <div className='flex justify-between items-center pl-4 '>
                  <img
                    src={hiking}
                    alt='운동'
                    style={{ width: 50, height: 50 }}
                  />
                  <span className='ml-[50px] text-lg font-black '>하이킹</span>
                </div>
              </Radio>
              <Radio
                value={'8'}
                className='flex w-72 h-20 bg-white pl-5 drop-shadow'
                style={{ alignItems: 'center' }}
                onChange={onChange}
              >
                <div className='flex justify-between items-center pl-4'>
                  <img
                    src={pilates}
                    alt='운동'
                    style={{ width: 50, height: 50 }}
                  />
                  <span className='ml-[50px] text-lg font-black '>
                    필라테스
                  </span>
                </div>
              </Radio>
              <Radio
                value={'9'}
                className='flex w-72 h-20 bg-white pl-5 drop-shadow'
                style={{ alignItems: 'center' }}
                onChange={onChange}
              >
                <div className='flex justify-betwee items-center pl-4'>
                  <img
                    src={pool}
                    alt='운동'
                    style={{ width: 50, height: 50 }}
                  />
                  <span className='ml-[50px] text-lg font-black '>수영</span>
                </div>
              </Radio>
              <Radio
                value={'10'}
                className='flex w-72 h-20 bg-white pl-5 drop-shadow'
                style={{ alignItems: 'center' }}
                onChange={onChange}
              >
                <div className='flex justify-betwee items-center pl-4'>
                  <img
                    src={walking}
                    alt='운동'
                    style={{ width: 50, height: 50 }}
                  />
                  <span className='ml-[50px] text-lg font-black '>걷기</span>
                </div>
              </Radio>
              <Radio
                value={'11'}
                className='flex w-72 h-20 bg-white pl-5 drop-shadow'
                style={{ alignItems: 'center' }}
                onChange={onChange}
              >
                <div className='flex justify-betwee items-center pl-4'>
                  <img
                    src={yoga}
                    alt='운동'
                    style={{ width: 50, height: 50 }}
                  />
                  <span className='ml-[50px] text-lg font-black '>요가</span>
                </div>
              </Radio>
              <Radio
                value={'12'}
                className='flex w-72 h-20 bg-white pl-5 drop-shadow'
                style={{ alignItems: 'center' }}
                onChange={onChange}
              >
                <div className='flex justify-betwee items-center pl-4'>
                  <img
                    src={train}
                    alt='운동'
                    style={{ width: 50, height: 50 }}
                  />
                  <span className='ml-[50px] text-lg font-black '>
                    코어트레이닝
                  </span>
                </div>
              </Radio>
            </Radio.Group>
          </Form.Item>
          <StopWatch part='individual' level={value} />
        </Form>
      </div>
    </div>
  );
};

export default Individual;
