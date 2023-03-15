import { Link } from 'react-router-dom';
import { HeaderCss, InnerCss } from 'styles/LayoutCss';

export type ScoreType = {
  id: number;
  status: boolean;
  message: string;
  name: string;
  classNo: number;
  grade: number;
  score: string;
  image: string;
};

const Game = () => {
  const initData: ScoreType[] = [
    {
      id: 2,
      status: true,
      message: '저번주 회원의 게임 성적입니다',
      name: '허넨',
      classNo: 9,
      grade: 2,
      score: '00:11:00',
      image: '',
    },
    {
      id: 1,
      status: true,
      message: '저번주 회원의 게임 성적입니다',
      name: '허산현',
      classNo: 5,
      grade: 1,
      score: '00:09:00',
      image: '',
    },

    {
      id: 3,
      status: true,
      message: '저번주 회원의 게임 성적입니다',
      name: '허자크',
      classNo: 1,
      grade: 3,
      score: '00:13:00',
      image: '',
    },
  ];
  // const { id, status, name, classNo, grade, score, image } = initData;
  return (
    <InnerCss>
      <HeaderCss>
        {/* 나중에 링크 걸면됨 */}
        <img src='images/arrow.png' alt='' />
        <h1>이전페이지</h1>
      </HeaderCss>

      <div className='text-center mb-8 p-5 text-[20px] font-bold border-b border-b-slate-200'>
        전체 순위
      </div>
      <div className='flex justify-center gap-3'>
        {initData.map((member: ScoreType) => (
          <div key={member.id}>
            <div className='flex flex-col justify-center items-center gap-4'>
              <span className=''>{member.grade}</span>
              <div className='w-20 h-20 border border-black rounded-full overflow-hidden'>
                <img src='images/logo.png' alt='' className='w-full h-full ' />
              </div>
              <div className='flex flex-col items-center'>
                <span className='font-bold text-xl'>{member.name}</span>
                <span className='text-zinc-400 text-[10px]'>
                  {member.classNo}반
                </span>
              </div>
              <div className='border rounded-xl bg-slate-700 text-[10px] p-2 text-gray-200'>
                {member.score}초
              </div>
            </div>
          </div>
        ))}
      </div>
    </InnerCss>
  );
};

export default Game;
