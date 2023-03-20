import crown from 'assets/crown.png';
import icon from 'assets/icon.png';
import medal from 'assets/medal.png';
import { useNavigate } from 'react-router-dom';
import { orangeColor } from 'utils/colors';
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

const Grade = () => {
  
  const initData: ScoreType[] = [
    {
      id: 2,
      status: true,
      message: '저번주 회원의 게임 성적입니다',
      name: '허넨',
      classNo: 9,
      grade: 2,
      score: '01:11:53',
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
  const navigate = useNavigate();
  const stampHandler = () => {
    navigate('/stampgif');
  };
  return (
    <>
      <div className='flex flex-col justify-center items-center w-full '>
        {/* 전체성적 */}
        <div className='flex justify-center gap-6 pb-6'>
          {initData.map((member: ScoreType) => (
            <div key={member.id}>
              <div className='flex flex-col justify-center items-center gap-4'>
                {member.grade === 1 ? (
                  <div className='flex flex-col justify-center items-center'>
                    <img src={crown} alt='' className='w-[27px] h-[22px] ' />
                    <div className='w-[70px] h-[70px] border rounded-full overflow-hidden'>
                      <img src={icon} alt='' className='w-full h-full ' />
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col justify-center items-center'>
                    <span className='text-[14px] font-semibold'>
                      {member.grade}
                    </span>
                    <div className='w-[50px] h-[50px] border rounded-full overflow-hidden'>
                      <img src={icon} alt='' className='w-full h-full ' />
                    </div>
                  </div>
                )}
                <div className='flex flex-col items-center'>
                  <span className='font-bold text-[17px]'>{member.name}</span>
                  <span className='text-zinc-400 text-[10px]'>
                    {member.classNo}반
                  </span>
                </div>
                <div className='border rounded-xl bg-slate-700 text-[10px] py-1 px-2 text-gray-200'>
                  {member.score}초
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 내성적 */}
        <div className='bg-[#fcfafadc] w-full px-10 py-5'>
          <span className='pl-3 text-[14px] flex font-semibold'>
            <img src={medal} alt='' className='w-[16px] h-[14px] mr-1 ' /> 내
            성적
          </span>
          <div className='flex justify-around items-center w-[313px] h-[70px] border shadow-lg rounded-full mt-3 text-zinc-400 text-[14px] pr-2'>
            <img src={icon} alt='' className=' w-[43px] h-[41px]' />
            <div className='flex flex-col text-[8px] items-center pr-5'>
              <b className='text-black text-[16px]'>꿀잼</b>
              <span>3반</span>
            </div>
            <span>
              <b className='text-black text-[18px]'>17</b>등
            </span>
            <span>
              <b className='text-black text-[18px]'>00:10:00</b>초
            </span>
          </div>
          <div className='flex flex-col justify-center items-center mt-5 text-center'>
            <span className='text-[15px] font-bold'>
              <b className={`text-[${orangeColor}] text-[19px]`}>꿀잼</b>님은
              <br />
              상위 3% 입니다.
            </span>
            <p className='text-[8px] text-[#bbb] pt-5'>
              1, 2, 3 등 스탬프 기회 5번 | 상위 10% 스탬프 기회 3번 | 상위
              11~30% 스탬프 기회 2번 | 나머지 1번 | 자격 미달 0번
              <br />
              <span className='text-[#777777]'>
                * 일주일 내 게임 참여자에 한함
              </span>
            </p>
          </div>
        </div>
        {/* 스탬프 bt */}
        <div className='flex flex-col justify-center items-center text-[#5C5C5C] pt-5'>
          <span className='text-[15px]'>스탬프 3번의 기회가 있어요!</span>
          <span className='text-[20px] font-bold'>
            지금 스탬프 찍으러 가기!
          </span>
          <button
            className='w-[68px] h-[36px] font-extrabold text-white text-[20px] bg-[#ff8339] rounded-lg mt-3'
            onClick={stampHandler}
          >
            GO
          </button>
        </div>
      </div>
    </>
  );
};

export default Grade;
