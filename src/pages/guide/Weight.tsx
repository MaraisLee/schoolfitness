import React from 'react';
import arrowWhite from 'assets/arrowWhite.png';

import run from 'assets/run.png';
import { MdTimer } from 'react-icons/md';
import { Link } from 'react-router-dom';
const Weight = () => {
  return (
    <div className=''>
      <div className='flex justify-around items-center bg-[#ff8339] w-full h-[50px] rounded-b-[12px]'>
        <img src={arrowWhite} alt='' className='scale-25' />
        <p> </p>
        <p> </p>
        <p className='text-white text-sm font-bold'> 운동가이드 </p>
        <p> </p>
        <p> </p>
        <Link to={'/individual'}>
          <MdTimer className='text-white' />
        </Link>
      </div>
      <div className=' h-[635px] m-5 w-[65opx] scrall overflow-y-auto scrollbar-hide'>
        <div className=' h-[485px] pt-3 pl-3 bg-slate-100 mb-4'>
          <p className='w-16 h-7 mb-3 border-[#ff8339] rounded-lg text-center leading-7  text-[#ff8339] border-solid border-2'>
            level 1
          </p>

          <ul className='grid  gap-x-0 gap-y-4 grid-cols-2 ml-2 text-center '>
            {' '}
            <Link to={'/weightguide'}>
              <li className='bg-white w-[150px] drop-shadow rounded-md  '>
                {' '}
                <img
                  src={run}
                  alt=''
                  className='text-center w-[130px] h-[150px] mb-2 m-auto'
                />
                <span className='text-sm '>달리기</span>
                <br />
                <span className='text-xs '>16초</span>
              </li>
            </Link>
            <li className='bg-white w-[150px] drop-shadow rounded-md  '>
              {' '}
              <img
                src={run}
                alt=''
                className='text-center w-[130px] h-[150px] m-auto'
              />
              <span className='text-sm '>달리기</span>
              <br />
              <span className='text-xs'>16초</span>
            </li>
            <li className='bg-white w-[150px] drop-shadow rounded-md  '>
              {' '}
              <img
                src={run}
                alt=''
                className='text-center w-[130px] h-[150px] m-auto'
              />
              <span className='text-sm '>달리기</span>
              <br />
              <span className='text-xs'>16초</span>
            </li>
            <li className='bg-white w-[150px] drop-shadow rounded-md  '>
              {' '}
              <img
                src={run}
                alt=''
                className='text-center w-[130px] h-[150px] m-auto'
              />
              <span className='text-sm '>달리기</span>
              <br />
              <span className='text-xs'>16초</span>
            </li>
          </ul>
        </div>
        <div className=' h-[485px] pt-3 pl-3 bg-slate-100'>
          <p className='w-16 h-7 mb-3 border-[#ff8339] rounded-lg text-center leading-7  text-[#ff8339] border-solid border-2'>
            level 2
          </p>

          <ul className='grid  gap-x-0 gap-y-4 grid-cols-2 ml-2 text-center'>
            {' '}
            <li className='bg-white w-[150px] drop-shadow rounded-md  '>
              {' '}
              <img
                src={run}
                alt=''
                className='text-center w-[130px] h-[150px]   m-auto'
              />
              <span className='text-sm '>달리기</span>
              <br />
              <span className='text-xs'>16초</span>
            </li>
            <li className='bg-white w-[150px] drop-shadow rounded-md  '>
              {' '}
              <img
                src={run}
                alt=''
                className='text-center w-[130px] h-[150px] m-auto'
              />
              <span className='text-sm '>달리기</span>
              <br />
              <span className='text-xs'>16초</span>
            </li>
            <li className='bg-white w-[150px] drop-shadow rounded-md  '>
              {' '}
              <img
                src={run}
                alt=''
                className='text-center w-[130px] h-[150px] m-auto'
              />
              <span className='text-sm '>달리기</span>
              <br />
              <span className='text-xs'>16초</span>
            </li>
            <li className='bg-white w-[150px] drop-shadow rounded-md  '>
              {' '}
              <img
                src={run}
                alt=''
                className='text-center w-[130px] h-[150px] m-auto'
              />
              <span className='text-sm '>달리기</span>
              <br />
              <span className='text-xs'>16초</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Weight;
