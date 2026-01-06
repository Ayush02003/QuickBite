"use client";

import { useEffect, useState } from "react";
import "./../../restaurant/style.css";
import { useParams } from "next/navigation";
import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
const Page = (props) => {
  const params = useParams();
  const id = params.id;

  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [removeCartData, setRemoveCartData] = useState();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartStorage(stored);
    setCartIds(stored.map((i) => i._id));
  }, []);

  useEffect(() => {
    loadRestaurantDetails();
  }, []);
  console.log(cartIds);
  const loadRestaurantDetails = async () => {
    // console.log("Heeee", id);
    const response = await fetch("http://localhost:3000/api/customer/" + id);
    const data = await response.json();
    // console.log(data.foodItems);
    setRestaurantDetails(data.details);
    setFoodItems(data.foodItems);
  };
  const addToCart = (item) => {
    setCartData({ ...item, qty:1,time: Date.now() });
    setCartIds((prev) => [...prev, item._id]);
  };
  const removeFromCart = (id) => {
    setRemoveCartData({ id, time: Date.now() });
    setCartIds((prev) => prev.filter((item) => item !== id));
  };
  return (
    <div className="container">
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="restaurant-detail-container">
        <div className="main-page-banner">
          <div className="title-box">
            <h2>{restaurantDetails?.restaurantName}</h2>
            <div className="underline"></div>
          </div>
          <div className="detail-wrapper">
            <div className="info-item">
              <div className="label">City</div>
              <div className="value">{restaurantDetails?.city}</div>
            </div>

            <div className="info-item">
              <div className="label">Contact</div>
              <div className="value">{restaurantDetails?.contact}</div>
            </div>

            <div className="info-item">
              <div className="label">Email</div>
              <div className="value">{restaurantDetails?.email}</div>
            </div>

            <div className="info-item">
              <div className="label">Address</div>
              <div className="value">{restaurantDetails?.address}</div>
            </div>
          </div>
        </div>

        <div className="food-item-wrapper">
          {foodItems.length > 0 ? (
            foodItems?.map((item) => (
              <div key={item._id} className="list-item">
                <img src={item.img_path} alt="" style={{ width: 100 }} />
                <div className="title-row">
                  <span className="name">{item.name}</span>
                  <span className="price">₹{item.price}</span>
                </div>

                <div className="description">{item.description}</div>
                {cartIds.includes(item._id) ? (
                  <button
                    className="remove-cart-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    className="add-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))
          ) : (
            <h2
              style={{
                width: "100%",
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#5a3e1b",
                fontWeight: 600,
                marginTop:"20px"
              }}
            >
              No food items for this restaurant
            </h2>
          )}
        </div>
      </div>
      <RestaurantFooter />
    </div>
  );
};

export default Page;
