import React, { useEffect, useState } from 'react';
import { GameBt } from 'styles/Button';
import { HeaderCss, InnerCss } from 'styles/LayoutCss';
import arrow from 'assets/arrow.png';
import { useNavigate } from 'react-router-dom';
import axios from 'api/axios';
import BackHandleClick from 'components/util/BackHandleClick';
import { log } from 'console';

type NoticeType = {
  etSeq: number;
  gnContent: string;
  gnRegDt: string;
  gnSeq: number;
  gnTitle: string;
  url: string;
};

const Notice = () => {
  const navigate = useNavigate();
  const gameStartHandler = () => {
    navigate('/gamesubmit');
  };
  const initdata = {
    etSeq: 0,
    gnContent: '',
    gnRegDt: '',
    gnSeq: 0,
    gnTitle: '',
    url: '',
  };
  const [notice, setNotice] = useState<NoticeType>(initdata);
  const getNoticeData = async () => {
    await axios
      .get('notice/detail/47')
      .then(async res => {
        console.log(res.data);
        setNotice(res.data);
        console.log(res.data.url);

        // 영상 호출
        await axios
          .get('download/video/notice/' + res.data.url)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => console.log('percent err', err));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getNoticeData();
  }, []);

  return (
    <InnerCss>
      <HeaderCss>
        <BackHandleClick />
        <h1>공지사항 </h1>
        <GameBt onClick={gameStartHandler}>START</GameBt>
      </HeaderCss>
      <hr />
      <div className='px-10'>
        <div className='text-[17px] font-bold pt-6 pb-6'>{notice.gnTitle}</div>
        <span className='text-[12px] text-[#A1A1A1]  '>{notice.gnRegDt}</span>
        <hr className='my-5' />
        <div className='text-[13px] leading-6'>
          안녕하세요~
          <br />
          &#10094; School Fitness 쿨피스 게임 공지 &#10095;
          <br />
          👉 이번 주 미션 나갑니다~
          <br />
          🏃‍♂️ {notice.gnContent}
          <br />
          <br />
          🔸 이번 주 게임을 완료하신 분들은
          <br />1 &#41; <b className='bg-orange-300 p-0.5'>where?</b> 오른쪽
          상단 START 버튼을 눌러주세요 <br /> 2 &#41;{' '}
          <b className='bg-orange-300 p-0.5'>what?</b> 게임을 수행한 영상과
          기록을 올려주세요 <br /> 3 &#41;{' '}
          <b className='bg-orange-300 p-0.5'>when?</b> 다음주 미션이 공지되기
          전까지
          <br />
          <br />
          쿨피스 여러분들! <br />
          미션에 참가하고 스탬프 찍으세요✨🎉
          <p className='text-[10px] text-[#5f5e5e] pt-2 leading-4'>
            순위 1, 2, 3 등 스탬프 기회 5번 | 상위 10% 스탬프 기회 3번 | 상위
            11~30% 스탬프 기회 2번 | 나머지 1번 | 자격 미달 0번
            <br />
            <span className='text-[#777777]'>
              * 이번 주 내 게임 참여자에 한함
            </span>
          </p>
        </div>
        {/* 게임예시 영상 */}
      </div>
    </InnerCss>
  );
};

export default Notice;
