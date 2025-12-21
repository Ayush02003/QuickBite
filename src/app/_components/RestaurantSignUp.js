import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    city: "",
    address: "",
    contact: "",
  });
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      !formData.restaurantName ||
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
      restaurantName: formData.restaurantName,
      city: formData.city,
      address: formData.address,
      contact: formData.contact,
    };

    try {
      const res = await fetch("http://localhost:3000/api/restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      // console.log(data);
      if (data.success) {
        alert("Restaurant Added");
        const { result } = data;
        delete result.password;
        localStorage.setItem("restaurantUser", JSON.stringify(result));
        router.push("/restaurant/dashboard");
      }
    } catch (error) {
      console.log("Signup failed", error);
    }
  };

  return (
    <>
      <div className="signup-component">
        <h3>SignUp Component</h3>
        <form onSubmit={handleSignUp}>
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
            {passwordError &&(
              <span className="input-error">Passwords do not match</span>
            )}
          </div>

          <div className="input-wrapper">
            <input
              className="input-field"
              type="text"
              name="restaurantName"
              placeholder="Enter restaurant name"
              value={formData.restaurantName}
              onChange={handleChange}
            />
            {error && !formData.restaurantName && (
              <span className="input-error">Please enter valid Restaurant Name</span>
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
            {error && !formData.city&& (
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
              <span className="input-error">Please enter valid contact number</span>
            )}
          </div>

          <div className="input-wrapper">
            <button className="button" type="submit">
              Sign UP
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RestaurantSignUp;
