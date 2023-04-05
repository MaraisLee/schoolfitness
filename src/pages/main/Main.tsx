import instance from 'api/axios';
import { useState, useEffect } from 'react';
import { userAtom, userDetailAtom, userWeightAtom } from 'recoil/user';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import ModalLayout from 'components/common/ModalLayout';
import WeightChart from 'components/main/WeightChart';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';
import { set, useForm } from 'react-hook-form';
import BMIChart from 'components/main/BMIChart';
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
  position: relative;
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
  button {
    position: absolute;

    right: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background: #ddd;
    border-radius: 50%;
    color: white;
    font-weight: bold;
    svg {
      font-size: 40px;
    }
  }
`;

interface IWeight {
  mwSeq: number;
  mwRegDt: string;
  mwWeight: number;
}

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();
  const [userDetail, setUserDetail] = useRecoilState(userDetailAtom);
  const [userWeight, setUserWeight] = useRecoilState(userWeightAtom);
  // const [imageURL, setImageURL] = useState('');
  const userInfo = useRecoilValue(userAtom);
  const { state } = useLocation();
  const { register, handleSubmit } = useForm();

  // modal
  const [modalVisible, setModalVisible] = useState(true);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  // 몸무게 입력 modal
  const [editModalVisible, setEditModalVisible] = useState(false);

  const openEditModal = () => setEditModalVisible(true);

  const closeEditModal = () => setEditModalVisible(false);

  // 몸무게 get
  const [weight, setWeight] = useState<IWeight[]>([]);

  const weightData = async () => {
    await instance
      .get(`member/weight/{seq}?seq=${userInfo.miSeq}`)
      .then(res => {
        setWeight(res.data.list);

        setUserWeight(res.data.list.map(item => item.mwWeight));
      });
  };
  const fetchData = async () => {
    try {
      const result = await instance.get(`member/${userInfo.miSeq}`);

      setUser(result.data.info);

      setUserDetail(result.data.info);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async formData => {
    const data = {
      weight: Number(formData.weight),
    };
    try {
      await instance.put(
        `member/weight/{seq}?seq=${userInfo.miSeq}&weight=${formData.weight}`,
        data,
      );
      setUserDetail({
        ...userDetail,
        weight: formData.weight,
      });
      closeEditModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    weightData();
  }, [editModalVisible]);

  return (
    <>
      {' '}
      {editModalVisible && (
        <ModalLayout visible={editModalVisible}>
          <ModalFrame>
            <ModalTitle>
              몸무게
              <br /> 저희만 알고 있을게요
            </ModalTitle>
            <ModalDescription>
              체형별 맞춤 서비스를 위해 필요하며
              <br /> 다른 사람에게 공개되지 않습니다.
            </ModalDescription>
            <ModalEditForm onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor='weight'>몸무게</label>
              <div>
                <input {...register('weight')} type='text' id='weight' />
                kg
              </div>{' '}
              <button type='submit'>
                <MdNavigateNext />
              </button>
            </ModalEditForm>
          </ModalFrame>
        </ModalLayout>
      )}
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
        <div
          className='text-center mt-10 bg-[#484D55] px-5 py-4 rounded-lg text-white flex items-center gap-2 cursor-pointer'
          onClick={() => navigate('/notice')}
        >
          <HiOutlineSpeakerphone className='text-2xl' />
          지금 게임 공지사항을 확인해보세요!
        </div>
        <div className='flex justify-between items-center my-10 mx-4'>
          <div>
            <p className='text-[#7C7676]'>{user?.classnum}</p>
            <p className='text-[25px] font-bold'>{user?.nickname}</p>
          </div>
          <div className='border rounded-full w-[100px] h-[100px] overflow-hidden'>
            <img
              src={`http://192.168.0.79:8888/api/member/img/${user?.mimg}`}
              className='w-full h-full object-cover'
            />
          </div>
        </div>
        {user?.tall && user?.weight ? (
          <div className='p-[30px] rounded-md shadow'>
            <div className='flex justify-between text-justify '>
              <p className='text-[17px] font-bold text-[#474242] flex gap-5 items-center'>
                MY BODY
                <button
                  className='bg-[#ff8339] text-white text-sm px-2 py-1 rounded-md font-thin'
                  onClick={openEditModal}
                >
                  입력
                </button>
              </p>

              <div className='text-[#B5B5B5] text-[10px] text-center'>
                <p>마지막 측정일</p>
                <p>
                  {weight.length
                    ? weight[weight.length - 1]?.mwRegDt
                    : '입력해주세요.'}
                </p>
              </div>
            </div>
            <div className='flex justify-between mt-[20px]'>
              <p className='text-[#FF8339] text-[20px] font-bold'>
                {user?.tall}
                <b className='text-[#5B5B5B] text-[15px] ml-[5px]'>cm</b>
              </p>
              <p className='text-[#FF8339] text-[20px] font-bold'>
                {userWeight[userWeight.length - 1] || user?.weight}
                <b className='text-[#5B5B5B] text-[15px] ml-[5px]'>kg</b>
              </p>
              <p className='text-[#FF8339] text-[20px] font-bold'>
                {getBMI(
                  user?.tall,
                  Number(userWeight[userWeight.length - 1] | user.weight),
                )}
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
          <WeightChart editModalVisible={editModalVisible} />
          <BMIChart editModalVisible={editModalVisible} />
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
