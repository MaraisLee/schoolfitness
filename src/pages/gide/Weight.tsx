import React from 'react';
import { MdTimer } from 'react-icons/md';
const Weight = () => {
  return (
    <div className=''>
      <div className='flex justify-around items-center bg-[#ff8339] w-full h-[50px] rounded-b-[15px]'>
        <img src='images/arrow-white.png' alt='' className='scale-25' />
        <p> </p>
        <p> </p>
        <p className='text-white text-sm font-bold'> 운동가이드 </p>
        <p> </p>
        <p> </p>
        <MdTimer className='text-white' />
      </div>
      <div className='bg-red-200 h-[635px] m-5'>
        <div>
          <p className='w-16 h-7 mb-3 border-[#ff8339] rounded-lg text-center leading-7 text-white border-solid border-2'>
            level 1
          </p>
          <ul className='flex justify-around text-center items-center'>
            <li className='bg-white w-[150px]  '>
              {' '}
              <img
                src='images/run.jpg'
                alt=''
                className='text-center w-[130px] h-[150px]'
              />
              <span>달리기</span>
              <br />
              <span>16초</span>
            </li>
            <li className='bg-white w-[150px]  '>
              {' '}
              <img
                src='images/run.jpg'
                alt=''
                className='text-center w-[130px] h-[150px]'
              />
              <span>달리기</span>
              <br />
              <span>16초</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Weight;
