"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import "./restaurant/style.css";
export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    loadLocations();
  }, []);
  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  };
  const filteredLocation=locations.filter((city)=>{
    return city.toLowerCase().includes(searchValue.toLowerCase())
  });
  useEffect(() => {
    const handleClickOutside = () => setShowLocation(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
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
            onChange={(e)=>{setSearchValue(e.target.value)}}
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
                    setSearchValue(item)
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
            id=""
          />
        </div>
      </div>
      <div></div>
      <RestaurantFooter />
    </div>
  );
}
