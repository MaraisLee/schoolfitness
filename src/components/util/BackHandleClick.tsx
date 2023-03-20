import { useNavigate } from 'react-router-dom';
import arrow from 'assets/arrow.png';
const BackHandleClick = () => {
  const navigate = useNavigate();

  const backHandleClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <button onClick={backHandleClick}>
        <img src={arrow} alt='' />
      </button>
    </div>
  );
};
export default BackHandleClick;
