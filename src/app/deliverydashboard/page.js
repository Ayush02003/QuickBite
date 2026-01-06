"use client";
import { useEffect, useState } from "react";
import RestaurantFooter from "../_components/RestaurantFooter";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";
import styles from "./deliverydashboard.module.css";

const Page = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("deliveryPartner") || "null");

    if (!storedUser) {
      router.push("/deliverypartner");
      return;
    }

    setUser(storedUser);

    if (storedUser._id) {
      getMyOrders(storedUser._id);
    }
  }, []);

  const getMyOrders = async (userID) => {
    try {
      let response = await fetch(`http://localhost:3000/api/deliverypartners/orders/${userID}`);
      response = await response.json();

      if (response.success) {
        setMyOrders(response.result);
      }
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <p style={{ textAlign: "center", padding: "40px" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <DeliveryHeader />

      <div className={styles.profileWrapper}>
        <div className={styles.box}>
          <h2 className={styles.boxTitle}>My Profile</h2>

          <div className={styles.userGrid}>
            <p className={styles.userRow}><strong>Name:</strong> {user.name}</p>
            <p className={styles.userRow}><strong>City:</strong> {user.city}</p>
            <p className={styles.userRow}><strong>Mobile:</strong> {user.mobile}</p>
            <p className={styles.userRow}><strong>Address:</strong> {user.address}</p>
          </div>
        </div>

        <div className={styles.box}>
          <h2 className={styles.boxTitle}>My Orders</h2>

          <div className={styles.ordersList}>
            {myOrders.length > 0 ? (
              myOrders.map((order, index) => (
                <div className={styles.orderRow} key={order._id || index}>
                  <span className={styles.counter}>{index + 1}.</span>
                  <span className={styles.restName}>{order.data.restaurantName}</span>
                  <span className={styles.amount}>Amount: ₹{order.amount}</span>
                  <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <p className={styles.noOrders}>No orders found</p>
            )}
          </div>
        </div>
      </div>

      <RestaurantFooter />
    </div>
  );
};

export default Page;
