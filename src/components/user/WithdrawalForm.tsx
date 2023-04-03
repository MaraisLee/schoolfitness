import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalLayout from '../common/ModalLayout';
import { useNavigate } from 'react-router-dom';
import instance from 'api/axios';
import { useRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';


const ModalFrame = styled.form`
  text-align: center;
  padding: 50px 0px;
  font-size: 17px;
  color: #8d8d8d;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;
const ModalContent = styled.div`
  position: relative;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 80%;
    border: 1px solid #8d8d8d;
    border-radius: 6px;
    padding: 3px 6px;
    outline: none;
    &:focus {
      border: 1px solid #ff8339;
      color: #ff8339;
    }
  }

  input::placeholder {
    font-size: 14px;
    font-weight: normal;
  }
  &:focus-within {
    input::placeholder {
      color: #ff8339;
    }
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
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

const Error = styled.span`
  position: absolute;
  top: 100%;
  left: 34px;
  text-align: center;
  font-size: 12px;
  color: red;
`;

interface IPw {
  pw: string;
  pwCheck: string;
}

interface WithdrawalFormProps {
  closeModal: () => void;
  modalVisible: boolean;
}
const WithdrawalForm = ({ closeModal, modalVisible }: WithdrawalFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IPw>();

  // 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(userAtom);

  // 진짜 회원탈퇴 할건지 확인 Modal
  const [confirmModalVisible, setConfirmMocalVisible] = useState(false);
  const openModal2 = () => setConfirmMocalVisible(true);
  const closeModal2 = () => setConfirmMocalVisible(false);

  // 회원탈퇴되었습니다.
  const [alertModalVisible, setAlertModalVisible] = useState(false);

  const onSubmit = async (passwordData: IPw) => {
    console.log(passwordData);
    if (passwordData.pwCheck.length === 0) {
      setError(
        'pwCheck',
        { message: '공백 입력 할 수 없습니다.' },
        { shouldFocus: true },
      );
      return closeModal2();
    } else if (passwordData.pw !== passwordData.pwCheck) {
      setError(
        'pwCheck',
        { message: '비밀번호가 일치하지 않습니다.' },
        { shouldFocus: true },
      );
      return closeModal2();
    }

    await instance
      .delete(`member/${userInfo.miSeq}`, {
        data: {
          pwd: passwordData.pw,
        },
      })
      .then(res => {
        console.log(res);
        setUserInfo('');
        closeModal();
        closeModal2();
        setAlertModalVisible(true);
      });
  };
  return (
    <>
      {' '}
      {modalVisible && (
        <>
          <ModalLayout visible={modalVisible} onClose={closeModal}>
            <ModalFrame>
              <ModalTitle>회원탈퇴</ModalTitle>
              <ModalContent>
                <InputBox>
                  <input
                    {...register('pw')}
                    type='password'
                    placeholder='비밀번호를 입력해주세요.'
                  />
                  <Error>{errors.pw?.message}</Error>
                </InputBox>
                <InputBox>
                  <input
                    {...register('pwCheck')}
                    type='password'
                    placeholder='비밀번호를 다시 한번 입력'
                  />
                  <Error>{errors.pwCheck?.message}</Error>
                </InputBox>
              </ModalContent>
              <ButtonBox>
                <ModalButton type='button' onClick={openModal2}>
                  확인
                </ModalButton>
                <ModalButton type='button' onClick={closeModal}>
                  취소
                </ModalButton>
              </ButtonBox>
            </ModalFrame>
          </ModalLayout>
          {confirmModalVisible && (
            <ModalLayout visible={confirmModalVisible} top={50}>
              <ModalFrame onSubmit={handleSubmit(onSubmit)}>
                <ModalContent>정말 탈퇴하시겠습니까?</ModalContent>
                <ButtonBox>
                  <ModalButton>확인</ModalButton>
                  <ModalButton
                    type='button'
                    onClick={() => {
                      closeModal();
                      closeModal2();
                    }}
                  >
                    취소
                  </ModalButton>
                </ButtonBox>
              </ModalFrame>
            </ModalLayout>
          )}
        </>
      )}
      {alertModalVisible && (
        <ModalLayout visible={alertModalVisible}>
          <ModalFrame>
            <ModalContent>회원탈퇴되었습니다.</ModalContent>
            <ModalButton type='button' onClick={() => navigate('/')}>
              확인
            </ModalButton>
          </ModalFrame>
        </ModalLayout>
      )}
    </>
  );
};

export default WithdrawalForm;
