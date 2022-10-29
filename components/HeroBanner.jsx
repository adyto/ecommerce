import Link from "next/link";
import React from "react";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="py-24 px-10 bg-gray-300 rounded-2xl relative h-[500px] w-full">
      <div>
        <p className="text-xl">{heroBanner.smallText}</p>
        <h1 className="text-6xl mt-1 font-bold">{heroBanner.midText}</h1>
        <h2 className="text-white text-[10em] -ml-5 leading-none font-bold">
          {heroBanner.largeText1}
        </h2>
        <img
          src={urlFor(heroBanner.image)}
          alt="headphones"
          className="absolute top-0 right-1/4 w-[450px] h-[450px]"
        />
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button
              type="button"
              className="rounded-2xl py-2 px-4 bg-red-500 text-white border-none mt-10 text-lg font-medium cursor-pointer z-50"
            >
              {heroBanner.buttonText}
            </button>
            <div className="absolute right-[10%] bottom-[5%] w-72 flex flex-col text-sky-700">
              <h5 className="mb-3 font-bold text-base align self-end">
                Description
              </h5>
              <p className="text-gray-600 font-thin text-end">
                {heroBanner.desc}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
