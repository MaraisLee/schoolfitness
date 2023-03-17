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
        <Divider>
          <section>
            <p>키(cm)</p>
            <InputBox>
              <input type='text' />
              <span>cm</span>
            </InputBox>
          </section>
          <section>
            <p>몸무게(kg)</p>
            <InputBox>
              <input type='text' />
              <span>kg</span>
            </InputBox>
          </section>
        </Divider>
        <section>
          <p>반</p>
          <select>
            <option value=''>1반</option>
            <option value=''>2반</option>
            <option value=''>3반</option>
            <option value=''>4반</option>
            <option value=''>5반</option>
            <option value=''>6반</option>
            <option value=''>7반</option>
            <option value=''>8반</option>
          </select>
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
    margin-bottom: 50px;
  }
  p {
    margin-bottom: 20px;
  }
  select {
    outline: none;
    padding: 0.6em 1.4em 0.5em 0.8em;
    border: 1px solid #8d8d8d;
    border-radius: 0.5em;
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
