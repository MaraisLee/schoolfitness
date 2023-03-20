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
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Link } from 'react-router-dom';

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
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <div className='flex mb-5 justify-around items-center bg-[#ff8339] w-full h-[50px] rounded-b-[12px]'>
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
      <span className='m-5 '>종목을 선택하세요.</span>
      <div className='  m-5  h-[380px] text-center  scrall overflow-y-auto scrollbar-hide'>
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
            initialValue={'1'}
            rules={[{ required: true, message: '' }]}
          >
            <Radio.Group>
              <Radio
                value={'1'}
                className='flex w-72 h-20 bg-white pl-3 drop-shadow'
                style={{ alignItems: 'center' }}
              >
                <div className='flex justify-betwee items-center'>
                  <img
                    src={cycling}
                    alt='운동'
                    style={{ width: 60, height: 60 }}
                  />
                  <span className='ml-[60px] text-xl font-black '>
                    사이클링
                  </span>
                </div>
              </Radio>
              <Radio
                value={'2'}
                className='flex w-72 h-20 bg-white pl-3 drop-shadow '
                style={{ alignItems: 'center' }}
              >
                <div className='flex justify-betwee items-center'>
                  <img
                    src={dance}
                    alt='운동'
                    style={{ width: 60, height: 60 }}
                  />
                  <span className='ml-[60px] text-xl font-black '>댄스</span>
                </div>
              </Radio>
              <Radio
                value={'3'}
                className='flex w-72 h-20 bg-white pl-3 drop-shadow'
                style={{ alignItems: 'center' }}
              >
                <div className='flex justify-betwee items-center '>
                  <img
                    src={hiking}
                    alt='운동'
                    style={{ width: 60, height: 60 }}
                  />
                  <span className='ml-[60px] text-xl font-black '>하이킹</span>
                </div>
              </Radio>
              <Radio
                value={'4'}
                className='flex w-72 h-20 bg-white pl-3 drop-shadow'
                style={{ alignItems: 'center' }}
              >
                <div className='flex justify-betwee items-center'>
                  <img
                    src={pilates}
                    alt='운동'
                    style={{ width: 60, height: 60 }}
                  />
                  <span className='ml-[60px] text-xl font-black '>
                    필라테스
                  </span>
                </div>
              </Radio>
              <Radio
                value={'5'}
                className='flex w-72 h-20 bg-white pl-3 drop-shadow'
                style={{ alignItems: 'center' }}
              >
                <div className='flex justify-betwee items-center'>
                  <img
                    src={pool}
                    alt='운동'
                    style={{ width: 60, height: 60 }}
                  />
                  <span className='ml-[60px] text-xl font-black '>수영</span>
                </div>
              </Radio>
              <Radio
                value={'6'}
                className='flex w-72 h-20 bg-white pl-3 drop-shadow'
                style={{ alignItems: 'center' }}
              >
                <div className='flex justify-betwee items-center'>
                  <img
                    src={walking}
                    alt='운동'
                    style={{ width: 60, height: 60 }}
                  />
                  <span className='ml-[60px] text-xl font-black '>걷기</span>
                </div>
              </Radio>
              <Radio
                value={'7'}
                className='flex w-72 h-20 bg-white pl-3 drop-shadow'
                style={{ alignItems: 'center' }}
              >
                <div className='flex justify-betwee items-center'>
                  <img
                    src={yoga}
                    alt='운동'
                    style={{ width: 60, height: 60 }}
                  />
                  <span className='ml-[60px] text-xl font-black '>요가</span>
                </div>
              </Radio>
              <Radio
                value={'8'}
                className='flex w-72 h-20 bg-white pl-3 drop-shadow'
                style={{ alignItems: 'center' }}
              >
                <div className='flex justify-betwee items-center'>
                  <img
                    src={train}
                    alt='운동'
                    style={{ width: 60, height: 60 }}
                  />
                  <span className='ml-[60px] text-xl font-black '>
                    코어트레이닝
                  </span>
                </div>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
      <StopWatch />
    </div>
  );
};

export default Individual;
