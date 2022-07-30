import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Page = ({ title, heading, children, header = true, isAdmin = false }) => {
  return (
    <div className="bg-cream min-h-screen">
      <Head>
        {title && (
          <title>{title} | Butterboy Bakery - Cookies baked in Manly</title>
        )}
        <meta name="description" content="Generated by create next app" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {header && !isAdmin && <Header />}
      {heading && (
        <h1 className="text-5xl md:text-9xl text-center text-mauve font-bold font-display uppercase md:border-t border-b border-vibrant py-6 md:py-12">
          {heading}
        </h1>
      )}
      <div className="flex flex-col mx-auto container md:container-2xl">
        {children}
      </div>
      {!isAdmin && <Footer />}
    </div>
  );
};

export default Page;
