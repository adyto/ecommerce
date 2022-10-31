import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="cursor-pointer scale-90 duration-500 transition-transform hover:scale-100">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="rounded-2xl bg-gray-300 max-w-xl"
            alt="img-product"
          />
          <p className="font-medium">{name}</p>
          <p className="font-extrabold mt-1 text-black">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
