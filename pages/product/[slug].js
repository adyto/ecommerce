import React, { useContext, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

import { client, urlFor } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div className="flex flex-col m-2 gap-2 xs:m-4 xs:gap-6 sm:gap-8 sm:m-8 lg:gap-10 lg:m-10 text-cyan-800">
      <div className="flex flex-row gap-2 sm:gap-4 lg:gap-6">
        <div className="flex flex-col">
          <img
            src={urlFor(image && image[index])}
            className="rounded-2xl bg-gray-300 w-32 h-32 xs:w-80 xs:h-48 sm:w-96 sm:h-60 lg:h-80 cursor-pointer duration-300 ease-in-out hover:bg-red-500"
          />
          <div className="flex flex-row gap-1 mt-2 xs:gap-1 xs:mt-2 lg:gap-[10px] lg:mt-5">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index
                    ? "rounded-lg w-10 h-10 xs:w-9 xs:h-9 sm:w-12 sm:h-12 lg:w-16 lg:h-16 cursor-pointer bg-red-500"
                    : "bg-gray-300 rounded-lg w-10 h-10 xs:w-9 xs:h-9 sm:w-12 sm:h-12 lg:w-16 lg:h-16 cursor-pointer"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h1 className="font-bold text-xs sm:text-base lg:text-lg">{name}</h1>
          <div className="text-red-500 xs:mt-1 sm:mt-2 lg:mt-3 flex flex-row gap-1 items-center">
            <div className="flex flex-row">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p className="text-cyan-800 xs:text-xs sm:text-base lg:text-lg">
              (20)
            </p>
          </div>
          <h2 className="font-bold xs:mt-1 xs:text-xs sm:mt-2 sm:text-base lg:text-lg">
            Details:
          </h2>
          <p className="xs:text-xs sm:mt-1 sm:text-base lg:text-lg">
            {details}
          </p>
          <p className="text-red-500 font-bold xs:text-base xs:mt-2 sm:text-2xl sm:mt-2 lg:text-3xl">
            ${price}
          </p>
          <div className="flex flex-row xs:gap-2 sm:gap-3 lg:gap-5 mt-2 items-center">
            <h3 className="font-bold xs:text-xs sm:text-base lg:text-lg">
              Quantity:
            </h3>
            <div className="flex flex-row items-center">
              <div
                className="border-[1px] border-solid border-gray-400 flex items-center xs:py-1 xs:px-1 xs:h-8 sm:py-2 sm:px-2 cursor-pointer"
                onClick={decQty}
              >
                <AiOutlineMinus />
              </div>
              <span className="text-center border-y-[1px] border-solid border-gray-400 xs:py-1 xs:px-1 xs:h-8 xs:w-10 sm:py-auto sm:px-2">
                {qty}
              </span>
              <div
                className="border-[1px] border-solid border-gray-400 flex items-center xs:py-1 xs:px-1 xs:h-8 sm:py-2 sm:px-2 cursor-pointer"
                onClick={incQty}
              >
                <AiOutlinePlus />
              </div>
            </div>
          </div>
          <div className="xs:mt-2 lg:mt-7 flex flex-col items-start lg:gap-1 lg:flex-row">
            <button
              type="button"
              className="font-medium border-[1px] border-solid rounded-md border-gray-400 bg-white cursor-pointer transition-transform duration-500 scale-90 hover:scale-100 text-red-500 xs:py-1 xs:px-1 xs:w-40 sm:py-2 sm:px-4 sm:text-lg sm:w-48 lg:w-52"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="font-medium border-[1px] border-none rounded-md border-gray-400 bg-red-500 cursor-pointer transition-transform duration-500 scale-90 hover:scale-100 text-white xs:py-1 xs:px-1 xs:w-40 sm:py-2 sm:px-4 sm:text-lg sm:w-48 lg:w-52"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="xs:mt-16 lg:mt-32">
        <h4 className="text-center text-cyan-800 text-3xl font-bold">
          You may also like
        </h4>
        <div className="realtive w-full overflow-x-hidden">
          <div className="flex flex-row justify-center gap-4 mt-5 animate-marquee whitespace-nowrap will-change-transform hover:animate-marquee">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
