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
  margin: 20px;
`;

export const HeaderCss = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  img {
    margin-right: 20px;
    cursor: pointer;
  }
  h1 {
    font-weight: 600;
    font-size: 20px;
  }
`;

export const NavCss = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-size: 30px;
  background: black;
  border-radius: 0 0 50px 50px;
  > li {
    color: #fff;
    cursor: pointer;
    width: calc(100% / 4);
    position: relative;
    img {
    }
  }
`;
