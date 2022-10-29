import React from "react";
import { AiFillInstagram, AiFillGithub } from "react-icons/ai";

import Link from "next/link";

const Footer = () => {
  return (
    <div className="text-cyan-800 text-center mt-5 py-8 px-3 font-bold flex flex-col items-center gap-[10px] justify-center">
      <p>2022 Ady.to Headphones All right reserverd</p>
      <p className="flex flex-row gap-3 text-3xl">
        <Link href={"https://www.instagram.com/ady.to"} target="_blank">
          <AiFillInstagram />
        </Link>
        <Link href={"https://github.com/adyto"} target="_blank">
          <AiFillGithub />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
