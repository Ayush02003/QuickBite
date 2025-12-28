"use client";

import styles from "./cart.module.css";
import { useEffect, useState } from "react";
import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import "../restaurant/style.css";
import { DELIVERY_CHARGE, TAX_PERCENT } from "@/app/config/cartCharges";

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);

  const incrementQty = (id) => {
    setCartStorage((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCartStorage((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(stored);
  }, []);
  const subtotal = cartStorage.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const taxAmount = (subtotal * TAX_PERCENT) / 100;
  const total = subtotal + taxAmount + DELIVERY_CHARGE;

  return (
    <div className="container">
      <CustomerHeader />

      <div className={styles.cartWrapper}>
        {cartStorage.length > 0 ? (
          cartStorage.map((item, index) => (
            <div key={item._id} className={styles.cartItem}>
              <div className={styles.index}>{index + 1}.</div>
              <img src={item.img_path} alt="" />

              <div className={styles.name}>{item.name}</div>

              <div className={styles.description}>{item.description}</div>

              <div className={styles.qtyBox}>
                <button onClick={() => decrementQty(item._id)}>-</button>
                <span>{item.qty || 1}</span>
                <button onClick={() => incrementQty(item._id)}>+</button>
              </div>

              <div className={styles.price}>
                ₹{item.price * (item.qty || 1)}
              </div>

              <button className={styles.removeBtn}>Remove</button>
            </div>
          ))
        ) : (
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            No items in the cart
          </h2>
        )}
      </div>
      <div className={styles.billBox}>
        <div className={styles.billRow}>
          <span>Food Charges</span>
          <span>₹{subtotal}</span>
        </div>

        <div className={styles.billRow}>
          <span>Delivery Charge</span>
          <span>₹{DELIVERY_CHARGE}</span>
        </div>

        <div className={styles.billRow}>
          <span>GST ({TAX_PERCENT}%)</span>
          <span>₹{taxAmount.toFixed(2)}</span>
        </div>

        <div className={styles.billTotal}>
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      <button className={styles.placeOrderBtn}>Place Order</button>

      <RestaurantFooter />
    </div>
  );
};

export default Page;
