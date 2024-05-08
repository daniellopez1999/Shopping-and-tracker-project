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

  useEffect(() => {
    //if userRole === Client get orders from user_id
    // In Backend, find for on-going orders and put in a component in orders page
    // Put in another component delivered orderes
    // If no orders available, show no orders done
    //if userRole === Courier check if courier has an assigned order (create endpoint in backend)
    // if courier doesn't have assigned orders get unassigned orders
  }, [userRole]);

  return <div>orders {userRole}</div>;
};

export default Orders;
