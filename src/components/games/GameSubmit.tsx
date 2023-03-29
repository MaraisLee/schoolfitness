import { InputNumber, Space } from 'antd';
import axios from 'api/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderCss, InnerCss } from 'styles/LayoutCss';

type FileType = {
  url: string;
  video: boolean;
};
const GameSubmit = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState<FileType>({ url: '', video: false });
  const [uploadVideo, setUploadVideo] = useState('');
  // 영상 미리보기
  const imageUpload = (e: any) => {
    setUploadVideo(e.target.files[0]);
    const videoTpye = e.target.files[0].type.includes('video');
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      video: videoTpye,
    });
  };

  const [recordTime, setRecordTime] = useState('');
  const timeHandler = (e: any) => {
    const time = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,2})(\d{0,2})(\d{0,2})$/g, '$1:$2:$3')
      .replace(/(-{1,2})$/g, '');
    setRecordTime(time);
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    if (!recordTime) {
      alert('게임기록을 입력해주세요.');
      return;
    } else if (!uploadVideo) {
      alert('게임 영상을 첨부해주세요.');
      return;
    }
    // 게임 기록 제출
    const body = {
      score: recordTime,
      miSeq: 1,
      etSeq: 1,
    };
    await axios
      .put('game/score/insert/score', body)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));

    // 영상제출
    const formData = new FormData();
    formData.append('video', uploadVideo);
    // 추후 회원번호 담아서쓰기
    formData.append('miSeq', '1');
    await axios
      .put('game/score/insert/video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res);
        alert('게임 영상제출이 완료되었습니다.');
      })
      .catch(err => console.log('비디오 에러', err));
    navigate('/game');
  };

  return (
    <InnerCss>
      <HeaderCss>
        <h1>Game Zone</h1>
      </HeaderCss>

      <form
        className='h-full w-full flex flex-col justify-center items-center text-center gap-4'
        onSubmit={onSubmitHandler}
      >
        <div className='text-[14px] w-full h-full'>
          <span
            className='absolute left-8 text-lg cursor-pointer'
            onClick={() => navigate(-1)}
          >
            &#10006;
          </span>
          운동 영상 첨부
        </div>
        <div className='h-[70px] w-full bg-[#D9D9D9] border-2 border-gray-300 flex justify-center items-center'>
          <div className='w-[150px] h-[40px] bg-[#E9E9E9] m-auto text-[12px] text-[#9E9898] flex'>
            <label
              htmlFor='ex_file'
              className='w-full h-full pt-3 cursor-pointer'
            >
              동영상추가
              <input
                type='file'
                id='ex_file'
                className='hidden'
                onChange={imageUpload}
              />
            </label>
          </div>
        </div>
        <div className='absolute top-64 w-[310px] h-[160px] mt-12 border border-black fill'></div>
        {/* controls :  재생, 소리버튼 생성 */}
        <div className='mt-5 pt-3 bg-white w-[315px] h-[210px] '>
          {file.video && <video src={file.url} controls width='315px' />}
        </div>
        <label
          htmlFor='helper-text'
          className='block mb-2 font-medium text-gray-900 dark:text-white mt-10'
        >
          게임 기록 입력
        </label>
        <input
          type='text'
          id='helper-text'
          value={recordTime}
          maxLength={8}
          aria-describedby='helper-text-explanation'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center'
          placeholder='00:00:00'
          onChange={timeHandler}
        />
        <div className='mt-20 h-[74px] w-full bg-[#D9D9D9] border-2 border-gray-300 flex justify-center items-center gap-4'>
          <button
            // type='reset'
            className='w-[150px] h-[40px] text-[14px] bg-[#E9E9E9] rounded-sm pt-3'
          >
            취소
          </button>
          <button className='w-[150px] h-[40px] text-white text-[14px] bg-[#ff8339] rounded-sm pt-3'>
            첨부완료
          </button>
        </div>
      </form>
    </InnerCss>
  );
};

export default GameSubmit;
