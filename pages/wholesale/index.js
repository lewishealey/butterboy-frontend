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

      <section className="grid grid-cols-2 border-t border-vibrant border-l">
        {jsxBoxes}
      </section>

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
      <section className="hidden md:block">
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
