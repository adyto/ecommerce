import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex justify-between my-[6px] mx-4 relative">
      <p className="text-gray-500 text-lg">
        <Link href={"/"}>Ady.to Headphones</Link>
      </p>
      <button
        type="button"
        className="text-2xl text-gray-500 cursor-pointer relative transition-transform duration-300 scale-90 hover:scale-100"
        onClick=""
      >
        <AiOutlineShopping />
        <span className="absolute top-0 text-xs bg-red-500 w-4 h-4 rounded-full text-center font-semibold text-slate-300">
          1
        </span>
      </button>
    </div>
  );
};

export default Navbar;
