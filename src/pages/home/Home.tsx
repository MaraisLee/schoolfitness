import { HeaderCss, InnerCss } from 'styles/LayoutCss';

const Home = () => {
  return (
    <InnerCss>
      <div className='px-5'>
        <div className='text-center mt-10 bg-[#484D55] p-5 rounded-lg text-white'>
          지금 반 순위를 확인해보세요!
        </div>
        <div className='flex justify-between my-[40px] mx-[15px]'>
          <div className=''>
            <p className='text-[#7C7676]'>3학년 7반</p>
            <p className='text-[25px] font-bold'>허강현</p>
          </div>
          <p className='rounded-[50%] bg-slate-700 w-[60px] h-[60px]'></p>
        </div>
        <div className='p-[30px] rounded-md border'>
          <div className='flex justify-between text-justify '>
            <p className='text-[17px] font-bold text-[#474242] '>MY BODY</p>
            <div className='text-[#B5B5B5] text-[10px]'>
              <p>마지막 측정일</p>
              <p>2023. 03. 23</p>
            </div>
          </div>
          <div className='flex justify-between mt-[20px]'>
            <p className='text-[#FF8339] text-[20px] font-bold'>
              130
              <b className='text-[#5B5B5B] text-[15px] ml-[5px]'>cm</b>
            </p>
            <p className='text-[#FF8339] text-[20px] font-bold'>
              200<b className='text-[#5B5B5B] text-[15px] ml-[5px]'>kg</b>
            </p>
            <p className='text-[#FF8339] text-[20px] font-bold'>
              118.34<b className='text-[#5B5B5B] text-[15px] ml-[5px]'>BMI</b>
            </p>
          </div>
        </div>
      </div>
    </InnerCss>
  );
};

export default Home;
