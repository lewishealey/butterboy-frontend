import React, { useState } from "react";
import Page from "../components/Page";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import client from "../utils/sanity";
import Image from "next/image";
import Product from "../components/Product";
import Address from "../components/Address";
import imageUrlBuilder from "@sanity/image-url";
import { LazyVideo } from "react-lazy-media";
import Modal from "react-modal";

const builder = imageUrlBuilder(client);

Modal.setAppElement("#__next");

const customStyles = {
  background: {
    zIndex: "1000",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
    background: "#ffffff",
    padding: "0",
    overflow: "none",
    maxHeight: "75%",
  },
};

export default function Home({ products, reviews, logos, settings }) {
  //Loop of products
  const [modal, setModal] = useState(true);
  const jsxBoxes =
    products &&
    products.map((p) => {
      //const featuredMedia = cookie['_embedded']['wp:featuredmedia'][0];
      return <Product product={p} key={p._id} />;
    });

  function urlFor(source) {
    return builder.image(source);
  }

  function openModal() {
    setModal(true);
  }

  function closeModal() {
    setModal(false);
  }

  if (!settings) {
    return <div>Loading settings</div>;
  }

  return (
    <Page title="Homepage" settings={settings}>
      {settings.homepage.allowPopup && (
        <Modal
          isOpen={modal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Wholesale or retail"
        >
          <div className="flex gap-4">
            <div className="p-12 flex-1 items-center justify-center text-center space-y-8">
              <img
                src={urlFor(settings.homepage.retailThumbnail).width(400)}
                className={`h-auto w-full`}
                layout="fill"
              />
              <p className="text-3xl font-body">Cookie delivery & Collect</p>
              <button
                className="flex w-full text-center justify-center uppercase font-display text-3xl text-white bg-vibrant px-5 py-3 hover:bg-mauve hover:text-vibrant"
                onClick={closeModal}
              >
                Retail
              </button>
            </div>
            <div className="p-12 flex-1 items-center justify-center text-center bg-mauve space-y-8">
              <img
                src={urlFor(settings.homepage.wholesalThumbnail).width(400)}
                className={`h-auto w-full`}
                layout="fill"
              />{" "}
              <p className="text-3xl font-body block">
                Corporate orders & Cafes
              </p>
              <Link href="/wholesale">
                <a className="block uppercase font-display text-3xl text-white bg-vibrant px-5 py-3 hover:bg-white hover:text-vibrant">
                  Wholesale
                </a>
              </Link>
            </div>
          </div>
        </Modal>
      )}
      <div className="relative py-6 md:py-12">
        <div className="absolute w-full z-20">
          <div className="max-w-7xl m-auto hidden md:flex">
            <img
              src="mark_red.svg"
              className="square"
              style={{ width: "12%" }}
            />
          </div>
        </div>
        <div className="absolute w-full">
          <img src="logo_lilac.svg" className="m-auto w-4/5 md:w-3/5" />
        </div>
        <div className="relative m-auto w-full md:w-4/5 hidden md:block md:mb-8">
          <Image
            src="/banner.png"
            layout="responsive"
            width={400}
            height={250}
            priority
          />
        </div>
        <div className="relative m-auto w-full md:w-3/5 block md:hidden pt-12">
          <Image
            src="/matcha-mobile.png"
            layout="responsive"
            width={400}
            height={400}
          />
        </div>
        {/* <img
          src="order-by.png"
          className="absolute bottom-0 h-24 right-8 bottom-8 block md:hidden"
        /> */}
      </div>
      <div className="p-6 pb-0 pt-0 md:p-12 pb-0 w-full max-w-7xl m-auto hidden md:block">
        <LazyVideo
          src="homepage.webm"
          poster="/poster.jpg"
          autoplay
          muted
          loop
          controls={false}
        />
      </div>

      <div className="hidden md:block">
        <Marquee
          className="text-vibrant font-body text-xl md:text-3xl py-6 uppercase"
          gradient={false}
        >
          {settings.homepage.marquee}
        </Marquee>
      </div>

      <h2 className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-8 md:py-16 border-t border-vibrant">
        Shop cookies
      </h2>

      <section className="grid grid-cols-2 border-t border-vibrant border-l m-auto w-full max-w-7xl">
        {jsxBoxes}
      </section>

      {/* <section className="py-12 flex md:hidden">
        <img src="/emblem.png" className="m-auto" style={{ width: "70%" }} />
      </section> */}

      <section className="hidden md:block">
        <h2 className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-8 md:py-16 border-b border-vibrant">
          How to heat
        </h2>
        <div className="max-w-5xl m-auto flex text-center font-body text-vibrant text-xl py-12 flex-col space-y-6">
          <p>
            Here is your step-by-step guide on how-to-heat-up your cookie, to
            perfect that warm, gooey, crunchy cookie, so when your in-laws come
            around you can pretend that you actually bake... and bake well.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-base">
            <div className="space-y-4">
              <div className="h-52 md:h-40 flex justify-center">
                <div className="md:w-full h-full object-cover z-auto border border-vibrant rounded-xl overflow-hidden">
                  <LazyVideo
                    src="/GIF-1.mp4"
                    poster="/placeholder.png"
                    classes={["md:w-full h-full object-cover z-auto"]}
                    autoplay
                    muted
                    loop
                    controls={false}
                  />
                </div>
              </div>
              <p>Store your cookies in the fridge to keep them fresh.</p>
            </div>
            <div className="space-y-4">
              <div className="h-52 md:h-40 flex justify-center">
                <div className="md:w-full h-full object-cover z-auto border border-vibrant rounded-xl overflow-hidden">
                  <LazyVideo
                    src="/GIF-2.mp4"
                    poster="/placeholder.png"
                    classes={["md:w-full h-full object-cover z-auto"]}
                    autoplay
                    muted
                    loop
                    controls={false}
                  />
                </div>
              </div>
              <p>
                Preheat the oven to 175 degrees celsius, then place the cookies
                on a baking tray.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-52 md:h-40 flex justify-center">
                <div className="md:w-full h-full object-cover z-auto border border-vibrant rounded-xl overflow-hidden">
                  <LazyVideo
                    src="/GIF-1.mp4"
                    poster="/placeholder.png"
                    classes={["md:w-full h-full object-cover z-auto"]}
                    autoplay
                    muted
                    loop
                    controls={false}
                  />
                </div>
              </div>
              <p>
                Heat your cookies in the oven for 3-5 minutes, remove them once
                the chocolate has melted.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-52 md:h-40 flex justify-center">
                <div className="md:w-full h-full object-cover z-auto border border-vibrant rounded-xl overflow-hidden">
                  <LazyVideo
                    src="/GIF-4.mp4"
                    poster="/placeholder.png"
                    classes={["md:w-full h-full object-cover z-auto"]}
                    autoplay
                    muted
                    loop
                    controls={false}
                  />
                </div>
              </div>
              <p>Enjoy the warm gooey cookie with a glass of cold milk.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="hidden md:block m-auto w-full max-w-7xl">
        <Address settings={settings} />
      </section>
      <section
        className="flex border-t border-vibrant py-24 flex-col space-y-16 bg-cover"
        style={{ backgroundImage: "url('chocolate.jpg')" }}
      >
        {reviews &&
          reviews.map((review, i) => (
            <div
              className="text-white font-body text-3xl text-center w-full"
              key={review.id + i}
            >
              "{review.text}"
            </div>
          ))}
        <div className="max-w-5xl m-auto flex space-x-2 md:space-x-8 justify-between w-full px-8 md:px-0">
          {logos &&
            logos.map(
              (logo, i) =>
                logo.thumbnail && (
                  <a href={logo.url} className="">
                    <img
                      src={urlFor(logo.thumbnail).width(200).url()}
                      className="w-20 h-auto"
                      key={`logo_${i}`}
                    />
                  </a>
                )
            )}
        </div>
      </section>
    </Page>
  );
}

export async function getStaticProps() {
  const products = await client.fetch(`
    *[_type == "product" && live && details.type == "box" || details.type == "other"] | order(order asc)
  `);
  const reviews = await client.fetch(`
    *[_type == "review"] | order(text asc)
  `);
  const logos = await client.fetch(`
    *[_type == "logo"]
  `);
  const settings = await client.fetch(`
    *[_type == "settings"]
  `);
  return {
    props: {
      products,
      reviews,
      logos,
      settings: settings[0],
    },
  };
}
