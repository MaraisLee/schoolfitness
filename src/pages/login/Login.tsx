import { useState } from 'react';
import logo from 'assets/logo.png';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, InputWrap } from 'styles/LayoutCss';
import { useForm } from 'react-hook-form';
import instance from 'api/axios';
import ModalLayout from 'components/common/ModalLayout';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/user';
import { setCookie } from 'api/cookie';

const LoginCss = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 150px;
    height: 220px;
    margin: 80px 0;
  }
  p {
    font-size: 13px;
    color: #acacac;
    span {
      font-weight: bold;
      color: #ff8339;
      cursor: pointer;
    }
  }

  form > button {
    margin-bottom: 60px;
  }
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

interface ISignIn {
  ID: string;
  pw: string;
}

const Login = () => {
  const setUserInfo = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignIn>();

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onSubmit = async (data: ISignIn) => {
    const body = {
      id: data.ID,
      pwd: data.pw,
    };
    try {
      await instance.post('member/login', body).then(res => {
        if (!res.data.status) {
          setError('pw', { message: 'ID 또는 Password 오류입니다.' });
          openModal();
        } else {
          setCookie('access_token', res.data.token.accessToken);
          setUserInfo({
            token: res.data.token.accessToken,
            miSeq: res.data.miSeq,
          });
          // localStorage.setItem('token', res.data.token.accessToken);
          navigate('/', { state: { isModalVisible: true } });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {' '}
      {modalVisible && (
        <ModalLayout visible={modalVisible} onClose={closeModal}>
          <ModalFrame>
            <ModalContent>{errors.pw?.message}</ModalContent>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </ModalFrame>
        </ModalLayout>
      )}
      <LoginCss>
        <img src={logo} alt='logo' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWrap>
            <FaUser />
            <input {...register('ID')} type='text' placeholder='아이디' />
          </InputWrap>
          <InputWrap>
            <FaLock />
            <input {...register('pw')} type='password' placeholder='비밀번호' />
          </InputWrap>
          <Button>LOGIN</Button>
        </form>
        <p>
          아직 회원이 아니신가요?
          <span onClick={() => navigate('/signup')}> 회원가입하기</span>
        </p>
      </LoginCss>
    </>
  );
};

export default Login;
