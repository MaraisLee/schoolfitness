import { NavCss } from 'styles/LayoutCss';

import { FiMoreHorizontal } from 'react-icons/fi';
import { IoIosBicycle } from 'react-icons/io';
import { BsPersonFill } from 'react-icons/bs';
import { FaGamepad } from 'react-icons/fa';
import { ImHome3 } from 'react-icons/im';
import { Link } from 'react-router-dom';

import { useState } from 'react';

const Nav = () => {
  const menuColor: string = 'text-orange-500';
  const filterArr = [
    { title: '홈', icon: <ImHome3 />, id: 0, link: 'login' },
    { title: '게임 ', icon: <FaGamepad />, id: 1, link: 'game' },
    { title: '헬스리포트 ', icon: <IoIosBicycle />, id: 2, link: 'detail' },
    { title: '운동영상 ', icon: <BsPersonFill />, id: 3, link: 'weight' },
    { title: '더보기 ', icon: <FiMoreHorizontal />, id: 4, link: 'userinfo' },
  ];
  const [filter, setFilter] = useState(filterArr[0]);
  
  return (
    <>
      {/* 맞는 이모티콘이나 이미지 넣기  */}
      <NavCss>
        <div className='flex justify-around my-6'>
        {filterArr.map((item, i) => (

          
          <li key={i}  onClick={()=>{setFilter(item)}}>
            <button >
            <Link to={`/${item.link}`}>
              <span className={`text-2xl leading-3 ${item.title === filter.title && "text-orange-500"}`}> {item.icon}</span>
              <span className={` text-xs ml-[-7px] ${item.title === filter.title && "text-orange-500"} `}>{item.title}</span>
           </Link> </button>
          </li>
        ))}</div>
      </NavCss>
    </>
  );
};

export default Nav;
