import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="p-3">
      <Head>
        <link rel="shortcut icon" href="/logo-adyto.png" />
        <title>Ady.to STORE</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="2xl:container mx-auto">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
