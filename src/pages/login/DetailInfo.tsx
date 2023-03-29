import styled from '@emotion/styled';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'styles/LayoutCss';

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

interface IEditType {
  giSeq: number;
  esSeq: number;
  tall: number;
  weight: number;
  classNum: string;
}
export default function DetailInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IEditType>();

  const onSubmit = (data: IEditType) => {
    console.log(data);
    console.log(Number(data.giSeq));
    console.log(Number(data.tall));
    console.log(Number(data.weight));
    console.log(Number(data.esSeq));
  };

  return (
    <DetailInfoCss>
      <h3>상세정보입력</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <p>성별</p>
          <RadioContainer>
            <InputBox>
              <input {...register('giSeq')} type='radio' id='man' value='0' />
              <label htmlFor='man'>남자</label>
            </InputBox>
            <InputBox>
              <input {...register('giSeq')} type='radio' id='woman' value='1' />
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
              <input {...register('esSeq')} type='radio' value='0' id='diet' />
              <label htmlFor='diet'>다이어터</label>
            </InputBox>
            <InputBox>
              <input
                {...register('esSeq')}
                type='radio'
                value='1'
                id='waiter'
              />
              <label htmlFor='waiter'>웨이터</label>
            </InputBox>
          </RadioContainer>
        </section>
        <Button>LOGIN</Button>
      </form>
    </DetailInfoCss>
  );
}
