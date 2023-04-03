import { InnerCss } from 'styles/LayoutCss';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import icon from 'assets/icon.png';
import BackHandleClick from 'components/util/BackHandleClick';
import { useEffect, useState, useRef } from 'react';
import instance from 'api/axios';
// 상품권사진
import giftCard1 from 'assets/3000won.png';
import giftCard2 from 'assets/5000won.png';
import giftCard3 from 'assets/10000won.png';
import giftCard4 from 'assets/20000won.png';

// 상품권스와이퍼

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const UserInfo = () => {
  // 공지사항 출력
  const [noticeList, setNoticeList] = useState<any>([]);
  // 로그아웃
  const [logout, setLogout] = useState([]);
  // 보유상품권 출력
  const [gift, setGift] = useState<any>([]);
  const noticeHandler = async () => {
    await instance
      .get('notice?page=0&size=10')
      .then((res: any) => setNoticeList(res.data));
  };
  useEffect(() => {
    noticeHandler();
  }, []);
  // 로그아웃
  const logoutHandler = async () => {
    await instance.get('/member/logout').then((res: any) => {
      console.log(res.data.status);
      if (res.data.status) {
        alert(res.data.message);
        // console.log(res.data.message, '로그아웃 메세지');
      }
    });
  };
  // 상품권출력
  const giftHandler = async () => {
    await instance
      .get('http://192.168.0.79:8888/api/game/stamp/goods/1')
      .then((res: any) => setGift(res.data.list));
  };

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
          <button className=''>
            <Link to='/game'>보유상품권</Link>
          </button>
          <div className='flex'>
            <>
              {gift.length === 0 ? (
                <div className='my-10 mx-auto text-xl z-9 text-orange-400'>
                  <p>현재보유하신 상품권이 없습니다.</p>
                </div>
              ) : (
                gift.map((item, i) => (
                  <Swiper
                    key={i}
                    slidesPerView={2}
                    spaceBetween={0}
                    className='mySwiper'
                  >
                    <SwiperSlide>
                      <img
                        className='mx-auto '
                        src={
                          item.name === 'GS편의점 3000원'
                            ? giftCard1
                            : item.name === 'GS편의점 5000원'
                            ? giftCard2
                            : item.name === 'GS편의점 10000원'
                            ? giftCard3
                            : item.name === 'GS편의점 20000원'
                            ? giftCard4
                            : giftCard1
                        }
                        alt='상품권이미지'
                      ></img>
                    </SwiperSlide>
                  </Swiper>
                ))
              )}
            </>
          </div>
        </div>

        <div>
          <div className='bg-gray-100 rounded-lg p-3'>
            <div className='flex justify-between'>
              <p className='my-3'>공지사항</p>
              <button className='flex text-sm p-3'>
                <Link to='/notice'>
                  {' '}
                  <IoIosArrowForward />
                </Link>
              </button>
            </div>
            {noticeList.map((item, i) => (
              <div
                className='flex justify-start gap-5 border-b-2 border-gray-300 py-2'
                key={i}
              >
                <div className='text-xs '>{item.gnRegDt.substr(0, 10)}</div>
                <div className='text-xs '>{item.gnRegDt.substr(11, 13)}</div>
                <div className='text-xs'>{item.gnTitle}</div>
              </div>
            ))}
          </div>
          <div className='flex justify-between py-6 border-b-2 p-3 '>
            <p>내 정보 관리 </p>
            <button>
              <p>
                <IoIosArrowForward />
              </p>
            </button>
          </div>
          <div className='flex justify-between py-6 border-b-2  p-3'>
            <p>로그아웃 </p>
            <button onClick={logoutHandler}>
              <p>
                <IoIosArrowForward />
              </p>
            </button>
          </div>
          <div className='flex justify-between py-6 border-b-2  p-3'>
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
