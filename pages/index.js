import React from 'react';
import {
  Cart,
  Footer,
  FooterBanner,
  HeroBanner,
  Layout,
  Navbar,
  Product,
} from '../components';
import { client } from '../lib/client';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="text-center my-14 xs:my-16 sm:my-24 md:my-28 xl:my-32 2xl:my-40 text-sky-700">
        <h2 className="font-extrabold text-4xl">Best Selling Products</h2>
        <p className="text-base font-extralight">Speakers of many variations</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-5 w-full">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
