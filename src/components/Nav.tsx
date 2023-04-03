import { NavCss } from 'styles/LayoutCss';
import { FiMoreHorizontal } from 'react-icons/fi';
import { IoIosBicycle } from 'react-icons/io';
import { BsPersonFill } from 'react-icons/bs';
import { FaGamepad } from 'react-icons/fa';
import { ImHome3 } from 'react-icons/im';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';
const Nav = () => {
  const menuColor: string = 'text-orange-500';
  const token = useRecoilValue(userAtom).token;
  const addLink = token ? '/userinfo' : '/';
  const filterArr = [
    { title: '홈', icon: <ImHome3 />, id: 0, link: '/' },
    { title: '게임 ', icon: <FaGamepad />, id: 1, link: '/game' },
    { title: '헬스리포트 ', icon: <IoIosBicycle />, id: 2, link: '/detail' },
    { title: '운동영상 ', icon: <BsPersonFill />, id: 3, link: '/weight' },
    { title: '더보기 ', icon: <FiMoreHorizontal />, id: 4, link: addLink },
  ];
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      {/* 맞는 이모티콘이나 이미지 넣기  */}
      <NavCss>
        <div className='flex justify-around text-center mt-3 mx-2'>
          {filterArr.map((item, i) => (
            <li key={i}>
              <Link
                to={`${item.link}`}
                className='flex flex-col justify-center items-center text-center'
              >
                <span
                  className={`text-2xl ${
                    item.link === pathname && 'text-orange-500'
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  className={` text-xs ${
                    item.link === pathname && 'text-orange-500'
                  } `}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </div>
      </NavCss>
    </>
  );
};
export default Nav;