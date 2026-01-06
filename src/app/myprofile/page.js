"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import styles from "./myprofile.module.css";
import "../restaurant/style.css";

const Page = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser?._id) getMyOrders(storedUser._id);
  }, []);

  const getMyOrders = async (userID) => {
    let response = await fetch(`http://localhost:3000/api/order?id=${userID}`);
    response = await response.json();

    if (response.success) {
      setMyOrders(response.result);
    }
  };

  if (!user)
    return (
      <div className="container">
        <CustomerHeader />
        <p style={{ textAlign: "center", padding: "40px" }}>Loading...</p>
        <RestaurantFooter />
      </div>
    );

  return (
    <div className="container">
      <CustomerHeader />

      <div className={styles.profileWrapper}>

        <div className={styles.box}>
          <h2 className={styles.boxTitle}>My Profile</h2>

          <div className={styles.userGrid}>
            <p className={styles.userRow}>
              <strong>Name:</strong> {user.name}
            </p>
            <p className={styles.userRow}>
              <strong>Email:</strong> {user.email}
            </p>
            <p className={styles.userRow}>
              <strong>Mobile:</strong> {user.contact}
            </p>
            <p className={styles.userRow}>
              <strong>Address:</strong> {user.address}
            </p>
          </div>
        </div>

        <div className={styles.box}>
          <h2 className={styles.boxTitle}>My Orders</h2>

          <div className={styles.ordersList}>
            {myOrders.length > 0 ? (
              myOrders.map((order, index) => (
                <div className={styles.orderRow} key={index}>
                  <span className={styles.counter}>{index+1}.</span>
                  <span className={styles.restName}>{order.data.restaurantName}</span>
                  <span className={styles.amount}>Amount: ₹{order.amount}</span>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[order.status.toLowerCase()]
                    }`}
                  >
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
