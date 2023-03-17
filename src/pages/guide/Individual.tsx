import run1 from 'assets/run1.png';
import arrowWhite from 'assets/arrowWhite.png';
import cycling from 'assets/cycling.png';
import { MdTimer } from 'react-icons/md';
import StopWatch from './StopWatch';
import { Radio } from 'antd';
import Form from 'antd/es/form';
import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';

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
      <div className='flex justify-around items-center bg-[#ff8339] w-full h-[50px] rounded-b-[12px]'>
        <img src={arrowWhite} alt='' className='scale-25' />
        <p> </p>
        <p> </p>
        <p className='text-white text-sm font-bold'>웨이터 운동기록 </p>
        <p> </p>
        <p> </p>
        <MdTimer className='text-white' />
      </div>
      <div className='  m-5 bg-red-100  h-[380px] text-center'>
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
            name='sticker'
            initialValue={'1'}
            rules={[{ required: true, message: '스티커를 선택하세요.' }]}
          >
            <Radio.Group>
              <Radio value={'1'} className='flex bg-red-300 '>
                <img
                  src={cycling}
                  alt='운동'
                  style={{ width: 60, height: 60 }}
                />
                <span>fdahfdksdhf</span>
              </Radio>
              <Radio value={'2'}>
                <img
                  src={cycling}
                  alt='운동'
                  style={{ width: 30, height: 30 }}
                />
              </Radio>
              <Radio value={'3'}>
                <img
                  src={cycling}
                  alt='운동'
                  style={{ width: 30, height: 30 }}
                />
              </Radio>
              <Radio value={'4'}>
                <img
                  src={cycling}
                  alt='운동'
                  style={{ width: 30, height: 30 }}
                />
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
