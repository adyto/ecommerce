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

  const { incQty, decQty, qty, onAdd } = useStateContext();

  return (
    <div className="flex flex-col gap-10 m-10 text-cyan-800">
      <div className="flex flex-row gap-6">
        <div className="flex flex-col">
          <img
            src={urlFor(image && image[index])}
            className="rounded-2xl bg-gray-300 w-96 h-96 cursor-pointer duration-300 ease-in-out hover:bg-red-500"
          />
          <div className="flex gap-[10px] mt-5">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                className={
                  i === index
                    ? "rounded-lg  w-16 h-16 cursor-pointer bg-red-500"
                    : "bg-gray-300 rounded-lg w-16 h-16 cursor-pointer"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-bold">{name}</h1>
          <div className="text-red-500 mt-3 flex flex-row gap-1 items-center">
            <div className="flex flex-row">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p className="text-cyan-800">(20)</p>
          </div>
          <h2 className="mt-2 font-bold">Details:</h2>
          <p className="mt-2">{details}</p>
          <p className="text-red-500 font-bold text-2xl mt-6">${price}</p>
          <div className="flex flex-col sm:flex-row gap-5 mt-2 items-center">
            <h3 className="font-bold">Quantity:</h3>
            <div className="flex flex-row">
              <div
                className="border-[1px] border-solid border-gray-500 flex items-center py-2 px-2 cursor-pointer"
                onClick={decQty}
              >
                <AiOutlineMinus />
              </div>
              <span
                className="border-y-[1px] border-solid border-gray-500 py-2 px-2"
                onClick={""}
              >
                {qty}
              </span>
              <div
                className="border-[1px] border-solid border-gray-500 flex items-center py-2 px-2 cursor-pointer"
                onClick={incQty}
              >
                <AiOutlinePlus />
              </div>
            </div>
          </div>
          <div className="mt-7">
            <button
              type="button"
              className="border-[1px] py-2 px-4 border-solid border-gray-500 text-lg font-medium bg-white cursor-pointer w-48 transition-transform duration-500 scale-90 hover:scale-100 text-red-500"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="border-0 py-2 px-4 border-solid border-gray-500 text-lg font-medium bg-red-500 cursor-pointer w-48 transition-transform duration-500 scale-90 hover:scale-100 text-white"
              onClick={""}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-32">
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
