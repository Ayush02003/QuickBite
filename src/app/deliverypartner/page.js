"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./deliverypartner.module.css";
import DeliveryHeader from "../DeliveryHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

const DeliveryPartnerAuth = () => {
  const router = useRouter();
  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    city: "",
    address: "",
  });

  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.mobile || !formData.password) {
      setError(true);
      return;
    }
    setError(false);

    const payload = {
      login: true,
      mobile: formData.mobile,
      password: formData.password,
    };

    try {
      const res = await fetch(
        "http://localhost:3000/api/deliverypartners/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (data.success) {
        const { result } = data;
        delete result.password;
        localStorage.setItem("deliveryPartner", JSON.stringify(result));
        router.push("/deliverydashboard");
      } else {
        alert(data.result);
      }
    } catch (err) {
      console.log("Login failed:", err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    if (
      !formData.name ||
      !formData.mobile ||
      !formData.password ||
      !formData.city ||
      !formData.address
    ) {
      setError(true);
      return;
    }
    setError(false);

    const payload = {
      mobile: formData.mobile,
      password: formData.password,
      name: formData.name,
      city: formData.city,
      address: formData.address,
    };

    try {
      const res = await fetch(
        "http://localhost:3000/api/deliverypartners/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (data.success) {
        const { result } = data;
        delete result.password;
        localStorage.setItem("deliveryPartner", JSON.stringify(result));
        alert("Success")
        router.push("/deliverydashboard");
      } else {
        alert(data.result);
      }
    } catch (err) {
      console.log("Signup failed:", err);
    }
  };
  useEffect(()=>{
    const delivery = JSON.parse(localStorage.getItem('deliveryPartner'))
    if(delivery){
      router.push("/deliverydashboard")
    }
  },[])
  return (
    <>
      <div className="container">
        <DeliveryHeader />
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <div className={styles.tabs}>
              <button
                className={mode === "login" ? styles.activeTab : ""}
                onClick={() => setMode("login")}
              >
                Login
              </button>

              <button
                className={mode === "signup" ? styles.activeTab : ""}
                onClick={() => setMode("signup")}
              >
                Signup
              </button>
            </div>

            {mode === "login" && (
              <form onSubmit={handleLogin} className={styles.form}>
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                />

                <button className={styles.button}>Login</button>
              </form>
            )}

            {mode === "signup" && (
              <form onSubmit={handleSignup} className={styles.form}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.input}
                />

                <button className={styles.button}>Signup</button>
              </form>
            )}
          </div>
        </div>
        <RestaurantFooter />
      </div>
    </>
  );
};

export default DeliveryPartnerAuth;
