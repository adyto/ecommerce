import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";

import { runFireworks } from "../lib/utils";

import { useStateContext } from "../context/StateContext";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);
  return (
    <div className="bg-white min-h-[60vh]">
      <div className="bg-gray-300 max-w-screen-lg mt-40 rounded-2xl flex justify-center items-center flex-col m-auto p-12">
        <p className="text-green-500 text-4xl">
          <BsBagCheckFill />
        </p>
        <h1 className="capitalize my-4 mx-0 font-black text-4xl text-sky-700">
          Thank you for your order!
        </h1>
        <p className="text-base font-semibold text-center">
          Check your email inbox for the receipt
        </p>
        <p className="text-base font-semibold text-center mt-3 m-2">
          If you have any questions, please email{" "}
          <a href="mailto:adiyulianto61@gmail.com" className="text-red-500">
            adiyulianto61@gmail.com
          </a>
        </p>
        <Link href={"/"}>
          <button
            type="button"
            className="w-full max-w-sm py-2 px-3 rounded-2xl border-none text-xl uppercase bg-red-500 text-white cursor-pointer transition-transform scale-90 duration-500 hover:scale-100 mt-8"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
