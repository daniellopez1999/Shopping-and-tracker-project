import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  assignOrderToCourier,
  fetchCourierAssignedOrder,
  getDeliveredClientOrders,
  getUnassignedOrders,
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
  const [courierAssignedOrder, setCourierAssignedOrder] =
    useState<Order | null>(null);
  const [unassignedOrders, setUnassignedOrders] = useState<Order[]>();

  const handleAssignOrder = async (
    orderID: string,
    courierID: string,
    orderData: Order
  ) => {
    const order = await assignOrderToCourier(orderID, courierID);
    if (order.status === 200) {
      window.alert(order.message);
      setCourierAssignedOrder(orderData);
      return;
    } else {
      window.alert(order.message);
      return;
    }
  };

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
      const fetchCourAssignedOrder = async () => {
        const assignedOrder = await fetchCourierAssignedOrder(user_id!);
        return assignedOrder;
      };

      const fetchUnassignedOrders = async () => {
        const unassignedOrders = await getUnassignedOrders();
        return unassignedOrders;
      };

      const setOrders = async () => {
        const assignedOrder = await fetchCourAssignedOrder();

        if (assignedOrder != null) {
          setCourierAssignedOrder(assignedOrder);
          setLoadedOrders(true);
          return;
        }

        if (assignedOrder == null) {
          const unassignedOrdrs = await fetchUnassignedOrders();
          setUnassignedOrders(unassignedOrdrs);
          setLoadedOrders(true);
        }
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
                <h3>Created at: {order.createdAt.toString()}</h3>
                <h3>Products: {order.products.toString()}</h3>
              </div>
            ))}
          </div>
          <h1>Undelivered orders:</h1>
          <div>
            {undeliveredOrders!.map((order, index) => (
              <div key={index}>
                <h3>Created at: {order.createdAt.toString()}</h3>
                <h3>Products: {order.products.toString()}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
      {userRole === 'Courier' && (
        <div>
          Courier
          <div>
            {courierAssignedOrder != null ? (
              <div>Assigned Order ID: {courierAssignedOrder._id}</div>
            ) : (
              <div>
                Unassigned Orders:{' '}
                {unassignedOrders?.map((order, key) => (
                  <div key={key}>
                    <h3>
                      <h3>Order ID: {order._id}</h3>
                    </h3>
                    <h3>Created at: {order.createdAt.toString()}</h3>
                    <button
                      onClick={() =>
                        handleAssignOrder(order._id, user_id!, order)
                      }
                    >
                      Assign Order
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
