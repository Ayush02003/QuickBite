"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import "./restaurant/style.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter()
  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);
  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };
  const filteredLocation = locations.filter((city) => {
    return city.toLowerCase().includes(searchValue.toLowerCase());
  });
  useEffect(() => {
    const handleClickOutside = () => setShowLocation(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer"
    if(params?.location){
      url = url +"?location="+params.location
    }
    else if(params?.restaurant){
      url = url +"?restaurant="+params.restaurant
    }
    let response = await fetch(url);
    response = await response.json();
    if (response.success) {
      setRestaurants(response.result);
      // console.log(response.result);
    }
  };
  return (
    <div className="container">
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            name=""
            className="select-input"
            onClick={(e) => {
              e.stopPropagation();
              setShowLocation(true);
            }}
            onChange={(e) => {
              setSearchValue(e.target.value);
              // loadRestaurants(e.target.value)
            }}
            value={searchValue}
            placeholder="Select Place"
            id=""
          />
          {showLocation && (
            <ul className="location-list" onClick={(e) => e.stopPropagation()}>
              {filteredLocation.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedLocation(item);
                    setShowLocation(false);
                    setSearchValue(item);
                    loadRestaurants({location:item})
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          <input
            type="text"
            name=""
            className="search-input"
            placeholder="Enter food/restaurant name"
            onChange={(e) => {
              // setSearchValue(e.target.value);
              loadRestaurants({restaurant:e.target.value})
            }}
            id=""
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurants.map((item) => (
          <div key={item._id} className="restaurant-wrapper" onClick={()=>router.push('explore/'+item._id)}>
            <div className="heading-wrapper">
              <h3>{item.restaurantName}</h3>
              <span className="contact">
                <i
                  className="fa-solid fa-phone icon"
                  style={{ color: "white" }}
                ></i>
                {item.contact}
              </span>
            </div>

            <div className="address-wrapper">
              <div>
                <i className="fa-solid fa-location-dot icon"></i>
                {item.city}
              </div>

              <div>
                <i className="fa-solid fa-map-pin icon"></i>
                {item.address}
              </div>

              <div>
                <i className="fa-solid fa-envelope icon"></i>
                Email: {item.email}
              </div>
            </div>
          </div>
        ))}
      </div>

      <RestaurantFooter />
    </div>
  );
}
