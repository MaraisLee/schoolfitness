import { InnerCss } from 'styles/LayoutCss';
import { IoIosArrowForward } from 'react-icons/io';
const UserInfo = () => {
  return (
    <InnerCss className='px-5'>
      <div className='mx-auto'>
        <p className='text-center'>회원정보</p>
        <div>
          <img
            className='rounded-xl my-9 w-9 mx-auto'
            src='/images/logo.png'
            alt='프로필'
          />
        </div>
        <div className='flex justify-between py-9'>
          <button className='text-sm'>
            남긴운동 후기<span className='text-[#FF8339]'>(19)</span>
          </button>
          <button className='text-sm'>
            보유상품권현황<span className='text-[#FF8339]'>(2)</span>
          </button>
        </div>
      </div>
      <div>
        <div className='flex justify-between py-[100px]'>
          <p>공지사항</p>
          <button className='flex text-sm'>
            더보기 <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div>
        <div className='flex justify-between py-6 border-b-2'>
          <p>내 정보 관리 </p>
          <button>
            <p>
              <IoIosArrowForward />
            </p>
          </button>
        </div>
        <div className='flex justify-between py-6 border-b-2'>
          <p>로그아웃 </p>
          <button>
            <p>
              <IoIosArrowForward />
            </p>
          </button>
        </div>
        <div className='flex justify-between py-6 border-b-2'>
          <p>회원탈퇴 </p>
          <button>
            <p>
              <IoIosArrowForward />
            </p>
          </button>
        </div>
      </div>
    </InnerCss>
  );
};
export default UserInfo;
