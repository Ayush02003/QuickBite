"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./restaurant/style.css";

const DeliveryHeader = () => {
  const [deliveryUser, setDeliveryUser] = useState(null);
  const router = useRouter();

  // Load Delivery Partner from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("deliveryPartner");

    if (storedUser) {
      setDeliveryUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("deliveryPartner");
    router.push("/deliverypartner"); // redirect to login
  };

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img src="/images/Logo.png" alt="Logo" style={{ width: 100 }} />
      </div>

      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        {deliveryUser ? (
          <>
            <li>
              <Link href="/deliverydashboard">
                {deliveryUser?.name}
              </Link>
            </li>

            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/deliverypartner">
              <button>Login</button>
            </Link>
          </li>
        )}

      </ul>
    </div>
  );
};

export default DeliveryHeader;
