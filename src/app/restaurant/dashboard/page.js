"use client"
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import "./../style.css";
import AddFoodItems from "@/app/_components/AddFoodItem";
import { useState } from "react";
import FoodItemList from "@/app/_components/FoodItemList";
const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <div className="container">
      <RestaurantHeader />
      <button onClick={()=>setAddItem(false)}>Dashboard</button>
      <button onClick={()=>setAddItem(true)}>Add Food</button>
      {addItem ? <AddFoodItems setAddItem={setAddItem} /> : <FoodItemList/>}
      <RestaurantFooter />
    </div>
  );
};

export default Dashboard;
