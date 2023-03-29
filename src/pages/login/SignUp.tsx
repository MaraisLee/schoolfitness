import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, InputWrap } from 'styles/LayoutCss';
import { FaLock, FaUser, FaStickyNote } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import instance from 'api/axios';
import ModalLayout from 'components/common/ModalLayout';

const SignUpCss = styled.section`
  margin: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    color: #8d8d8d;
    margin-bottom: 90px;
  }
  form > button {
    margin-top: 150px;
  }
`;

const Error = styled.span`
  position: absolute;
  top: 120%;
  text-align: center;
  font-size: 12px;
  color: red;
`;

const ModalFrame = styled.div`
  position: relative;
  padding: 40px 60px;
`;

const ModalContent = styled.h2`
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  color: #8d8d8d;
`;

interface ISignUp {
  id: string;
  pw: string;
  pwCheck: string;
  nickName: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUp>();

  const onSubmit = async (data: ISignUp) => {
    const body = {
      id: data.id,
      pwd: data.pw,
      confirmpwd: data.pwCheck,
      nickname: data.nickName,
    };
    if (data.pw !== data.pwCheck) {
      setError(
        'pwCheck',
        { message: '비밀번호가 일치하지 않습니다.' },
        { shouldFocus: true },
      );
    }
    console.log(data);
    try {
      await instance.put('member/join', body).then(res => {
        if (res.data.status) {
          openModal();
          fadeOutModal();
        } else {
          console.log(res.data.message);
          if (res.data.message === '이미 존재하는 ID 입니다.') {
            setError(
              'id',
              { message: res.data.message },
              { shouldFocus: true },
            );
          } else if (res.data.message === '이미 존재하는 닉네임 입니다.') {
            setError(
              'nickName',
              { message: res.data.message },
              { shouldFocus: true },
            );
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const [modalVisible, setModalVisible] = useState(true);
  const openModal = () => {
    setModalVisible(true);
  };

  // e: React.MouseEvent<HTMLElement>

  const closeModal = () => {
    setModalVisible(false);
  };

  const fadeOutModal = () => {
    setTimeout(() => {
      closeModal();
      navigate('/login');
    }, 2000);
  };

  return (
    <SignUpCss>
      <h3>회원가입</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrap>
          <FaUser />
          <input
            {...register('id', {
              required: 'ID를 입력해주세요.',
            })}
            type='text'
            placeholder='아이디를 입력해주세요.'
          />
          <Error>{errors?.id?.message}</Error>
        </InputWrap>
        <InputWrap>
          <FaStickyNote />
          <input
            {...register('nickName', { required: '닉네임을 입력해주세요.' })}
            type='text'
            placeholder='닉네임을 입력해주세요.'
          />{' '}
          <Error>{errors?.nickName?.message}</Error>
        </InputWrap>
        <InputWrap>
          <FaLock />
          <input
            {...register('pw', {
              required: '비밀번호를 입력해 주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 8자리 이상이여야 합니다.',
              },
            })}
            type='password'
            placeholder='비밀번호는 최소 8자리 이상'
          />
          <Error>{errors?.pw?.message}</Error>
        </InputWrap>
        <InputWrap>
          <FaLock />
          <input
            {...register('pwCheck', {
              required: '비밀번호를 다시 한번 입력해 주세요.',
            })}
            type='password'
            placeholder='비밀번호를 다시 한번 입력'
          />
          <Error>{errors?.pwCheck?.message}</Error>
        </InputWrap>
        <Button>회원가입하기</Button>
      </form>
      {modalVisible && (
        <ModalLayout visible={modalVisible} onClose={closeModal}>
          <ModalFrame>
            <ModalContent>회원가입이 완료되었습니다.</ModalContent>
          </ModalFrame>
        </ModalLayout>
      )}
    </SignUpCss>
  );
}
