import { InnerCss } from 'styles/LayoutCss';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import icon from 'assets/icon.png';
import BackHandleClick from 'components/util/BackHandleClick';

const UserInfo = () => {
  return (
    <InnerCss className='px-5'>
      <BackHandleClick />
      <div className='mx-auto'>
        <p className='text-center mb-4'>회원정보</p>
        <div>
          <img className='mx-auto' src={icon} alt='프로필' />
        </div>
        <div className='flex justify-between py-9'>
          <button className='text-sm'>
            남긴운동 후기<span className='text-[#FF8339]'>(19)</span>
          </button>
          <button className='text-sm'>
            <Link to='/game'>
              보유상품권<span className='text-[#FF8339]'>(2)</span>
            </Link>
          </button>
        </div>
      </div>
      <div>
        <div className='flex justify-between '>
          <p>공지사항</p>
          <button className='flex text-sm'>
            더보기 <IoIosArrowForward />
          </button>
        </div>
        <div className='my-6'>
          <p className='border-b-2 py-2 text-xs'>공지사항아직 없습니다</p>
          <p className='border-b-2 py-2 text-xs'>공지사항적러줭</p>
          <p className='border-b-2 py-2 text-xs'>공지사항적러줭</p>
          <p className='border-b-2 py-2 text-xs'>공지사항적러줭</p>
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
