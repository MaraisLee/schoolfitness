import styled from '@emotion/styled';

export const TimerCss = styled.div`
  margin-top: 60px;
  display: flex;
  margin-top: 40px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 78px;
    height: 38px;
    background-color: #85159b;
    color: white;
    margin: 5px 20px;
    border-radius: 10px;
  }
  button:hover {
    cursor: pointer;
  }

  .time {
    font-size: 30px;
  }
  .right {
    margin-left: 20px;
  }
  .unit {
    margin-left: 10px;
    font-size: 16px;
  }
  .button-wrapper {
  }
`;
