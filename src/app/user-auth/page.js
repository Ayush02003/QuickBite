"use client";
import RestaurantFooter from "../_components/RestaurantFooter";
import CustomerHeader from "../_components/CustomerHeader";
import "../restaurant/style.css";
import UserSignUp from "../_components/UserSignUp";
import { useState } from "react";
import UserLogin from "../_components/UserLogin";
import { useSearchParams } from "next/navigation";
const UserAuth = (props) => {
  const [login, setLogin] = useState(true);
  const redirectOrder = useSearchParams();
  const order = redirectOrder.get("order");

  return (
    <div className="container">
      <CustomerHeader />
      <div className="main">
        <h1>{login ? "User Login" : "User SignUp"}</h1>
        {login ? (
          <UserLogin redirect={order} />
        ) : (
          <div className="signup-component">
            <UserSignUp redirect={order} />
          </div>
        )}
        <button className="button-link" onClick={() => setLogin(!login)}>
          {login
            ? "Don't have an account? Sign Up"
            : "Already have an Account? login"}
        </button>
      </div>
      <RestaurantFooter />
    </div>
  );
};
export default UserAuth;
