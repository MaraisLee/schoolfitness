import { HeaderCss, InnerCss } from 'styles/LayoutCss';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useFetcher, useNavigate } from 'react-router-dom';
import icon from 'assets/icon.png';
import BackHandleClick from 'components/util/BackHandleClick';
import { useEffect, useState, useRef } from 'react';
import instance from 'api/axios';
import { userAtom, userDetailAtom, userPwAtom } from 'recoil/user';
import WithdrawalForm from 'components/user/WithdrawalForm';
import { AiOutlineGift, AiOutlineNotification } from 'react-icons/ai';

// 상품권사진
import giftCard1 from 'assets/3000won.png';
import giftCard2 from 'assets/5000won.png';
import giftCard3 from 'assets/10000won.png';
import giftCard4 from 'assets/20000won.png';

// 상품권스와이퍼
// recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { GameBt } from 'styles/Button';
import styled from '@emotion/styled';
import ModalLayout from 'components/common/ModalLayout';
const ModalFrame = styled.div`
  text-align: center;
  padding: 50px 0px;
  font-size: 17px;
`;

const ModalContent = styled.h2`
  font-weight: bold;
  text-align: center;
  color: #8d8d8d;
`;
const CloseButton = styled.button`
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #ff8339;
  border: none;
`;
const UserInfo = () => {
  // 로그아웃 모달
  const [logoutModal, setLogoutModal] = useState(false);
  const openLogout = () => {
    setLogoutModal(true);
  };
  const closeLogout = () => {
    setLogoutModal(false);
    setUserInfo('');
    setUserDetail('');
    setUserPw('');
    navigate('/');
  };
  const navigate = useNavigate();
  // 공지사항 출력
  const [noticeList, setNoticeList] = useState<any>([]);

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

  const [userDetail, setUserDetail] = useRecoilState(userDetailAtom);

  const logout = () => {
    openLogout();
  };

  // 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [userPw, setUserPw] = useRecoilState(userPwAtom);

  // 회원탈퇴 Modal
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  // 상품권출력
  const giftHandler = async () => {
    await instance
      .get('game/stamp/goods/' + userInfo.miSeq)
      .then((res: any) => {
        setGift(res.data.list);
        console.log(res.data.list, '상품권');
      });
  };
  console.log(userInfo, '유저정보');
  useEffect(() => {
    giftHandler();
  }, []);
  return (
    <>
      {logoutModal && (
        <ModalLayout visible={logoutModal}>
          <ModalContent>
            <ModalFrame>
              <ModalContent>로그아웃 되었습니다.</ModalContent>
              <CloseButton onClick={closeLogout}>확인</CloseButton>
            </ModalFrame>
          </ModalContent>
        </ModalLayout>
      )}
      <WithdrawalForm closeModal={closeModal} modalVisible={modalVisible} />
      <InnerCss className='px-5'>
        <HeaderCss>
          <BackHandleClick />
          <h1> 더보기 페이지</h1>
          <button className='text-white'>START</button>
        </HeaderCss>

        <div className='overflow-y-auto scrollbar-hide h-[660px] '>
          <div className='mx-auto overflow-y-auto scrollbar-hide '>
            <div className='my-3 flex flex-col gap-3'>
              <img
                className='mx-auto w-[80px] h-[80px]'
                src={`http://192.168.0.79:8888/api/member/img/${userDetail.mimg}`}
                alt='프로필'
              />
              <p className='text-center text-xs'>{userDetail?.nickname}</p>
            </div>
          </div>
          <div className='my-3 '>
            {' '}
            <button className='px-3 font-bold flex items-center'>
              <AiOutlineGift className='mx-1' />
              <Link to='/game'>보유상품권</Link>
            </button>
            <div className='flex'>
              <>
                {gift.length === 0 ? (
                  <div className='my-9 mx-auto text-xl z-9 font-bold text-orange-400'>
                    <p>현재보유하신 상품권이 없습니다.</p>
                  </div>
                ) : (
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={0}
                    className='mySwiper'
                  >
                    {' '}
                    {gift.map((item, i) => (
                      <SwiperSlide key={i}>
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
                    ))}
                  </Swiper>
                )}
              </>
            </div>
          </div>
          <div>
            <div className='bg-gray-50 rounded-lg p-3'>
              <div className='flex justify-between'>
                <p className='my-3 px-2 font-bold flex items-center'>
                  {' '}
                  <AiOutlineNotification className='mx-1' />
                  공지사항
                </p>
                <button className='flex text-sm p-3'>
                  <Link to='/notice'>
                    <IoIosArrowForward />
                  </Link>
                </button>
              </div>
              {noticeList.map((item, i) => (
                <div
                  className='flex justify-start gap-10 border-b-2 border-dotted px-3 last:border-b-0 border-gray-300 py-2'
                  key={i}
                >
                  <div className='text-xs '>{item.gnRegDt.substr(5, 5)}</div>
                  {/* <div className='text-xs '>{item.gnRegDt.substr(11, 13)}</div> */}
                  <div className='text-xs'>{item.gnTitle}</div>
                </div>
              ))}
            </div>

            <div
              onClick={() => navigate('/editprofile')}
              className='flex justify-between py-6 border-b-2 p-3 '
            >
              <p className=''>내 정보 관리 </p>
              <button>
                <p>
                  <IoIosArrowForward />
                </p>
              </button>
            </div>
            <div className='flex justify-between py-6 border-b-2  p-3'>
              <p className=''>로그아웃 </p>
              <button onClick={logout}>
                <p>
                  <IoIosArrowForward />
                </p>
              </button>
            </div>
            <div onClick={openModal} className='flex justify-between py-6  p-3'>
              <p onClick={openModal}>회원탈퇴 </p>
              <button>
                <p>
                  <IoIosArrowForward />
                </p>
              </button>
            </div>
          </div>
        </div>
      </InnerCss>
    </>
  );
};
export default UserInfo;
