"use client";
import { useEffect, useState } from "react";
import "../../style.css";
import { useParams, useRouter } from "next/navigation";

const EditFoodItems = (props) => {
  const params = useParams();
  const router = useRouter()
//   console.log(params.id);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    path: "",
    description: "",
  });
  const [error, setError] = useState(false);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    handleLoadFoodItem();
  },[]);
  const handleLoadFoodItem = async () => {
    let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+params.id,{
        method:"GET"
    });
    response = await response.json()
    if(response.success){
        setFormData({
            name:response.result.name,
            price:response.result.price,
            path:response.result.img_path,
            description:response.result.description
        })
    }
  };
  const handleEditFoodItem = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.price ||
      !formData.path ||
      !formData.description
    ) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    const rest_Data = JSON.parse(localStorage.getItem("restaurantUser"));

    if (!rest_Data) {
      alert("Restaurant not logged in");
      return;
    }
    const payload = {
      name: formData.name,
      price: formData.price,
      img_path: formData.path,
      description: formData.description,
      resto_id: rest_Data._id,
    };
    let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+params.id,{
        method:"PUT",
        body:JSON.stringify(payload)
    });
    response = await response.json()
    if(response.success){
        router.push("../dashboard")
        // alert("Data updated")
    }
    else{
        alert("Error updating")
    }
  };
  return (
    <div className="container">
      <div className="inner-container">
        <h1>Update food item</h1>
        <form onSubmit={handleEditFoodItem}>
          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              value={formData.name}
              className="input-field"
              onChange={handlechange}
              placeholder="Enter food name"
            />
            {error && !formData.name && (
              <span className="input-error">Please enter name</span>
            )}
          </div>
          <div className="input-wrapper">
            <input
              type="number"
              className="input-field"
              name="price"
              value={formData.price}
              onChange={handlechange}
              placeholder="Enter price"
            />
            {error && !formData.price && (
              <span className="input-error">Please enter price</span>
            )}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              name="path"
              value={formData.path}
              onChange={handlechange}
              placeholder="Enter path"
            />
            {error && !formData.path && (
              <span className="input-error">Please enter path</span>
            )}
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              className="input-field"
              name="description"
              value={formData.description}
              onChange={handlechange}
              placeholder="Enter description"
            />
            {error && !formData.description && (
              <span className="input-error">Please enter description</span>
            )}
          </div>
          <div className="input-wrapper">
            <button className="button" type="submit">
              Update Food Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditFoodItems;
