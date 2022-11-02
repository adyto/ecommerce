import React, { useRef, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  console.log(totalPrice);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    console.log(data);

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div
      className="w-screen fixed right-0 top-0 z-40 transition-all duration-1000 ease-in-out bg-gray-600/50"
      ref={cartRef}
    >
      <div className="h-screen xs:w-72 sm:w-96 lg:w-[600px] bg-white float-right py-10 px-3 relative">
        <button
          type="button"
          className="flex flex-row items-center font-medium text-lg cursor-pointer gap-[2px] ml-2 border-none bg-transparent"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="ml-2">Your Cart</span>
          <span className="ml-2 text-red-500">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="xs:m-5 lg:m-10 items-center flex flex-col">
            <AiOutlineShopping size={150} />
            <h1 className="w-full font-semibold text-xl text-center">
              Your shopping bag is empty
            </h1>
            <Link href={"/"} className="text-center">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="xs:w-11/12 xs:font-medium xs:text-lg sm:w-72 w-screen max-w-sm py-2 px-3 rounded-2xl border-none text-xl mt-10 uppercase bg-red-500 text-white cursor-pointer scale-90 transition-transform duration-500 hover:scale-100"
              >
                Continues Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="flex flex-col justify-center gap-4 mt-5 w-full">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div
                className="flex flex-row xs:gap-3 xs:p-1 lg:gap-7 lg:p-7"
                key={item._id}
              >
                <img
                  src={urlFor(item?.image[0])}
                  className="xs:w-28 lg:w-44 lg:h-36 rounded-2xl bg-gray-300"
                />
                <div className="flex flex-col justify-around w-full">
                  <div className="flex flex-row justify-between items-center lg:w-[350px] text-sky-700">
                    <h2 className="xs:text-sm sm:text-base font-bold">
                      {item.name}
                    </h2>
                    <h3 className="xs:text-sm sm:text-base font-bold">
                      ${item.price}
                    </h3>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                      <div
                        className="border-[1px] border-solid border-gray-400 flex items-center xs:h-8 xs:px-1 lg:py-2 lg:px-3 cursor-pointer"
                        onClick={() => toggleCartItemQuantity(item._id, "dec")}
                      >
                        <AiOutlineMinus />
                      </div>
                      <span className="border-y-[1px] border-solid border-gray-400 xs:w-6 text-center">
                        {item.quantity}
                      </span>
                      <div
                        className="border-[1px] border-solid border-gray-400 flex items-center xs:h-8 xs:px-2 lg:py-2 lg:px-3 cursor-pointer"
                        onClick={() => toggleCartItemQuantity(item._id, "inc")}
                      >
                        <AiOutlinePlus />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-2xl text-red-500 cursor-pointer bg-transparent border-none"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="absolute inset-x-0 bottom-0 w-full mb-3">
            <div className="flex flex-row justify-around">
              <h4 className="text-xl font-bold">SubTotal:</h4>
              <h5 className="text-xl font-bold">${totalPrice}</h5>
            </div>
            <div className="xs:w-full lg:w-96 m-auto">
              <button
                type="button"
                className="w-full max-w-sm py-2 px-3 rounded-2xl border-none text-xl mt-10 uppercase bg-red-500 text-white cursor-pointer scale-90 transition-transform duration-500 hover:scale-100"
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
