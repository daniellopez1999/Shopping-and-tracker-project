import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../utils/fetch';

const Orders = () => {
  const user_id = Cookies.get('user_id');
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState<string>();

  useEffect(() => {
    if (!user_id) {
      window.alert('Please, log in before going to Orders page');
      navigate('/');
      return;
    }
    const fetchUserRole = async () => {
      const role = await getUserRole(user_id);
      return role.message;
    };

    const checkUserRole = async () => {
      const role = await fetchUserRole();
      if (role === 'Client') {
        setUserRole(role);
        return <div>{userRole}</div>;
      }

      if (role === 'Courier') {
        setUserRole(role);
        return <div>{userRole}</div>;
      }
    };

    checkUserRole();
  }, []);

  return <div>orders {userRole}</div>;
};

export default Orders;
