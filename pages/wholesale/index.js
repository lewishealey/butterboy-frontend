import React, { useEffect } from "react";
import Page from "../../components/Page";
import Marquee from "react-fast-marquee";
import client from "../../utils/sanity";
import Image from "next/image";
import ProductWholesale from "../../components/ProductWholesale";
import Address from "../../components/Address";
import imageUrlBuilder from "@sanity/image-url";
import { LazyVideo } from "react-lazy-media";

const builder = imageUrlBuilder(client);

export default function WholesaleHome({ products, reviews, logos, settings }) {
  const buttonClasses =
    "font-display px-8 py-4 text-3xl hover:bg-red-700 bg-vibrant text-white";
  //Loop of products
  const jsxBoxes =
    products &&
    products.map((p) => {
      //const featuredMedia = cookie['_embedded']['wp:featuredmedia'][0];
      return <ProductWholesale product={p} key={p._id} />;
    });

  function urlFor(source) {
    return builder.image(source);
  }

  if (!settings) {
    return <div>Loading settings</div>;
  }

  return (
    <Page title="Homepage" settings={settings}>
      <h2 className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-8 md:py-16 border-t border-vibrant">
        Wholesale
      </h2>
      <nav className="m-auto space-x-8 pb-12">
        <a href="#about" className="text-vibrant font-body text-xl uppercase">
          About
        </a>
        <a
          href="#corporate"
          className="text-vibrant font-body text-xl uppercase"
        >
          Corporate orders
        </a>
        <a href="#contact" className="text-vibrant font-body text-xl uppercase">
          Contact
        </a>
      </nav>

      <section className="grid grid-cols-2 border-t border-vibrant border-l">
        {jsxBoxes}
      </section>

      <section className="hidden md:block" id="about">
        <div className="flex flex-col border-none md:border border-vibrant border-b">
          <h2 className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-16 border-b border-vibrant">
            About
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center border-b border-vibrant">
            <div className="flex-1 p-6 md:p-24">
              <img src="butterboy.png" className="" />
            </div>
            <div className="flex-1 flex justify-start items-center flex-col text-left border-l border-vibrant">
              <div className="text-left space-y-4 w-full">
                <figure className="space-y-2 border-vibrant">
                  <p className="font-body text-vibrant text-xl p-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla molestie justo interdum posuere mollis. Quisque id mi
                    in urna ultrices hendrerit. Nullam porta augue sit amet arcu
                    aliquet, vitae ullamcorper mauris tempus. Praesent posuere
                    ligula non odio maximus aliquet. Quisque gravida libero
                    vestibulum, euismod justo ac, vulputate eros. In aliquet
                    ultricies vulputate. Vivamus eget ante eget risus
                    pellentesque convallis. Nunc et purus arcu. Maecenas a
                    cursus odio. In dignissim tortor eget vulputate condimentum.
                    Pellentesque consequat rutrum malesuada. Aliquam mattis orci
                    vitae magna convallis aliquam. Morbi interdum felis non
                    lacinia commodo. Donec posuere tellus placerat mauris rutrum
                    malesuada. Nulla rutrum arcu nec ante mollis pulvinar. Sed
                    quis est ut lorem ultricies sodales.
                  </p>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="hidden md:block border-b border-vibrant pb-12"
        id="corporate"
      >
        <div className="flex flex-col border-none md:border border-vibrant space-y-8">
          <h2 className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-16 border-b border-vibrant">
            Corporate orders
          </h2>
          <p className="m-auto text-xl max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            molestie justo interdum posuere mollis. Quisque id mi in urna
            ultrices hendrerit. Nullam porta augue sit amet arcu aliquet, vitae
            ullamcorper mauris tempus.
          </p>
          <div className="m-auto max-w-4xl">
            <button className={buttonClasses}>Get in touch</button>
          </div>
        </div>
      </section>

      <section className="hidden md:block">
        <div className="flex flex-col border-none md:border border-vibrant">
          <h2 className="uppercase font-display text-mauve text-4xl md:text-8xl text-center py-16 border-b border-vibrant">
            Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex-1 p-6 md:p-24">
              <img src="butterboy.png" className="" />
            </div>
            <div className="flex-1 flex justify-start items-center flex-col text-left border-l border-vibrant">
              <div className="text-left space-y-4 w-full">
                <figure className="space-y-2 border-b border-vibrant">
                  <h3 className="font-display uppercase text-3xl md:text-6xl text-mauve border-b border-vibrant p-6">
                    Location
                  </h3>
                  <p className="font-body text-vibrant text-xl p-6">
                    {settings?.homepage?.location}
                  </p>
                </figure>
                <figure className="space-y-2">
                  <h3 className="font-display uppercase text-3xl md:text-6xl text-mauve border-b border-vibrant p-6">
                    BAKING HOURS
                  </h3>
                  <div className="p-6 space-y-2">
                    <p className="font-body text-vibrant text-xl">
                      {settings?.homepage?.bakingHours}
                    </p>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
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
        <div className="max-w-5xl m-auto flex space-x-4 md:space-x-8 justify-between w-full px-8 md:px-0">
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
    *[_type == "product-wholesale" && live] | order(order asc)
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
