"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp = (props) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    city: "",
    address: "",
    contact: "",
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      // alert("Passwords do not match");
      return;
    } else {
      setPasswordError(false);
    }
    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.city ||
      !formData.address ||
      !formData.contact
    ) {
      setError(true);
      return;
    }

    setError(false);

    // return false;

    const payload = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      city: formData.city,
      address: formData.address,
      contact: formData.contact,
    };

    try {
      const res = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      // console.log(data);
      if (data.success) {
        alert("User Added");
        const { result } = data;
        delete result.password;
        localStorage.setItem("user", JSON.stringify(result));
        if (props.redirect) {
          router.push("/order");
        } else {
          router.push("/");
        }
      } else {
        alert(data.result);
      }
    } catch (error) {
      console.log("Signup failed", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  return (
    <div>
      <form onSubmit={handleSignUp}>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            name="name"
            placeholder="Enter  name"
            value={formData.name}
            onChange={handleChange}
          />
          {error && !formData.name && (
            <span className="input-error">Please enter valid Name</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Enter Email Id"
            value={formData.email}
            onChange={handleChange}
          />
          {error && !formData.email && (
            <span className="input-error">Email is required</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-wrapper">
          <input
            className="input-field"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {passwordError && (
            <span className="input-error">Passwords do not match</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
          />
          {error && !formData.city && (
            <span className="input-error">Please enter valid city</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            name="address"
            placeholder="Enter full address"
            value={formData.address}
            onChange={handleChange}
          />
          {error && !formData.address && (
            <span className="input-error">Please enter valid address</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            className="input-field"
            type="text"
            name="contact"
            placeholder="Enter contact no."
            value={formData.contact}
            onChange={handleChange}
          />
          {error && !formData.contact && (
            <span className="input-error">
              Please enter valid contact number
            </span>
          )}
        </div>

        <div className="input-wrapper">
          <button className="button" type="submit">
            Sign UP
          </button>
        </div>
      </form>
    </div>
  );
};
export default UserSignUp;
