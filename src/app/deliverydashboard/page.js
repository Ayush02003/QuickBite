'use client'
import { useEffect } from "react";
import RestaurantFooter from "../_components/RestaurantFooter";
import DeliveryHeader from "../DeliveryHeader";
import Router from "next/router";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter()
   useEffect(()=>{
      const delivery = JSON.parse(localStorage.getItem('deliveryPartner'))
      if(!delivery){
        router.push("/deliverypartner")
      }
    },[])
  return (
    <div className="container">
      <DeliveryHeader />
      <h1>Delivery Dashboard</h1>
      <RestaurantFooter />
    </div>
  );
};

export default Page;
