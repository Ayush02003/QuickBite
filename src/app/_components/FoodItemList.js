import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const router = useRouter()
  const [msg, setMsg] = useState(false);
  useEffect(() => {
    loadFoodItems();
  }, []);
  const loadFoodItems = async () => {
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    if(!restaurantData){
      router.push("/restaurant")
      return
    }
    const resto_id = restaurantData._id;
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/${resto_id}`
    );
    response = await response.json();
    if (response.success) {
      setFoodItems(response.result);
    } else {
      setMsg(true);
    }
    console.log(response);
  };
  const deleteItem = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;
    let response = await fetch(
      `http://localhost:3000/api/restaurant/foods/${id}`,
      {
        method: "DELETE",
      }
    );
    response = await response.json();

    if (response.success) {
      // alert("Item deleted!");
      loadFoodItems();
    } else {
      alert("Delete failed");
    }
  };
  return (
    <div className="food-items">
      <h1>Food Items</h1>
      {msg && <span>No Data Available</span>}
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, key) => (
            <tr key={key}>
              <td>{key + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <img
                  src={item.img_path}
                  alt={item.name}
                  width="80"
                  //   height="50"
                  //   style={{ objectFit: "cover", borderRadius: "5px" }}
                />
              </td>
              <td>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
                <button className="edit-btn" onClick={()=>{router.push('dashboard/'+item._id)}}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default FoodItemList;
