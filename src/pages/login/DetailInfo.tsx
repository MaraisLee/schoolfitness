import styled from '@emotion/styled';
import instance from 'api/axios';
import ModalLayout from 'components/common/ModalLayout';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userAtom, userDetailAtom } from 'recoil/user';
import { useRecoilState, useRecoilValue } from 'recoil';
const Divider = styled.div`
  display: flex;
  gap: 60px;
`;
const DetailInfoCss = styled.section`
  margin: 40px 60px;
  display: flex;
  flex-direction: column;
  color: #8d8d8d;
  font-weight: 600;
  h3 {
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 50px;
  }
  section {
    margin-bottom: 40px;
  }
  p {
    margin-bottom: 10px;
  }
  select {
    outline: none;
    padding: 0.6em 1.4em 0.5em 0.8em;
    border: 1px solid #8d8d8d;
    border-radius: 0.5em;
  }
  form {
    overflow: hidden;
  }
  form > button {
    margin-bottom: 20px;
  }
`;
const RadioContainer = styled.div`
  display: flex;
  gap: 60px;
`;
const InputBox = styled.div`
  display: flex;
  width: 84px;
  align-items: center;
  gap: 8px;
  input[type='radio'] {
    width: 20px;
    height: 20px;
    accent-color: #fc6101;
  }
  input[type='text'] {
    max-width: 84px;
    outline: none;
    border: 1px solid #8d8d8d;
    border-radius: 8px;
    padding: 6px 8px;
    &:focus-within {
      border: 1px solid #ff8339;
      color: #ff8339;
      input::placeholder {
        color: #ff8339;
      }
      & ~ span {
        color: #ff8339;
      }
    }
  }
  input:checked ~ label {
    color: #ff8339;
  }
`;

const SuperButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 90px;
  font-size: 17px;
  font-weight: bold;
  color: white;
  background-color: #ff8339;
  border: none;
`;
const ModalFrame = styled.div`
  text-align: center;
  padding: 30px 0px 20px;
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
interface IEditType {
  giSeq: string;
  esSeq: string;
  tall: string;
  weight: string;
  classNum: string;
}
export default function DetailInfo() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userAtom);
  const [userDetail, setUserDetail] = useRecoilState(userDetailAtom);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    navigate('/');
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IEditType>();

  const editInfo = async (data: IEditType) => {
    console.log(data);
    const body = {
      giSeq: Number(data.giSeq),
      esSeq: Number(data.esSeq),
      classNum: data.classNum,
      tall: Number(data.tall),
      weight: Number(data.weight),
    };
    try {
      const response = await instance.patch(
        `member/addinfo/${userInfo.miSeq}`,
        body,
      );
      if (response.data.status) {
        openModal();
        setUserDetail({
          ...userDetail,
          weight: data.weight,
        });
      } else {
        alert('ㄴㄴㄴㄴ');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {modalVisible && (
        <ModalLayout visible={modalVisible} onClose={closeModal}>
          {' '}
          <ModalFrame>
            <ModalContent>상세정보가 입력되었습니다.</ModalContent>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </ModalFrame>
        </ModalLayout>
      )}
      <DetailInfoCss>
        <h3>상세정보입력</h3>
        <form onSubmit={handleSubmit(editInfo)}>
          <section>
            <p>성별</p>
            <RadioContainer>
              <InputBox>
                <input {...register('giSeq')} type='radio' id='man' value='1' />
                <label htmlFor='man'>남자</label>
              </InputBox>
              <InputBox>
                <input
                  {...register('giSeq')}
                  type='radio'
                  id='woman'
                  value='2'
                />
                <label htmlFor='woman'>여자</label>
              </InputBox>
            </RadioContainer>
          </section>
          <Divider>
            <section>
              <p>키(cm)</p>
              <InputBox>
                <input {...register('tall')} type='text' />
                <span>cm</span>
              </InputBox>
            </section>
            <section>
              <p>몸무게(kg)</p>
              <InputBox>
                <input {...register('weight')} type='text' />
                <span>kg</span>
              </InputBox>
            </section>
          </Divider>
          <section>
            <p>반</p>
            <select {...register('classNum')}>
              <option value='1반'>1반</option>
              <option value='2반'>2반</option>
              <option value='3반'>3반</option>
              <option value='4반'>4반</option>
              <option value='5반'>5반</option>
              <option value='6반'>6반</option>
              <option value='7반'>7반</option>
              <option value='8반'>8반</option>
            </select>
          </section>
          <section>
            <p>타입</p>
            <RadioContainer>
              <InputBox>
                <input
                  {...register('esSeq')}
                  type='radio'
                  value='1'
                  id='diet'
                />
                <label htmlFor='diet'>다이어터</label>
              </InputBox>
              <InputBox>
                <input
                  {...register('esSeq')}
                  type='radio'
                  value='2'
                  id='waiter'
                />
                <label htmlFor='waiter'>웨이터</label>
              </InputBox>
            </RadioContainer>
          </section>
          <SuperButton>확인</SuperButton>
        </form>
      </DetailInfoCss>
    </>
  );
}
