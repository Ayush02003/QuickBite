import { useState } from "react";
const AddFoodItems = (props) => {
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
  const handleAddFoodItem = async (e) => {
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

    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.success) {
      alert("Food item added");
      props.setAddItem(false)
    } else {
      alert("Food item not added");
    }
  };
  return (
    <div className="inner-container">
      <h1>Add new food item</h1>
      <form onSubmit={handleAddFoodItem}>
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
            Add Food Item
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddFoodItems;
