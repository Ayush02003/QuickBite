"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {
  const [userStorage, setUserStorage] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUserStorage(JSON.parse(storedUser));
    }
  }, []);
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  // const [details, setDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItem(cartStorage);
    setCartNumber(cartStorage?.length);
  }, []);
  useEffect(() => {
    if (!props.cartData) return;

    const item = { ...props.cartData };
    delete item.time;

    setCartItem((prev) => {
      if (prev.length > 0 && prev[0].resto_id !== item.resto_id) {
        localStorage.setItem("cart", JSON.stringify([item]));
        setCartNumber(1);
        return [item];
      }
      const updated = [...prev, item];
      localStorage.setItem("cart", JSON.stringify(updated));
      setCartNumber(updated.length);
      return updated;
    });
  }, [props.cartData]);

  useEffect(() => {
    if (!props.removeCartData) return;

    setCartItem((prev) => {
      const updated = prev.filter(
        (item) => item._id !== props.removeCartData.id
      );
      setCartNumber(updated.length);
      if (updated.length === 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(updated));
      }

      return updated;
    });
  }, [props.removeCartData]);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };
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
          {userStorage ? (
            <>
              <li>
                <Link href="/myprofile">{userStorage?.name}</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/user-auth"><button>Login</button></Link>
              </li>
            </>
          )}
          <li>
            <Link href={cartNumber ? "/cart" : "#"}>
              Cart({cartNumber ? cartNumber : 0})
            </Link>
          </li>
          <li>
            <Link href="/">Add Restaurant</Link>
          </li>
          <li>
            <Link href="/deliverypartner">Delivery Partner</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerHeader;
