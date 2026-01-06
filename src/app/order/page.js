"use client";

import styles from "./order.module.css";
import { useEffect, useState } from "react";
import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import "../restaurant/style.css";
import { DELIVERY_CHARGE, TAX_PERCENT } from "@/app/config/cartCharges";
import { useRouter } from "next/navigation";

const Page = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const router = useRouter();
  const [userStorage, setUserStorage] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    setUserStorage(user);
    setCartStorage(cart);

    if (!user || !cart.length) {
      alert("Cart or user not found");
      router.push("/");
    }
  }, []);

  const subtotal = cartStorage.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );
  const orderNow = async () => {
    if (!userStorage || !cartStorage.length) {
      alert("Cart or user not found");
      return;
    }

    const user_id = userStorage._id;
    const city = userStorage.city;
    const resto_id = cartStorage[0].resto_id;

    let deliveryBoyResponse = await fetch(
      "http://localhost:3000/api/deliverypartners/" + city
    );
    deliveryBoyResponse = await deliveryBoyResponse.json();
    console.log(deliveryBoyResponse);
    let deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id);
    let deliveryBoyId =
      deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];
    // console.log(deliveryBoyId)
    if (!deliveryBoyId) {
      alert("Delivery partner not available in your area");

      return false;
    }
    const items = cartStorage.map((item) => ({
      food_id: item._id,
      qty: item.qty,
      price: item.price,
    }));

    const amount = total;

    const payload = {
      user_id,
      resto_id,
      items,
      amount,
      status: "Pending",
      deliveryBoy_id: (deliveryBoyId =
        deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)]),
    };

    console.log("Order Payload:", payload);

    const res = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert("Order Placed Successfully");
      localStorage.removeItem("cart");
      router.push("/myprofile");
    } else {
      alert("Order failed: " + data.message);
    }
  };

  const taxAmount = (subtotal * TAX_PERCENT) / 100;
  const total = subtotal + taxAmount + DELIVERY_CHARGE;

  return (
    <div className="container">
      <CustomerHeader />

      <div className={styles.orderWrapper}>
        <div className={styles.userInfoBox}>
          <div className={styles.userInfoTitle}>Delivery Details</div>

          <div className={styles.userInfoRow}>
            <strong>Name:</strong> {userStorage?.name}
          </div>

          <div className={styles.userInfoRow}>
            <strong>Address:</strong> {userStorage?.address}
          </div>

          <div className={styles.userInfoRow}>
            <strong>Mobile:</strong> {userStorage?.contact}
          </div>
        </div>

        <div className={styles.billBox}>
          <div className={styles.billTitle}>Order Summary</div>

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

        <div className={styles.paymentBox}>
          <div className={styles.paymentTitle}>Payment Methods</div>

          <div className={styles.paymentMethod}>
            <span>Cash On Delivery</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <button onClick={orderNow} className={styles.confirmOrderBtn}>
          Confirm Order
        </button>
      </div>

      <RestaurantFooter />
    </div>
  );
};

export default Page;
