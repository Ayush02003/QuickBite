"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./restaurant/style.css"
const DeliveryHeader = (props) => {
  return (
      <div className="header-wrapper">
        <div className="logo">
          <img src="/images/Logo.png" alt="Logo" style={{ width: 100 }} />
        </div>
         <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          </ul>
      </div>
  );
};

export default DeliveryHeader;
