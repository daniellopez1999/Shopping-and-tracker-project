import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getDeliveredClientOrders,
  getUndeliveredClientOrders,
  getUserRole,
} from '../../utils/fetch';
import { Order } from '../../types/types';

const Orders = () => {
  const user_id = Cookies.get('user_id');
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState<string>();
  const [deliveredOrders, setDeliveredOrders] = useState<Order[]>();
  const [undeliveredOrders, setUndeliveredOrders] = useState<Order[]>();
  const [loadedOrders, setLoadedOrders] = useState<boolean>(false);

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
    if (userRole === 'Client') {
      const fetchDeliveredOrders = async () => {
        const deliveredOrders = await getDeliveredClientOrders(user_id!);
        return deliveredOrders;
      };

      const fetchUndeliveredOrders = async () => {
        const deliveredOrders = await getUndeliveredClientOrders(user_id!);
        return deliveredOrders;
      };

      const setOrders = async () => {
        const deliveredOrders = await fetchDeliveredOrders();
        const undeliveredOrders = await fetchUndeliveredOrders();

        setDeliveredOrders(deliveredOrders);
        setUndeliveredOrders(undeliveredOrders);
        setLoadedOrders(true);
      };

      setOrders();
    }

    if (userRole === 'Courier') {
      //if userRole === Courier check if courier has an assigned order (create endpoint in backend)
      // if courier doesn't have assigned orders get unassigned orders

      const setOrders = async () => {
        setLoadedOrders(true);
      };

      setOrders();
    }
  }, [userRole]);

  return (
    <div>
      {userRole === 'Client' && loadedOrders && (
        <div>
          Cliente
          <h1>Delivered orders:</h1>
          <div>
            {deliveredOrders!.map((order, index) => (
              <div key={index}>
                <h3>{order.createdAt.toString()}</h3>
                <h3>{order.products.toString()}</h3>
              </div>
            ))}
          </div>
          <h1>Undelivered orders:</h1>
          <div>
            {undeliveredOrders!.map((order, index) => (
              <div key={index}>
                <h3>{order.createdAt.toString()}</h3>
                <h3>{order.products.toString()}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
      {userRole === 'Courier' && <div>Courier</div>}
    </div>
  );
};

export default Orders;
