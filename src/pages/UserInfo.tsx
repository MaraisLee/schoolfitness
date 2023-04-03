import { InnerCss } from 'styles/LayoutCss';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import icon from 'assets/icon.png';
import BackHandleClick from 'components/util/BackHandleClick';
import { useEffect, useState } from 'react';
import instance from 'api/axios';
// 상품권사진
import giftCard1 from 'assets/3000.png';
import giftCard2 from 'assets/5000.png';
// recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// 상품권스와이퍼

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { userAtom, userDetailAtom } from 'recoil/user';
import { setCookie } from 'api/cookie';
import WithdrawalForm from 'components/user/WithdrawalForm';
import axios from 'axios';

const UserInfo = () => {
  const navigate = useNavigate();
  // 공지사항 출력
  const [noticeList, setNoticeList] = useState<any>([]);
  // 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(userAtom);

  // 회원탈퇴 Modal
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const noticeHandler = async () => {
    await instance
      .get('notice?page=0&size=10')
      .then((res: any) => setNoticeList(res.data));
  };

  const logout = async () => {
    await instance.get('member/logout');
    setUserInfo('');
    setCookie('access_token', '');
    navigate('/');
  };
  useEffect(() => {
    noticeHandler();
  }, []);

  // 이미지 업로드
  const [userDetail, setUserDetail] = useRecoilState(userDetailAtom);
  const [image, setImage] = useState(null);

  const handleImageChange = async e => {
    const selectedImage = e.target.files[0];
    console.log(selectedImage);

    const formData = new FormData();
    formData.append('file', selectedImage);
    try {
      const response = await instance.put(
        `member/img/${userInfo.miSeq}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data.imageUrl);

      setUserDetail({
        ...userDetail,
        mimg: response.data.imageUrl, // 서버에서 반환하는 이미지 경로에 따라 수정해야 함
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageClick = () => {
    const input = document.getElementById('file-input');
    input?.click();
  };
  return (
    <>
      <WithdrawalForm closeModal={closeModal} modalVisible={modalVisible} />
      <InnerCss className='px-5'>
        <BackHandleClick />
        <div className='overflow-y-auto scrollbar-hide h-[660px] '>
          <div className='mx-auto overflow-y-auto scrollbar-hide '>
            <p className='text-center mb-2'>회원정보</p>
            <div className='my-4 flex flex-col gap-3'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                id='image'
                name='image'
              />
              <input
                type='file'
                multiple={true}
                id='file-input'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <img
                className='mx-auto w-[80px] h-[80px]'
                src={`http://192.168.0.79:8888/api/download/img/member/기본이미지1679533686278.jpg`}
                alt='프로필'
                onClick={handleImageClick}
              />
              <p className='text-center'>{userDetail?.nickname}</p>
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
                <Swiper slidesPerView={2} spaceBetween={0} className='mySwiper'>
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
          <div></div>
          <div>
            <div className='flex justify-between pb-6 mt-9 border-b-2 '>
              <p>공지사항</p>
              <button className='flex text-sm'>
                <Link to='/notice'>
                  {' '}
                  <IoIosArrowForward />
                </Link>
              </button>
            </div>
            <div
              className='flex justify-between py-6 border-b-2'
              onClick={() => navigate('/editprofile')}
            >
              <p>내 정보 관리 </p>
              <button>
                <p>
                  <IoIosArrowForward />
                </p>
              </button>
            </div>
            <div
              className='flex justify-between py-6 border-b-2'
              onClick={logout}
            >
              <p>로그아웃 </p>
              <button>
                <p>
                  <IoIosArrowForward />
                </p>
              </button>
            </div>
            <div
              className='flex justify-between py-6 border-b-2'
              onClick={openModal}
            >
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
