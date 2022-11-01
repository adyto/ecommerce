import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    desc,
    image,
    midText,
    product,
    buttonText,
  },
}) => {
  return (
    <div className="py-12 px-5 mt-14  rounded-2xl relative h-60 xs:h-72 sm:h-64 md:h-72 lg:h-96 lg:mt-32 text-white lg:py-24 lg:px-10 w-full bg-red-500">
      <div className="flex justify-between">
        <div className="left">
          <p className="text-xs my-1 xs:text-sm md:m-2 md:text-base lg:m-4">
            {discount}
          </p>
          <h1 className="font-black text-2xl xs:text-4xl md:text-5xl lg:ml-1">
            {largeText1}
          </h1>
          <h2 className="font-black text-2xl xs:text-4xl md:text-5xl lg:ml-1">
            {largeText2}
          </h2>
          <p className="text-xs xs:text-sm my-1 md:m-2 md:text-base lg:m-4">
            {saleTime}
          </p>
        </div>
        <div className="right">
          <p className="text-xs my-1 ml-3 xs:text-sm xs:ml-5 sm:ml-0 md:m-2 md:text-base lg:m-4 ">
            {smallText}
          </p>
          <h3 className="text-xl ml-3 font-bold xs:ml-5 xs:text-3xl sm:ml-0 md:text-4xl">
            {midText}
          </h3>
          <p className="text-xs xs:text-sm xs:ml-5 ml-3 my-1 sm:ml-0 md:m-2 md:text-base lg:m-4">
            {desc}
          </p>
          <Link href={`/product/${product}`}>
            <button
              type="button"
              className="py-2 px-4 ml-3 m-1 text-xs xs:text-sm lg:text-base  bg-white text-red-500 rounded-2xl font-bold xs:ml-5 sm:ml-0 md:m-2 lg:m-4 "
            >
              {buttonText}
            </button>
          </Link>
          <img
            src={urlFor(image)}
            className="absolute hidden sm:inline sm:w-72 sm:-top-14 sm:left-32 md:left-40 md:w-80 lg:w-[30rem] lg:-top-20 xl:w-[32rem] xl:-top-24 xl:left-48 2xl:-top-24 2xl:left-52"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
