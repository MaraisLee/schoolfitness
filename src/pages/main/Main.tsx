import instance from 'api/axios';
import { useState, useEffect } from 'react';
import { HeaderCss, InnerCss } from 'styles/LayoutCss';

interface IUser {
  id: string;
  tall: number;
  weight: number;
  nickname: string;
  classnum: string;
  gen: string;
  type: string;
  mimg: string;
}

const Main = () => {
  const [user, setUser] = useState<IUser>();
  console.log(user);
  const fetchData = async () => {
    try {
      const result = await instance.get(`member/1`);
      setUser(result.data.info);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='px-5'>
      <div className='text-center mt-10 bg-[#484D55] p-5 rounded-lg text-white'>
        지금 반 순위를 확인해보세요!
      </div>
      <div className='flex justify-between items-center my-10 mx-4'>
        <div>
          <p className='text-[#7C7676]'>{user?.classnum}</p>
          <p className='text-[25px] font-bold'>{user?.nickname}</p>
        </div>
        <img
          src={user?.mimg}
          className='rounded-full bg-slate-700 w-[60px] h-[60px]'
        ></img>
      </div>
      <div className='p-[30px] rounded-md shadow'>
        <div className='flex justify-between text-justify '>
          <p className='text-[17px] font-bold text-[#474242] '>MY BODY</p>
          <div className='text-[#B5B5B5] text-[10px]'>
            <p>마지막 측정일</p>
            <p>2023. 03. 23</p>
          </div>
        </div>
        <div className='flex justify-between mt-[20px]'>
          <p className='text-[#FF8339] text-[20px] font-bold'>
            {user?.tall}
            <b className='text-[#5B5B5B] text-[15px] ml-[5px]'>cm</b>
          </p>
          <p className='text-[#FF8339] text-[20px] font-bold'>
            {user?.weight}
            <b className='text-[#5B5B5B] text-[15px] ml-[5px]'>kg</b>
          </p>
          <p className='text-[#FF8339] text-[20px] font-bold'>
            {getBMI(user?.tall, user?.weight)}
            <b className='text-[#5B5B5B] text-[15px] ml-[5px]'>BMI</b>
          </p>
        </div>
      </div>
    </div>
  );
};

function getBMI(tall: number | undefined, weight: number | undefined) {
  if (typeof tall === 'number' && typeof weight === 'number') {
    return ((weight / (tall * tall)) * 10000).toFixed(2);
  }
}

export default Main;
