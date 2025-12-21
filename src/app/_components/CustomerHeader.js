"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    // let data = localStorage.getItem("restaurantUser");
    // if (!data) {
    //   router.push("/restaurant");
    // } else if (data && pathName == "/restaurant") {
    //   router.push("/restaurant/dashboard");
    // } else {
    //   setDetails(JSON.parse(data));
    // }
  }, [router, pathName]);
  //   const logout = () => {
  //     localStorage.removeItem("restaurantUser");
  //     router.push("/restaurant");
  //   };
//   console.log(details);
  return (
    <div>
      <div className="header-wrapper">
        <div className="logo">
          <img src="/images/Logo.png" alt="Logo" style={{ width: 100 }} />
        </div>

        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Login</Link>
          </li>
          <li>
            <button>Signup</button>
          </li>
          <li>
            <Link href="/">Cart(0)</Link>
          </li>
          <li>
            <Link href="/">Add Restaurant</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RestaurantHeader;
