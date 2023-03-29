import styled from '@emotion/styled';
// 아이폰 14pro 기준
export const Wrapper = styled.div`
  width: 393px;
  height: 852px;
  margin: 0 auto;
  border-radius: 50px;
  position: relative;
  background-color: #fff;
`;
export const InnerCss = styled.div`
  margin: 20px 0;
`;
export const HeaderCss = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  img {
    margin-right: 20px;
    cursor: pointer;
  }
  h1 {
    justify-items: center;
    font-weight: 600;
    font-size: 18px;
  }
`;
export const NavCss = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  box-shadow: 0px 0px 10px 0px #c9c9c9;
  align-items: center;
  background: #fff;
  border-radius: 0 0 50px 50px;
`;
// Sign Up
export const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 17px;
  width: 300px;
  border-bottom: 1px solid #c7c7c7;
  padding-bottom: 12px;
  margin-bottom: 37px;
  color: #8d8d8d;
  input[type='text'],
  input[type='password'],
  input[type='email'] {
    width: 100%;
    font-size: 18px;
    border: none;
    outline: none;
  }
  &:focus-within {
    border-bottom: 1px solid #ff8339;
    color: #ff8339;
    input::placeholder {
      color: #ff8339;
    }
  }
`;
export const Button = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 90px;
  font-size: 17px;
  font-weight: bold;
  color: white;
  background-color: #ff8339;
  border: none;
  margin-bottom: 70px;
`;
