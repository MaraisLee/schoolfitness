import { Navigate, Outlet } from 'react-router-dom';
import { userAtom } from 'recoil/user';
import { useRecoilValue } from 'recoil';

const PrivateRoute = () => {
  const user = useRecoilValue(userAtom);
  return user.miSeq ? <Outlet /> : <Navigate to='/' />;
};
export default PrivateRoute;
// {...alert('접근할 수 없는 페이지입니다.')}
