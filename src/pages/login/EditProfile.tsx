import { InnerCss } from 'styles/LayoutCss';
import { MdArrowBackIos } from 'react-icons/md';
import styled from '@emotion/styled';
import logo from 'assets/logo.png';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { userAtom, userDetailAtom, userPwAtom } from 'recoil/user';
import axios from 'axios';
import instance from 'api/axios';
import { useEffect, useState } from 'react';
import ModalLayout from 'components/common/ModalLayout';
import { useNavigate } from 'react-router-dom';
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px 20px;
  color: #6c6c6c;
  font-weight: bold;
  border-bottom: 1px solid #e8e8e8;
  svg {
    cursor: pointer;
  }
  svg:hover {
    color: #ff8339;
  }
  p {
    cursor: pointer;
  }
  p:hover {
    color: #ff8339;
  }
`;
const ContentWrapper = styled.section`
  margin: 60px 40px;
  font-weight: bold;
`;
const ProfileLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 100px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #e2e2e2;
    object-fit: cover;
  }
  h3 {
    font-size: 18px;
  }
  p {
    color: #6c6c6c;
  }
`;
const FormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
  color: #6c6c6c;
  input {
    outline: none;
    border: 1px solid #9c9c9c;
    padding: 4px 10px;
    border-radius: 4px;
  }
  input:focus {
    border: 1px solid #ff8339;
    color: #ff8339;
  }

  div {
    position: relative;
    display: flex;
    align-items: center;
    &:focus-within label {
      color: #ff8339;
    }
  }
`;
const Label = styled.label`
  width: 120px;
  color: #262626;
`;

const Error = styled.span`
  position: absolute;
  top: 40px;
  left: 120px;
  text-align: center;
  font-size: 12px;
  color: red;
`;

const ModalFrame = styled.div`
  position: relative;
  padding: 50px 60px;
  text-align: center;
`;

const ModalContent = styled.h2`
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  color: #8d8d8d;
  margin-bottom: 10px;
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

interface ISignUp {
  id: string;
  pw: string;
  pwCheck: string;
  nickname: string;
}

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

const EditProfile = () => {
  const [user, setUser] = useState<IUser>();
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [userDetail, setUserDetail] = useRecoilState(userDetailAtom);
  const [userPw, setUserPw] = useRecoilState(userPwAtom);
  const [alarm, setAlarm] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignUp>({
    defaultValues: {
      id: userDetail.id,
      nickname: userDetail.nickname,
      pw: userPw.pw,
      pwCheck: userPw.pw,
    },
  });

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    navigate('/userinfo');
  };

  const updateMemberData = async (seq, nickname, password, passwordCheck) => {
    const nickbody = {
      nickname: nickname,
    };

    const pwbody = {
      pwd: password,
      confirmpwd: passwordCheck,
    };

    if (userDetail.nickname !== nickname) {
      try {
        const [nicknameResponse, pwdResponse] = await axios.all([
          instance.patch(`member/nickname/${seq}`, nickbody),
          instance.patch(`member/pwd/${seq}`, pwbody),
        ]);

        // 각각의 API 요청에 대한 응답 데이터
        const updatedNickname = nicknameResponse.data;
        const updatedPwd = pwdResponse.data;

        if (!updatedNickname.status) {
          setError('nickname', { message: updatedNickname.message });
        } else if (updatedNickname.status && updatedPwd.status) {
          setUserDetail({
            ...userDetail, // 기존 userDetail 상태 복사
            nickname, // 변경된 nickname으로 업데이트
          });
          setUserPw({
            ...userPw,
            pw: password,
          });
          openModal();
        }

        // TODO: 데이터 처리 로직 추가
      } catch (error) {
        console.error(error);
      }
    } else {
      const pwdResponse = await instance.patch(`member/pwd/${seq}`, pwbody);
      const updatedPwd = pwdResponse.data;
      setUserPw({
        ...userPw,
        pw: password,
      });
      openModal();
    }
  };

  const onSubmit = data => {
    console.log(data);
    if (data.pw !== data.pwCheck) {
      setError(
        'pwCheck',
        { message: '비밀번호가 일치하지 않습니다.' },
        { shouldFocus: true },
      );
      return;
    }
    updateMemberData(userInfo.miSeq, data.nickname, data.pw, data.pwCheck);
  };

  // 이미지 업로드

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
      setAlarm(!alarm);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageClick = () => {
    const input = document.getElementById('file-input');
    input?.click();
  };

  const fetchData = async () => {
    try {
      const result = await instance.get(`member/${userInfo.miSeq}`);
      setUser(result.data.info);
      setUserDetail({
        ...userDetail,
        classnum: result.data.info.classnum,
        gen: result.data.info.gen,
        id: result.data.info.id,
        mimg: result.data.info.mimg,
        nickname: result.data.info.nickname,
        tall: result.data.info.tall,
        type: result.data.info.type,
        weight: userDetail.weight,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [alarm]);

  console.log(user);

  return (
    <>
      {modalVisible && (
        <ModalLayout visible={modalVisible}>
          <ModalFrame>
            <ModalContent>회원정보가 수정되었습니다.</ModalContent>
            <ModalButton onClick={closeModal}>확인</ModalButton>
          </ModalFrame>
        </ModalLayout>
      )}
      <InnerCss>
        <Header>
          <div className='flex items-center gap-2.5'>
            <MdArrowBackIos
              className='text-xl'
              onClick={() => navigate('/userinfo')}
            />
            <h1>내 정보 수정</h1>
          </div>
          <p onClick={handleSubmit(onSubmit)}>저장</p>
        </Header>
        <ContentWrapper>
          <ProfileLayout>
            <input
              type='file'
              multiple={true}
              id='file-input'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <img
              src={`http://192.168.0.79:8888/api/member/img/${user?.mimg}`}
              alt='프로필'
              onClick={handleImageClick}
            />
            <div>
              <h3>{userDetail.nickname}</h3>
              <p>3학년 {userDetail.classnum}</p>
            </div>
          </ProfileLayout>
          <FormLayout>
            <div>
              <Label htmlFor='id'>아이디</Label>
              <input {...register('id')} type='text' id='id' readOnly />
            </div>
            <div>
              <Label htmlFor='nickname'>닉네임</Label>
              <input {...register('nickname')} type='text' id='nickname' />
              <Error>{errors.nickname?.message}</Error>
            </div>
            <div>
              <Label htmlFor='pw'>비밀번호</Label>
              <input {...register('pw')} type='password' id='pw' />
            </div>
            <div>
              <Label htmlFor='pwCheck'>비밀번호확인</Label>
              <input {...register('pwCheck')} type='password' id='pwCheck' />
              <Error>{errors.pwCheck?.message}</Error>
            </div>
          </FormLayout>
        </ContentWrapper>
      </InnerCss>
    </>
  );
};
export default EditProfile;
