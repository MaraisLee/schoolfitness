import React from 'react';
import { InnerCss } from 'styles/LayoutCss';
import { MdArrowBackIos } from 'react-icons/md';
import styled from '@emotion/styled';
import logo from 'assets/logo.png';
import { useForm } from 'react-hook-form';

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
    color: orange;
  }
  p {
    cursor: pointer;
  }
  p:hover {
    color: orange;
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
  margin: 0px 10px;
  color: #6c6c6c;

  input {
    outline: none;
  }

  input[type='radio'] {
    width: 20px;
    height: 20px;
    accent-color: #fc6101;
  }
`;

const Label = styled.label`
  display: inline-block;
  width: 120px;
  color: #262626;
`;

const RadioButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const RadioButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const EditProfile = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <InnerCss>
      <Header>
        <div className='flex items-center gap-2.5'>
          <MdArrowBackIos className='text-xl' />
          <h1>내 정보 수정</h1>
        </div>
        <p onClick={handleSubmit(onSubmit)}>저장</p>
      </Header>
      <ContentWrapper>
        <ProfileLayout>
          <img src={logo} alt='프로필' />
          <div>
            <h3>허강현</h3>
            <p>3학년 7반</p>
          </div>
        </ProfileLayout>
        <FormLayout>
          <div>
            <Label htmlFor='nickname'>닉네임</Label>
            <input {...register('nickname')} type='text' id='nickname' />
          </div>
          <div>
            <Label htmlFor='id'>아이디</Label>
            <input {...register('id')} type='text' id='id' />
          </div>
          <div>
            <Label htmlFor='pw'>비밀번호</Label>
            <input {...register('pw')} type='password' id='pw' />
          </div>
          <div>
            <Label htmlFor='pwCheck'>비밀번호확인</Label>
            <input {...register('pwCheck')} type='password' id='pwCheck' />
          </div>
          <RadioButtonGroup>
            <Label>타입</Label>
            <div>
              <RadioButton>
                <input
                  {...register('esSeq')}
                  type='radio'
                  value='1'
                  id='diet'
                />
                <label htmlFor='diet'>다이어터</label>
              </RadioButton>
              <RadioButton>
                <input
                  {...register('esSeq')}
                  type='radio'
                  value='2'
                  id='waiter'
                />
                <label htmlFor='waiter'>웨이터</label>
              </RadioButton>
            </div>
          </RadioButtonGroup>
        </FormLayout>
      </ContentWrapper>
    </InnerCss>
  );
};

export default EditProfile;
