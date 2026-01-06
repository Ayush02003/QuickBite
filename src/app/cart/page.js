"use client";

import styles from "./cart.module.css";
import { useEffect, useState } from "react";
import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import "../restaurant/style.css";
import { DELIVERY_CHARGE, TAX_PERCENT } from "@/app/config/cartCharges";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);

  const incrementQty = (id) => {
    setCartStorage((prev) => {
      const updated = prev.map((item) =>
        item._id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };
  const removeItem = (id) => {
    setCartStorage((prev) => {
      const updated = prev.filter((item) => item._id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };
  const decrementQty = (id) => {
    setCartStorage((prev) => {
      const updated = prev.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(stored);
  }, []);
  const subtotal = cartStorage.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );
  const router = useRouter();
  const taxAmount = (subtotal * TAX_PERCENT) / 100;
  const total = subtotal + taxAmount + DELIVERY_CHARGE;
  const orderNow = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      alert("Please login First");
      router.push("/user-auth?order=true");
    }
  };
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

              <button
                onClick={() => removeItem(item._id)}
                className={styles.removeBtn}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            Your Cart is empty
          </h2>
        )}
      </div>
      {cartStorage.length > 0 && (
        <>
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

          <button onClick={orderNow} className={styles.placeOrderBtn}>
            Place Order
          </button>
        </>
      )}

      <RestaurantFooter />
    </div>
  );
};

export default Page;
