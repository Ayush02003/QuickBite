'use client'
import Link from "next/link";
import { useRouter , usePathname} from "next/navigation";
import { useEffect,useState } from "react";

const RestaurantHeader = () => {
  const [details,setDetails] = useState();
  const router = useRouter()
  const pathName = usePathname();
  useEffect(()=>{
    let data = localStorage.getItem("restaurantUser")
    if(!data){
      router.push("/restaurant")
    }
    else if(data && pathName=="/restaurant"){
      router.push("/restaurant/dashboard")
    }
    else{
      setDetails(JSON.parse(data))
    }
  },[router,pathName])
  const logout = ()=>{
    localStorage.removeItem("restaurantUser")
    router.push("/restaurant")
  }
  // console.log(details)
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img src="/images/Logo.png" alt="Logo" style={{ width: 100 }} />
      </div>

      <ul>
        <li><Link href="/">Home</Link></li>
        {
          details && details.restaurantName?
          <>
          <li ><Link href="/">Profile</Link></li>
          <li ><button onClick={logout}>Logout</button></li>
          </>
          :
          <li><Link href="/">Login/SignUp</Link></li>
        }
      </ul>
    </div>
  );
};

export default RestaurantHeader;
