import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../provider/userContext/userContext';

export const VerifyUserPage = () => {
  const { checkIfUserHasAlreadyLogged } = useContext(UserContext);
  const [userStatus, setUserStatus] = useState(false);
  const navigate = useNavigate();

  async function main() {
    const result = await checkIfUserHasAlreadyLogged();
    setUserStatus(result);
    if (result === false) {
      navigate('/');
    }
  }
  main();
  return <>{userStatus == true ? <Outlet /> : null}</>;
};
