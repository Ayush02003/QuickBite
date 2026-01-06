"use client";
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import "./style.css";
const restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <div className="container">
        <RestaurantHeader />
        <div className="main">
        <h1>Restaurant Login/Signup Page </h1>
        {login ? <RestaurantLogin /> : <RestaurantSignUp />}
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login
              ? "Don't have an account? SignUp"
              : "Already have Account? Login"}
          </button>
        </div>
        <RestaurantFooter />
      </div>
    </>
  );
};

export default restaurant;
