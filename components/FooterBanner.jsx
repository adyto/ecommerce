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
    <div className="py-24 px-10 rounded-2xl relative h-96 text-white w-full mt-32 bg-red-500">
      <div className="flex justify-between">
        <div className="left">
          <p className="m-4">{discount}</p>
          <h1 className="font-black text-5xl ml-1">{largeText1}</h1>
          <h2 className="font-black text-5xl ml-1">{largeText2}</h2>
          <p className="m-4">{saleTime}</p>
        </div>
        <div className="right">
          <p className="m-4">{smallText}</p>
          <h3 className="text-4xl font-bold">{midText}</h3>
          <p className="m-4">{desc}</p>
          <Link href={`/product/${product}`}>
            <button
              type="button"
              className="py-2 px-4 bg-white text-red-500 rounded-2xl font-bold m-4"
            >
              {buttonText}
            </button>
          </Link>
          <img src={urlFor(image)} className="absolute -top-28 left-52" />
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
