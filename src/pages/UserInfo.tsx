import { InnerCss } from 'styles/LayoutCss';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import icon from 'assets/icon.png';
import BackHandleClick from 'components/util/BackHandleClick';
import { useEffect, useState, useRef } from 'react';
import instance from 'api/axios';
// 상품권사진
import giftCard1 from 'assets/3000.png';
import giftCard2 from 'assets/5000.png';

// 상품권스와이퍼

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


const UserInfo = () => {
  // 공지사항 출력
  const [noticeList, setNoticeList] = useState<any>([]);
  //
  const noticeHandler = async () => {
    await instance
      .get('notice?page=0&size=10')
      .then( (res : any) => setNoticeList(res.data));
  };
  useEffect(() => {
    noticeHandler();
  }, []);
  return (
    <InnerCss className='px-5'>
      <BackHandleClick />
      <div className='overflow-y-auto scrollbar-hide h-[660px] '>
        <div className='mx-auto overflow-y-auto scrollbar-hide '>
          <p className='text-center mb-2'>회원정보</p>
          <div className='my-4'>
            <img className='mx-auto' src={icon} alt='프로필' />
            <p className='text-center'>닉네임</p>
          </div>
        
        </div>
        <div className='my-3'>
          {' '}
          <button className='text-sm'>
            <Link to='/game'>
              보유상품권<span className='text-[#FF8339]'>(4)</span>
            </Link>
          </button>
          <div className='flex'>
            <>
              <Swiper
               slidesPerView={2}
               spaceBetween={0}
               className='mySwiper'>
                <SwiperSlide>
                  {' '}
                  <img
                    className='mx-auto '
                    src={giftCard1}
                    alt='상품권이미지'
                  ></img>
                </SwiperSlide>
                <SwiperSlide>
                  {' '}
                  <img
                    className='mx-auto'
                    src={giftCard2}
                    alt='상품권이미지'
                  ></img>
                </SwiperSlide>
                <SwiperSlide>
                  {' '}
                  <img
                    className='mx-auto'
                    src={giftCard2}
                    alt='상품권이미지'
                  ></img>
                </SwiperSlide>
                <SwiperSlide>
                  {' '}
                  <img
                    className='mx-auto'
                    src={giftCard2}
                    alt='상품권이미지'
                  ></img>
                </SwiperSlide>
              </Swiper>
            </>
          </div>
        </div>
        <div>
        
        </div>
        <div>
        <div className='flex justify-between pb-6 mt-9 border-b-2 '>
        <p>공지사항</p>
            <button className='flex text-sm'><Link to="/notice">  <IoIosArrowForward /></Link>
            
            </button>
          </div>
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
