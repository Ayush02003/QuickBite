"use client";
import RestaurantFooter from "../_components/RestaurantFooter";
import CustomerHeader from "../_components/CustomerHeader";
import "../restaurant/style.css";
import UserSignUp from "../_components/UserSignUp";
const UserAuth = () => {
  return (
    <div className="container">
      <CustomerHeader />
      <h1>User Auth</h1>
      <div className="signup-component">
        <UserSignUp />
      </div>
      <RestaurantFooter />
    </div>
  );
};
export default UserAuth;
