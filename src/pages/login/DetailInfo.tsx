import styled from '@emotion/styled';
import React from 'react';
import { Button } from 'styles/LayoutCss';
export default function DetailInfo() {
  return (
    <DetailInfoCss>
      <h3>상세정보입력</h3>
      <form>
        <section>
          <p>성별</p>
          <RadioContainer>
            <InputBox>
              <input type='radio' id='man' name='gender' />
              <label htmlFor='man'>남자</label>
            </InputBox>
            <InputBox>
              <input type='radio' id='woman' name='gender' />
              <label htmlFor='woman'>여자</label>
            </InputBox>
          </RadioContainer>
        </section>
        <section>
          <p>키(cm)</p>
        </section>
        <section>
          <p>몸무게(kg)</p>
        </section>
        <section>
          <p>반</p>
        </section>
        <section>
          <p>타입</p>
          <RadioContainer>
            <InputBox>
              <input type='radio' id='diet' name='type' />
              <label htmlFor='diet'>다이어터</label>
            </InputBox>
            <InputBox>
              <input type='radio' id='waiter' name='type' />
              <label htmlFor='waiter'>웨이터</label>
            </InputBox>
          </RadioContainer>
        </section>
        <Button>LOGIN</Button>
      </form>
    </DetailInfoCss>
  );
}
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
    margin-bottom: 50px;
  }
  p {
    margin-bottom: 20px;
  }
`;
const RadioContainer = styled.div`
  display: flex;
  gap: 80px;
`;
const InputBox = styled.div`
  display: flex;
  gap: 4px;
  input[type='radio'] {
    width: 20px;
    height: 20px;
    accent-color: #fc6101;
  }
  input:checked ~ label {
    color: #ff8339;
  }
`;
