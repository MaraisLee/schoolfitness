import { InnerCss } from 'styles/LayoutCss';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import icon from 'assets/icon.png';
import BackHandleClick from 'components/util/BackHandleClick';
import { useEffect, useState } from 'react';
import instance from 'api/axios';
// 상품권사진
import giftCard1  from 'assets/3000.png';
import giftCard2 from 'assets/5000.png';
const UserInfo = () => {
  // 공지사항 출력
  const [noticeList, setNoticeList] = useState<any>([]);
  //
  const noticeHandler = async () => {
    await instance
      .get('notice?page=0&size=10')
      .then(res => setNoticeList(res.data));
  };
  useEffect(() => {
    noticeHandler();
  }, []);
  return (
    <InnerCss className='px-5'>
      <BackHandleClick />
      <div className="overflow-y-auto scrollbar-hide h-[660px] ">
      <div className='mx-auto overflow-y-auto scrollbar-hide '>
        <p className='text-center mb-4'>회원정보</p>
        <div>
          <img className='mx-auto' src={icon} alt='프로필' />
        </div>
        <div className='flex justify-between py-9'>
          <button className='text-sm'>
            남긴운동 후기<span className='text-[#FF8339]'>(19)</span>
          </button>
        </div>
      </div>
      <div className=''>
        {' '}
        <button className='text-sm'>
          <Link to='/game'>
            보유상품권<span className='text-[#FF8339]'>(2)</span>
          </Link>
        </button>
        <div className='flex'>
          <img className='w-[50%]' src={giftCard1} alt='상품권이미지'></img>
          <img className='w-[50%]' src={giftCard2} alt='상품권이미지'></img>
        </div>
      </div>

      <div>
        <div className='flex justify-between '>
          <p>공지사항</p>
          <button className='flex text-sm'>
            더보기 <IoIosArrowForward />
          </button>
        </div>

        {noticeList.map((notice: any, i: number) => (
          <div key={i} className='my-6'>
            <p className='border-b-2 py-2 text-xs'>
              <span>{notice.gnRegDt.substr(0, 10)}</span> {notice.gnTitle}
              <span>{notice.gnRegDt.substr(11, 16)}</span>{' '}
            </p>
          </div>
        ))}
      </div>
      <div>
        <div className='flex justify-between py-6 border-b-2 '>
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
      </div>
    </InnerCss>
  );
};
export default UserInfo;
