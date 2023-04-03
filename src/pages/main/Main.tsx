import instance from 'api/axios';
import { useState, useEffect } from 'react';
import { userAtom, userDetailAtom } from 'recoil/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import ModalLayout from 'components/common/ModalLayout';
import WeightChart from 'components/main/WeightChart';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
interface IUser {
  id: string;
  tall: number | null;
  weight: number | null;
  nickname: string;
  classnum: string;
  gen: string;
  type: string;
  mimg: string;
}
const ModalFrame = styled.div`
  text-align: center;
  padding: 50px 0px;
  font-size: 17px;
`;
const ModalContent = styled.h2`
  font-weight: bold;
  text-align: center;
  color: #8d8d8d;
  margin-bottom: 10px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const ModalButton = styled.button`
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background-color: #ff8339;
  border: none;
`;
const ModalTitle = styled.h2`
  font-weight: bold;
  padding: 0 40px;
  text-align: start;
  color: #000;
  margin-bottom: 10px;
`;
const ModalDescription = styled.p`
  font-size: 12px;
  font-weight: bold;
  padding: 0 40px;
  text-align: start;
  color: #8d8d8d;
  margin-bottom: 20px;
`;
const ModalEditForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  align-items: start;
  font-weight: bold;
  gap: 12px;
  input {
    border-bottom: 1px solid #8d8d8d;
    width: 40px;
    outline: none;
  }
`;
const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();
  const setUserDetail = useSetRecoilState(userDetailAtom);
  // const [imageURL, setImageURL] = useState('');
  const userInfo = useRecoilValue(userAtom);
  const { state } = useLocation();
  const [modalVisible, setModalVisible] = useState(true);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const fetchData = async () => {
    try {
      const result = await instance.get(`member/${userInfo.miSeq}`);
      // const result2 = await instance.get(
      //   `member/weight/{seq}?seq=${userInfo.miSeq}`,
      // );
      setUser(result.data.info);
      // const imgResult = await instance.get(
      //   `download/img/member/${result.data.info.mimg}`,
      // );
      setUserDetail(result.data.info);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(user);
  console.log(userInfo.miSeq);
  return (
    <>
      {state?.isModalVisible &&
        !user?.tall &&
        !user?.weight &&
        modalVisible && (
          <ModalLayout visible={modalVisible} onClose={closeModal}>
            <ModalFrame>
              <ModalContent>
                상세정보(성별,키,몸무게,반,타입) <br /> 지정이 되어있지
                않습니다. <br /> 지금 입력하시겠습니까?
              </ModalContent>
              <ButtonBox>
                <ModalButton onClick={() => navigate('/detailinfo')}>
                  확인
                </ModalButton>
              </ButtonBox>
            </ModalFrame>
          </ModalLayout>
        )}
      <div className='px-5 overflow-y-auto scrollbar-hide h-[734px] '>
        <div className='text-center mt-10 bg-[#484D55] px-5 py-4 rounded-lg text-white flex items-center gap-2'>
          <HiOutlineSpeakerphone className='text-2xl' />
          지금 반 순위를 확인해보세요!
        </div>
        <div className='flex justify-between items-center my-10 mx-4'>
          <div>
            <p className='text-[#7C7676]'>{user?.classnum}</p>
            <p className='text-[25px] font-bold'>{user?.nickname}</p>
          </div>
          <img
            src={`http://192.168.0.79:8888/api/download/img/member/${user?.mimg}`}
            className='rounded-full w-[60px] h-[60px]'
          />
        </div>
        {user?.tall && user?.weight ? (
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
        ) : (
          <div className='p-[30px] rounded-md shadow'>
            <p className='text-[17px] font-bold text-[#474242] mb-4'>MY BODY</p>
            <p> 상세정보가 입력되지 않았습니다.</p>
          </div>
        )}
        <div className='flex flex-col gap-5 rounded-md shadow mt-3'>
          <WeightChart />
          <WeightChart />
        </div>
      </div>
    </>
  );
};
function getBMI(tall: number | undefined, weight: number | undefined) {
  if (typeof tall === 'number' && typeof weight === 'number') {
    return ((weight / (tall * tall)) * 10000).toFixed(2);
  }
}
export default Main;
